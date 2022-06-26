<template>
  <div v-if="!isFullscreen" :style="{ height: `${isExpand ? chartHeight : 360}px` }">
    <div ref="ganttRef" class="gantt-chart touch-action"></div>
    <div :class="['expand-block', isExpand && 'expanded']" @click="isExpand = !isExpand">
      {{ isExpand ? '收起' : '展开明细' }}
    </div>
  </div>
  <div v-else class="fullscreen">
    <div class="gantt-header">
      <div class="gantt-header-name">
        {{ data.projectName }}
      </div>
      <span class="gantt-header-switch">
        <span :style="{ marginRight: '4px' }">
          实际进度明细
        </span>
        <van-switch v-model="isShowActualRect" />
      </span>
      <span class="gantt-header-close" @click="$emit('input', false)">
        <van-icon name="cross" />
      </span>
    </div>
    <div ref="ganttRef" class="gantt-chart"></div>
  </div>
</template>

<script>
import throttle from 'lodash.throttle';
import * as Hammer from 'hammerjs';
// echarts核心模块 提供了echarts使用必须要的接口
import * as echarts from 'echarts/core';
import { 
  CustomChart,
  // BarChart,
} from 'echarts/charts';
import {
  // TooltipComponent,
  GridComponent,
  DataZoomComponent,
  MarkLineComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use([
  // TooltipComponent,
  GridComponent,
  DataZoomComponent,
  MarkLineComponent,
  CustomChart,
  // BarChart,
  CanvasRenderer,
]);

export default {
  name: 'GanttChart',
  components: {
  },
  model: {
    prop: 'isFullscreen',
  },
  props: {
    isFullscreen: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
      required: true,
    }
  },
  data() {
    return {
      engineeringScheduleList: [],
      projectMilestoneList: [],
      isExpand: false, // 非全屏模式下是否展开
      dataZoomStart: 0, // datazoom的x轴偏移量
      isShowActualRect: true, // 是否展示实际进度明细
      valueSpanIndex: 5, 
      clickedMarklineName: '今日', // 被选中的里程碑名称
      dayTimestamp: 24 * 60 * 60 * 1000, // 1天对应的时间戳
    };
  },
  computed: {
    chartHeight() {
      return this.engineeringScheduleList.length * 60;
    },
  },
  watch: {
    data() {
      this.formatData();
      this.renderChart();
      this.resizeChart();
    },
    isFullscreen() {
      // document.body.style.overflow = 'hidden';

      this.ganttChart && this.ganttChart.dispose();
      this.renderChart();
      this.resizeChart();
      this.simulatePinch();
    },
    isShowActualRect() {
      this.renderChart();
    },
  },
  mounted() {
    this.formatData();
    this.renderChart();
    this.resizeChart();
  },
  destroy() {
    this.ganttChart && this.ganttChart.dispose(); // 销毁实例
    this.hammer && this.hammer.off('pinchin pinchout');
  },
  methods: {
    clickEngineeringLabel(selectedItem, index) {
      // 工程下无工序情况
      if (!selectedItem.processSchedules.length) return;

      if (selectedItem._isExpanded) {
        this.engineeringScheduleList = this.engineeringScheduleList.filter(item => item._parentId !== selectedItem._id);
      } else {
        this.engineeringScheduleList.splice(index + 1, 0, ...selectedItem.processSchedules);
      }
      this.engineeringScheduleList[index]._isExpanded = !this.engineeringScheduleList[index]._isExpanded;
    },
    formatData() {
      if (!this.data.engineeringScheduleList) return;

      this.engineeringScheduleList = this.data.engineeringScheduleList.map(item => ({
        ...item,
        _type: 'engineering',
        _id: item.engineeringScheduleId,
        _name: item.engineeringName,
        _isExpanded: false,
        processSchedules: item.processSchedules.map(processItem => ({
          ...processItem,
          _type: 'process',
          _id: processItem.processScheduleId,
          _parentId: item.engineeringScheduleId,
          _name: processItem.processScheduleName,
        })),
      }));

      // 默认展开第一个工程
      this.clickEngineeringLabel(this.engineeringScheduleList[0], 0);

      this.projectMilestoneList = this.data.projectMilestoneList.map(item => ({
        name: item.name,
        xAxis: new Date(item.deadline).getTime(),
        emergencyDegree: item.emergencyDegree,
      }));
      const todayStartTimestamp = new Date(new Date().setHours(0, 0, 0, 0)).getTime(); // 当天0点
      // 里程碑中有时间为'今日'的就忽略，避免重叠展示
      if (!this.data.projectMilestoneList.find(item => new Date(item.deadline).getTime() === todayStartTimestamp)) {
        this.projectMilestoneList.push({
          name: '今日',
          xAxis: new Date().getTime(),
          emergencyDegree: 0,
        });
      }
      // 当今日时间大于时间轴最小时间5个月时，代表里程碑即将显示在屏幕外，手动计算x轴偏移
      // 交互说不需要默认展示今日，暂时去掉
      // if (new Date().getTime() - new Date(this.data.startDate).getTime() > dayTimestamp * 30 * 5) {
      //   this.dataZoomStart = (new Date().getTime() - new Date(this.data.startDate).getTime() - this.dayTimestamp * 30) / (new Date(this.data.endDate).getTime() - new Date(this.data.startDate).getTime()) * 100;
      // } else {
      //   this.dataZoomStart = 0;
      // }
    },
    renderChart() {
      // ganttRef采用v-if切换的方案 需要下一帧渲染
      this.$nextTick(() => {
        if (!this.$refs.ganttRef || !this.engineeringScheduleList.length) return;

        this.ganttChart = echarts.init(this.$refs.ganttRef);

        // dataZoom
        // 全屏时手势更改的时间范围
        const VALUE_SPAN_ARRAY = Array.from({ length: 6 }, (_, i) => this.dayTimestamp * 30 * 6.5 / Math.pow(2, 5 - i));
        const XAXIS_INTERVAL_ARRAY = Array.from({ length: 6 }, (_, i) => this.dayTimestamp * 30 / (6 - i));
        const dataZoomX = [
          {
            type: 'slider',
            show: false,
            filterMode: 'none', // 不过滤数据，只改变数轴范围。
            xAxisIndex: [0, 1],
            start: this.dataZoomStart,
            // end: 100,
            // 坐标轴上最大和最小间隔相同 保证固定展示数量
            minValueSpan: this.isFullscreen ? VALUE_SPAN_ARRAY[this.valueSpanIndex] : this.dayTimestamp * 30 * 6.5,
            maxValueSpan: this.isFullscreen ? VALUE_SPAN_ARRAY[this.valueSpanIndex] : this.dayTimestamp * 30 * 6.5,
          },
          {
            id: 'zoomX',
            type: 'inside',
            filterMode: 'none',
            xAxisIndex: [0, 1],
            zoomLock: true,
            preventDefaultMouseMove: false,
          },
        ];
        const dataZoomY = [
          {
            type: 'slider',
            show: false,
            filterMode: 'none', // 不过滤数据，只改变数轴范围。
            yAxisIndex: 0,
            // 全屏时Y轴可以滑动
            minValueSpan: this.isFullscreen ? ((window.innerWidth - 40) / 60) : this.engineeringScheduleList.length,
            maxValueSpan: this.isFullscreen ? ((window.innerWidth - 40) / 60) : this.engineeringScheduleList.length,
          },
          {
            type: 'inside',
            filterMode: 'none',
            yAxisIndex: 0,
            zoomLock: true,
            // 全屏时Y轴可以滑动
            moveOnMouseMove: this.isFullscreen,
            preventDefaultMouseMove: this.isFullscreen,
          }
        ];
        const dataZoom = [
          ...dataZoomX,
          ...dataZoomY,
        ];

        // grid
        const GRID_SIDE = 18;
        const FULLSCREEN_GRID_LEFT = 216;
        // 为了全屏时左侧设置背景色 将左右两侧方向设置0
        const grid = {
          top: this.isFullscreen ? 6 : 48,
          right: this.isFullscreen ? 0 : GRID_SIDE,
          bottom: 0,
          left: this.isFullscreen ? FULLSCREEN_GRID_LEFT : GRID_SIDE,
          containLabel: true,
        };

        // xAxis
        const xAxisMin = new Date(new Date(this.data.startDate).setDate(1)).getTime(); // 当月1号
        const xAxisMax = new Date(new Date(this.data.endDate).getFullYear(), new Date(this.data.endDate).getMonth() + 1, 0).getTime(); // 当月最后天
        const xAxisBase = {
          type: 'time',
          position: 'top',
          // z: 10,
          min: xAxisMin,
          max: xAxisMax,
          minInterval: this.dayTimestamp * 30,
          maxInterval: this.dayTimestamp * 30,
          // min: 1609430400000, // 2021-01-01
          // max: 1640880000000, // 2021-12-31
          axisLabel: {
            margin: 6,
            formatter: '{yyyy}.{MM}',
            color: '#6F6F6F',
            fontSize: 10,
            align: 'left',
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitArea: {
            show: false,
          },
        };
        const xAxis = this.isFullscreen ? [
          {
            ...xAxisBase,
            minInterval: XAXIS_INTERVAL_ARRAY[this.valueSpanIndex],
            maxInterval: XAXIS_INTERVAL_ARRAY[this.valueSpanIndex],
            axisLabel: {
              show: true,
              margin: 12,
              // formatter: '{yyyy}.{MM}',
              formatter: () => {
                return this.valueSpanIndex >= 5 ? '{yyyy}.{MM}' : '{yyyy}.{MM}.{dd}';
              },
              hideOverlap: true, // 避免重叠
              color: '#848484',
              fontSize: 10,
              align: 'left',
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#DCDFE7',
                width: 18,
                cap: 'butt',
              },
            },
          },
        ] : [
          {
            ...xAxisBase,
            splitArea: {
              show: true,
              areaStyle: {
                color: ['white', '#FBFBFB'],
              },
            },
          },
        ];

        // yAxis
        const yAxis = {
          // 这里设置false会影响splitArea展示
          // show: false,
          // 这行data去掉滑动就很顺畅 通过min & max参数定义Y轴
          // data: this.engineeringScheduleList.map(item => item._name),
          inverse: true,
          minInterval: 1,
          maxInterval: 1,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          splitArea: {
            show: this.isFullscreen,
            areaStyle: {
              color: this.engineeringScheduleList.map(item => {
                if (item._type === 'engineering' && !item._isExpanded) {
                  return 'white';
                } else {
                  return item.status === 1 ? '#FFEEEE' : '#EBF3FE';
                }
              }),
            },
          },
          min: 0,
          max: this.engineeringScheduleList.length,
        };

        // series
        const STATUS_MAP = ['未开始', '进行中', '已完工', '已拒绝'];
        const renderCircleItem = (isShowCircle, isExpanded, status) => {
          return {
            type: 'circle',
            z2: 15,
            textContent: {
              style: {
                y: -1.6,
                text: isExpanded ? '-' : '+',
                textFill: status === 1 ? '#FF6E6E' : '#3688F6',
                fontSize: '16px',
              },
            },
            textConfig: {
              position: 'inside',
            },
            shape: {
              // cx: 0,
              // cy: 0,
              r: 8,
            },
            style: {
              fill: status === 1 ? '#FFEEEE' : '#EBF3FE',
            },
            // fix backgroundColor disappear in some light color range like #FFEEEE/#EBF3FE when circle hover or selected
            emphasis: {
              style: {
                fill: status === 1 ? '#FFEEEE' : '#EBF3FE',
              },
            },
            ignore: !isShowCircle,
          };
        };
        // for more details, see https://echarts.apache.org/examples/zh/editor.html?c=custom-gantt-flight
        const renderGanttItem = (params, api) => {
          // clip rect outside canvas when dragging!
          // function clipRectByRect(params, rect) {
          //   return echarts.graphic.clipRectByRect(rect, {
          //     x: params.coordSys.x,
          //     y: params.coordSys.y,
          //     width: params.coordSys.width,
          //     height: params.coordSys.height,
          //   });
          // }
          const yIndex = params.dataIndexInside; // y轴数据index值
          const { _type, _name, _isExpanded, actualRatio = 0, status, processSchedules } = this.engineeringScheduleList[yIndex];
          const startDate = api.coord([api.value(0), yIndex]); // 开始时间数值转换成坐标系上的点
          const endDate = api.coord([api.value(1), yIndex]); // 结束时间数值转换成坐标系上的点
          const barLength = endDate[0] - startDate[0]; // 长度
          const axisHeight = api.size([0, 1])[1]; // y轴间隔距离，单位为1应得到的长度；x轴为0得到0略过
          const barHeight = axisHeight * (_type === 'engineering' ? (this.isFullscreen ? 0.48 : 0.36) : 0.24); // 柱状图高度由y轴间隔高度乘以系数得到
          const [x, y] = startDate;
          const isShowCircle = _type === 'engineering' && !!processSchedules.length;
          const text = this.isFullscreen ? (`${actualRatio || 0}% (${STATUS_MAP[status]})`) : (_name + (actualRatio ? ` ${actualRatio}%` : ' ') + `(${STATUS_MAP[status]})`);
          const textWidth = text.length * 11 + (isShowCircle ? 20 : 0); // 计算path的长度 这里无法找到方法自适应 within my capacity oops~

          return {
            type: 'group',
            id: 'ganttItem',
            position: [x, y + (this.isFullscreen ? (axisHeight - barHeight) / 2 : barHeight / 4)],
            children: [
              {
                type: 'rect',
                textContent: {
                  style: {
                    text,
                    textFill: '#323232',
                  },
                  ignore: !(this.isFullscreen && _type === 'engineering'),
                },
                textConfig: {
                  position: 'insideLeft',
                },
                shape: {
                  width: barLength,
                  height: barHeight,
                  r: 3, // 设置圆角矩形
                },
                style: {
                  fill: status === 1 ? '#FFA8A8' : '#7FB6FF',
                },
              },
              {
                type: 'rect',
                shape: {
                  width: barLength * actualRatio / 100,
                  height: barHeight / 4,
                  r: 3,
                },
                style: {
                  fill: status === 1 ? '#E64A4A' : '#006CCF',
                },
                ignore: !actualRatio || this.isFullscreen && !this.isShowActualRect, // 非全屏时展示; 全屏且勾选实际进度明细时展示;
              },
              {
                type: 'group',
                position: [0, barHeight],
                children: [
                  {
                    type: 'path',
                    z2: 10,
                    shape: {
                      // d: 'M 0,0 L -4,4 Q -16,4 -16,16 Q -16,28 -4,28 H 160 Q 172,28 172,16 Q 172,4 160,4 H 4 z', // can not repaint when resize
                      d: `M 0,0 L -4,4 Q -16,4 -16,16 Q -16,28 -4,28 H ${textWidth - 12} Q ${textWidth},28 ${textWidth},16 Q ${textWidth},4 ${textWidth - 12},4 H 4 z`,
                      y: -4, // tooltip's triangle height
                      width: textWidth,
                      height: 28,
                      layout: 'cover'
                    },
                    style: {
                      fill: '#fff',
                      shadow: '#6F6F6F',
                      shadowBlur: 0.5,
                    },
                  },
                  {
                    type: 'group',
                    position: [12, 12],
                    children: [
                      renderCircleItem(isShowCircle, _isExpanded, status),
                      {
                        type: 'text',
                        z2: 15,
                        style: {
                          x: isShowCircle ? 16 : -4,
                          y: -6,
                          text,
                          textFill: '#323232',
                          // fontSize: '12px',
                        },
                      },
                    ],
                  },
                ],
                ignore: this.isFullscreen,
              },
            ],
          };
        };
        const renderAxisLabelItem = (params, api) => {
          const yIndex = params.dataIndexInside; // y轴数据index值
          const { _type, _name, _isExpanded, status, processSchedules } = this.engineeringScheduleList[yIndex];
          const isShowCircle = _type === 'engineering' && !!processSchedules.length;
          const y = api.coord([0, api.value(0)])[1];

          const AXIS_LABEL_LEFT = 18;
          const AXIS_LABEL_RIGHT = 6;
          const axisHeight = api.size([0, 1])[1];
          const labelHeight = axisHeight * 0.8;

          // 裁掉超出y轴坐标系的部分
          if (y < params.coordSys.y - labelHeight) {
            return;
          }

          return {
            type: 'group',
            position: [0, y],
            children: [
              {
                type: 'rect',
                shape: {
                  width: FULLSCREEN_GRID_LEFT,
                  height: axisHeight,
                },
                style: {
                  fill: status === 1 ? '#FFEEEE' : '#EBF3FE',
                },
                emphasis: {
                  style: {
                    fill: status === 1 ? '#FFEEEE' : '#EBF3FE',
                  },
                },
                silent: true,
                ignore: _type === 'engineering' && !_isExpanded,
              },
              {
                type: 'group',
                position: [AXIS_LABEL_LEFT, (axisHeight - labelHeight) / 2],
                children: [
                  _type === 'engineering' ? {
                    type: 'rect',
                    z2: 10,
                    shape: {
                      width: FULLSCREEN_GRID_LEFT - AXIS_LABEL_LEFT - AXIS_LABEL_RIGHT,
                      height: labelHeight,
                      r: 3,
                    },
                    style: {
                      fill: 'white',
                      shadowOffsetX: 0,
                      shadowOffsetY: 3,
                      shadowBlur: 10,
                      shadowColor: 'rgba(129, 142, 175, 0.1)',
                    },
                  } : {
                    type: 'group',
                    children: [
                      {
                        type: 'polyline',
                        z2: 5,
                        shape: {
                          points: [[10, -labelHeight], [10, labelHeight / 2], [16, labelHeight / 2]],
                        },
                        style: {
                          fill: 'transparent',
                          stroke: '#D6D6D6',
                        },
                      },
                      {
                        type: 'circle',
                        shape: {
                          cx: 20,
                          cy: labelHeight / 2,
                          r: 2,
                        },
                        style: {
                          fill: status === 1 ? '#FF5252' : '#3688F6',
                        },
                      },
                    ],
                  },
                  {
                    type: 'group',
                    position: [12, labelHeight / 2],
                    children: [
                      renderCircleItem(isShowCircle, _isExpanded, status),
                      {
                        type: 'text',
                        z2: 15,
                        style: {
                          x: _type === 'engineering' ? 12 : 16,
                          y: -6,
                          text: _name,
                          textFill: _type === 'engineering' ? '#323232' : '#5B5B5B',
                          fontWeight: _type === 'engineering' && 'bold',
                        },
                      },
                    ],
                  },
                  {
                    type: 'text',
                    z2: 20,
                    style: {
                      x: FULLSCREEN_GRID_LEFT - AXIS_LABEL_LEFT - AXIS_LABEL_RIGHT - 12,
                      y: labelHeight / 2 - 8,
                      text: '›',
                      // text: '>',
                      textFill: '#D6D6D6',
                      fontSize: 18,
                    },
                  },
                ],
              },
            ],
          };
        };
        const markLine = {
          symbol: ['emptyCircle'],
          animation: false,
          data: this.projectMilestoneList.map(item => ({
            ...item,
            y: 40,
            label: {
              show: true,
              silent: true, // 不响应和触发鼠标事件
              position: 'start',
              opacity: 1,
              formatter: params => {
                return params.name === this.clickedMarklineName ? `{a|${params.name}}` + '\n' + `{b|${new Date(params.value).getMonth() + 1}.${new Date(params.value).getDate()}}` : '';
              },
              rich: {
                a: {
                  color: '#464646',
                  fontSize: 16,
                },
                b: {
                  color: '#999',
                  fontSize: 10,
                  padding: [2, 0, 2, 0],
                },
              },
            },
            lineStyle: item.name === this.clickedMarklineName ? {
              color: '#205294',
            } : {
              color: item.emergencyDegree === 0 ? '#F2BA40' : '#FE8C59',
            },
          })),
        };
        const seriesBase = {
          type: 'custom',
          clip: true, // 裁掉所有超出坐标系的部分
          // custom can only use Array but not Object data format! 
          // dimensions: 0 startDate 1 endDate
          data: this.engineeringScheduleList.map(item => [new Date(item.startDate).getTime(), new Date(item.endDate).getTime()]),
          renderItem: renderGanttItem,
          xAxisIndex: 0,
          encode: { // 不可删 对应zoomdata
            x: [0, 1],
            y: 0,
          },
          markLine,
        };
        const series = this.isFullscreen ? [
          {
            ...seriesBase,
            markLine: {
              ...markLine,
              data: markLine.data.map(item => ({
                ...item,
                y: 28,
                label: {
                  show: false,
                },
                lineStyle: {
                  color: item.emergencyDegree === 0 ? '#F2BA40' : '#FE8C59',
                },
                emphasis: {},
              })),
            },
          },
          {
            type: 'custom',
            data: this.engineeringScheduleList.map((_, index) => [index]),
            renderItem: renderAxisLabelItem,
            encode: {
              x: -1,
              y: 0
            },
          },
        ] : seriesBase;

        this.ganttChart.setOption({
          dataZoom,
          grid,
          xAxis,
          yAxis,
          series,
          backgroundColor: this.isFullscreen && '#F8F9FB',
        });

        // all the event listeners
        this.ganttChart.off('click');
        this.ganttChart.on('click', 'series.custom', event => {
          if (event.componentType === 'markLine') { // 里程碑
            this.clickedMarklineName = event.name;
            this.renderChart();
          } else if (event.componentSubType === 'custom') { // 工程工序项
            // 暂时只能想到用z2字段判断，可想下更好的方法
            const z2 = event.event.target.z2;
            const index = event.dataIndex;
            const selectedItem = this.engineeringScheduleList[index];
            if (selectedItem._type === 'engineering') {
              if (z2 === 18 || z2 === 16 || z2 === 11 || z2 === 6) { // add default z2SelectLift 1, number should be changed if custom.axisLabel's z2 prop changed
                this.clickEngineeringLabel(selectedItem, index);
                this.renderChart();
                this.resizeChart();
              } else {
                this.$emit('click-engineering', selectedItem);
              }
            } else {
              this.$emit('click-process', selectedItem);
            }
          }
        });
        this.ganttChart.off('dataZoom');
        this.ganttChart.on('dataZoom', event => {
          if (event?.batch[0].dataZoomId === 'zoomX') {
            this.dataZoomStart = event.batch[0].start;
          }
        });
      });
    },
    resizeChart() {
      this.$nextTick(() => {
        const resizeOpts = this.isFullscreen ? {
          width: window.innerHeight,
          height: window.innerWidth - 40/* gantt-header's height */,
        } : {
          height: this.chartHeight,
        };
        this.ganttChart && this.ganttChart.resize(resizeOpts);
      });
    },
    simulatePinch() {
      this.$nextTick(() => {
        // 全屏时模拟pinchin & pinchout事件 可以手势更改时间颗粒度 minValueSpan & maxValueSpan
        // why not dataZoom's zoomLock?
        // can not solve in mobile 1如何只缩放X轴数据不影响到Y轴数据？ 2缩放到最大时如何禁止默认slider滑动行为?
        this.hammer = new Hammer(this.$refs.ganttRef);
        this.hammer.get('pinch').set({
          enable: true,
        });

        if (this.isFullscreen) {
          const onPinch = event => {
            if (event.type === 'pinchin') {
              if (this.valueSpanIndex >= 5) return;
              this.valueSpanIndex++;
            } else if (event.type === 'pinchout') {
              if  (this.valueSpanIndex <= 0) return;
              this.valueSpanIndex--;
            }
            this.renderChart();
          };
          const _onPinch = throttle(onPinch, 500, { trailing: false });
          this.hammer.on('pinchin pinchout', _onPinch);
        } else {
          this.hammer.off('pinchin pinchout');
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.fullscreen {
  position: absolute;
  transform: rotate(90deg) translate3d(0, 0, 0) !important;
  transform-origin: 0 !important;
  width: 100vh !important;
  height: 100vw !important;
  top: -50vw !important;
  left: 50% !important;
  z-index: 1998 !important;
  background: white !important;
  overflow: hidden;
  .gantt-header {
    height: 40px;
    color: #323232;
    background: linear-gradient(90deg, #D7DCE4 -1.11%, #EBEDF0 100.62%);
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-name {
      flex: 0 0 auto;
      width: 254px;
      padding-left: 44px;
      box-sizing: border-box;
      // height: 20px;
      // line-height: 20px;
      font-size: 14px;
      font-weight: bold;
    }
    &-switch {
      flex: 1;
      height: 16px;
      line-height: 16px;
      font-size: 12px;
      display: flex;
      align-items: center;
    }
    &-close {
      flex: 0 0 auto;
      width: 24px;
      height: 24px;
      margin: 8px;
      background: white;
      border-radius: 100px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.gantt-chart {
  width: 100%;
  // height: 380px;
  height: 100%;
  overflow: hidden;
  &.touch-action {
    touch-action: auto !important; // fix echarts's bug when switch to fullscreen and back
    // -webkit-user-drag: auto !important;
  }
}
.expand-block {
  height: 56px;
  line-height: 56px;
  font-size: 14px;
  color: #ADADAD;
  // margin: 18px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &::after {
    content: '';
    margin-left: 6px;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #ADADAD;
  }
  &.expanded::after {
    transform: rotate(180deg);
  }
}
</style>
