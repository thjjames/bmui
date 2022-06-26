<template>
  <demo-section>
    <demo-block title="基础用法">
      <van-cell title="切换数据" :value="name" is-link @click="isShowPicker = true" />
      <van-cell title="全屏模式" is-link @click="isFullscreen = true" />
      <bmui-gantt v-model="isFullscreen" :data="data[name]" @click-engineering="$toast('点击工程事件')" @click-process="$toast('点击工序事件')" />
      <van-popup
        v-model="isShowPicker"
        round
        position="bottom"
      >
        <van-picker :columns="Object.keys(data)" :show-toolbar="false" @change="onPickerChange" />
      </van-popup>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      isShowPicker: false,
      isFullscreen: false,
      name: '上海闵行天街一期（正常工期）',
      data: {
        '上海闵行天街一期（正常工期）': {
          'projectName': '上海闵行天街一期',
          'startDate': '2021-08-01T00:00:00.000+0800',
          'endDate': '2022-08-31T00:00:00.000+0800',
          'status': 1,
          'actualRatio': 7.00,
          'emergencyDegree': 1,
          'engineeringScheduleList': [{
            'engineeringScheduleId': 14116,
            'engineeringName': '熊氏建设:桩基工程',
            'startDate': '2021-08-01T00:00:00.000+0800',
            'endDate': '2021-08-31T00:00:00.000+0800',
            'status': 1,
            'actualRatio': 10.00,
            'emergencyDegree': 1,
            'processSchedules': [{
              'processScheduleId': 579,
              'processScheduleName': '熊大:桩基础施工',
              'startDate': '2021-08-01T00:00:00.000+0800',
              'endDate': '2021-08-31T00:00:00.000+0800',
              'status': 2,
              'actualRatio': 100.00,
              'emergencyDegree': 0
            }]
          }, {
            'engineeringScheduleId': 14132,
            'engineeringName': '熊氏建设:结构工程',
            'startDate': '2021-08-01T00:00:00.000+0800',
            'endDate': '2021-08-31T00:00:00.000+0800',
            'status': 2,
            'actualRatio': 100.00,
            'emergencyDegree': 0,
            'processSchedules': [{
              'processScheduleId': 594,
              'processScheduleName': '熊二:模板安装',
              'startDate': '2021-08-01T00:00:00.000+0800',
              'endDate': '2021-08-31T00:00:00.000+0800',
              'status': 2,
              'actualRatio': 100.00,
              'emergencyDegree': 0
            }, {
              'processScheduleId': 593,
              'processScheduleName': '熊大:桩头处理',
              'startDate': '2021-08-04T00:00:00.000+0800',
              'endDate': '2021-08-05T00:00:00.000+0800',
              'status': 2,
              'actualRatio': 100.00,
              'emergencyDegree': 0
            }]
          }, {
            'engineeringScheduleId': 14131,
            'engineeringName': '熊氏建设:抹灰工程',
            'startDate': '2021-08-09T00:00:00.000+0800',
            'endDate': '2021-09-31T00:00:00.000+0800',
            'status': 2,
            'actualRatio': 100.00,
            'emergencyDegree': 0,
            'processSchedules': [{
              'processScheduleId': 592,
              'processScheduleName': '熊大:墙体抹灰(外抹灰)',
              'startDate': '2021-08-09T00:00:00.000+0800',
              'endDate': '2021-09-16T00:00:00.000+0800',
              'status': 2,
              'actualRatio': 100.00,
              'emergencyDegree': 0
            }]
          }, {
            'engineeringScheduleId': 14138,
            'engineeringName': '熊氏建设:机电安装工程',
            'startDate': '2021-08-21T00:00:00.000+0800',
            'endDate': '2022-05-31T00:00:00.000+0800',
            'status': 1,
            'actualRatio': 3.00,
            'emergencyDegree': 1,
            'processSchedules': [{
              'processScheduleId': 634,
              'processScheduleName': '熊二:电气工程',
              'startDate': '2021-08-21T00:00:00.000+0800',
              'endDate': '2021-08-29T00:00:00.000+0800',
              'status': 2,
              'actualRatio': 100.00,
              'emergencyDegree': 0
            }, {
              'processScheduleId': 636,
              'processScheduleName': '熊大:电扶梯工程',
              'startDate': '2021-11-21T00:00:00.000+0800',
              'endDate': '2022-01-31T00:00:00.000+0800',
              'status': 1,
              'actualRatio': 70.00,
              'emergencyDegree': 0
            }]
          }, {
            'engineeringScheduleId': 14182,
            'engineeringName': '熊氏建设:屋面工程',
            'startDate': '2021-09-20T00:00:00.000+0800',
            'endDate': '2022-08-31T00:00:00.000+0800',
            'status': 2,
            'actualRatio': 100.00,
            'emergencyDegree': 0,
            'processSchedules': []
          }, {
            'engineeringScheduleId': 14183,
            'engineeringName': '熊氏建设:防水工程',
            'startDate': '2021-10-23T00:00:00.000+0800',
            'endDate': '2021-12-31T00:00:00.000+0800',
            'status': 1,
            'actualRatio': 89.00,
            'emergencyDegree': 1,
            'processSchedules': [{
              'processScheduleId': 640,
              'processScheduleName': '熊大:消防水工程施工',
              'startDate': '2021-10-23T00:00:00.000+0800',
              'endDate': '2021-10-28T00:00:00.000+0800',
              'status': 1,
              'actualRatio': 3.00,
              'emergencyDegree': 1
            }, {
              'processScheduleId': 649,
              'processScheduleName': '熊二:地下室防水施工',
              'startDate': '2021-10-23T00:00:00.000+0800',
              'endDate': '2021-12-31T00:00:00.000+0800',
              'status': 1,
              'actualRatio': 88.00,
              'emergencyDegree': 1
            }]
          }, {
            'engineeringScheduleId': 14184,
            'engineeringName': '熊氏建设:燃气工程',
            'startDate': '2021-11-24T00:00:00.000+0800',
            'endDate': '2022-06-31T00:00:00.000+0800',
            'status': 1,
            'actualRatio': 21.00,
            'emergencyDegree': 1,
            'processSchedules': [{
              'processScheduleId': 655,
              'processScheduleName': '熊大:燃气工程施工',
              'startDate': '2021-11-24T00:00:00.000+0800',
              'endDate': '2022-05-24T00:00:00.000+0800',
              'status': 2,
              'actualRatio': 100.00,
              'emergencyDegree': 0
            }]
          }],
          'projectMilestoneList': [{
            'name': '开工',
            'deadline': '2021-08-01T00:00:00.000+0800',
            'emergencyDegree': 0,
          }, {
            'name': '主体结构完成',
            'deadline': '2021-12-30T00:00:00.000+0800',
            'emergencyDegree': 0,
          }]
        },
        '上海闵行天街二期（短期）': {
          'projectName': '上海闵行天街二期',
          'startDate': '2021-08-15T00:00:00.000+0800',
          'endDate': '2021-09-30T00:00:00.000+0800',
          'status': 1,
          'actualRatio': 14.00,
          'emergencyDegree': 1,
          'engineeringScheduleList': [
            {
              'engineeringScheduleId': 14038,
              'engineeringName': '熊氏重工:抹灰工程',
              'startDate': '2021-08-15T00:00:00.000+0800',
              'endDate': '2021-09-30T00:00:00.000+0800',
              'status': 0,
              'actualRatio': 0,
              'emergencyDegree': 0,
              'processSchedules': []
            },
            {
              'engineeringScheduleId': 14066,
              'engineeringName': '熊氏重工:桩基工程',
              'startDate': '2021-08-19T00:00:00.000+0800',
              'endDate': '2021-08-26T00:00:00.000+0800',
              'status': 1,
              'actualRatio': 25.00,
              'emergencyDegree': 1,
              'processSchedules': [
                {
                  'processScheduleId': 665,
                  'processScheduleName': '熊三:桩基础施工',
                  'startDate': '2021-08-19T00:00:00.000+0800',
                  'endDate': '2021-08-26T00:00:00.000+0800',
                  'status': 1,
                  'actualRatio': 25.00,
                  'emergencyDegree': 1
                }
              ]
            },
            {
              'engineeringScheduleId': 14122,
              'engineeringName': '熊氏重工:屋面工程',
              'startDate': '2021-08-20T00:00:00.000+0800',
              'endDate': '2021-09-30T00:00:00.000+0800',
              'status': 3,
              'actualRatio': 0,
              'emergencyDegree': 0,
              'processSchedules': [
                {
                  'processScheduleId': 891,
                  'processScheduleName': '熊三:屋面面层施工',
                  'startDate': '2021-08-20T00:00:00.000+0800',
                  'endDate': '2021-08-22T00:00:00.000+0800',
                  'status': 3,
                  'actualRatio': 0,
                  'emergencyDegree': 0
                }
              ]
            },
            {
              'engineeringScheduleId': 14202,
              'engineeringName': '熊氏重工:防水工程',
              'startDate': '2021-08-24T00:00:00.000+0800',
              'endDate': '2021-09-30T00:00:00.000+0800',
              'status': 3,
              'actualRatio': 0,
              'emergencyDegree': 0,
              'processSchedules': [
                {
                  'processScheduleId': 770,
                  'processScheduleName': '熊三:阳台、厨卫、露台防水施工',
                  'startDate': '2021-08-24T00:00:00.000+0800',
                  'endDate': '2021-08-25T00:00:00.000+0800',
                  'status': 3,
                  'actualRatio': 0,
                  'emergencyDegree': 0
                }
              ]
            },
            {
              'engineeringScheduleId': 14231,
              'engineeringName': '熊氏重工:砌体工程',
              'startDate': '2021-09-02T00:00:00.000+0800',
              'endDate': '2021-09-30T00:00:00.000+0800',
              'status': 1,
              'actualRatio': 62.00,
              'emergencyDegree': 1,
              'processSchedules': [
                {
                  'processScheduleId': 769,
                  'processScheduleName': '熊三:砌体结构施工(砌体，二结构模板，ALC安装)',
                  'startDate': '2021-09-02T00:00:00.000+0800',
                  'endDate': '2021-09-28T00:00:00.000+0800',
                  'status': 1,
                  'actualRatio': 12.00,
                  'emergencyDegree': 1
                },
                {
                  'processScheduleId': 780,
                  'processScheduleName': '熊三:电气结构预留预埋施工',
                  'startDate': '2021-09-22T00:00:00.000+0800',
                  'endDate': '2021-09-30T00:00:00.000+0800',
                  'status': 2,
                  'actualRatio': 100.00,
                  'emergencyDegree': 0
                }
              ]
            }
          ],
          'projectMilestoneList': [
            {
              'name': '砌体完成',
              'deadline': '2021-09-30T00:00:00.000+0800',
              'emergencyDegree': 1,
            }
          ]
        },
        '上海龙湖天街（长期-性能测试）': {
          'projectName': '上海龙湖天街',
          'startDate': '2019-08-12T00:00:00.000+0800',
          'endDate': '2022-02-12T00:00:00.000+0800',
          'status': 1,
          'actualRatio': 9.00,
          'emergencyDegree': 1,
          'engineeringScheduleList': [{
            'engineeringScheduleId': 13830,
            'engineeringName': '熊氏重工:桩基工程',
            'startDate': '2019-08-12T00:00:00.000+0800',
            'endDate': '2019-08-16T00:00:00.000+0800',
            'status': 2,
            'actualRatio': 100.00,
            'emergencyDegree': 0,
            'processSchedules': []
          }, {
            'engineeringScheduleId': 13836,
            'engineeringName': '熊氏重工:砌体工程',
            'startDate': '2019-08-12T00:00:00.000+0800',
            'endDate': '2020-09-01T00:00:00.000+0800',
            'status': 2,
            'actualRatio': 100.00,
            'emergencyDegree': 0,
            'processSchedules': [{
              'processScheduleId': 601,
              'processScheduleName': '熊三:电气结构预留预埋施工',
              'startDate': '2019-08-12T00:00:00.000+0800',
              'endDate': '2020-07-14T00:00:00.000+0800',
              'status': 2,
              'actualRatio': 100.00,
              'emergencyDegree': 0
            }, {
              'processScheduleId': 602,
              'processScheduleName': '熊三:砌体结构施工(砌体)',
              'startDate': '2020-07-15T00:00:00.000+0800',
              'endDate': '2020-09-01T00:00:00.000+0800',
              'status': 2,
              'actualRatio': 100.00,
              'emergencyDegree': 0
            }]
          }, {
            'engineeringScheduleId': 13886,
            'engineeringName': '熊氏重工:结构工程',
            'startDate': '2020-02-22T00:00:00.000+0800',
            'endDate': '2021-11-26T00:00:00.000+0800',
            'status': 0,
            'actualRatio': 0,
            'emergencyDegree': 1,
            'processSchedules': [{
              'processScheduleId': 360,
              'processScheduleName': '熊大:模板安装',
              'startDate': '2020-02-22T00:00:00.000+0800',
              'endDate': '2021-06-23T00:00:00.000+0800',
              'status': 0,
              'actualRatio': 0,
              'emergencyDegree': 0
            }, {
              'processScheduleId': 364,
              'processScheduleName': '熊熊:桩头处理',
              'startDate': '2020-02-22T00:00:00.000+0800',
              'endDate': '2021-06-24T00:00:00.000+0800',
              'status': 0,
              'actualRatio': 0,
              'emergencyDegree': 1
            }, {
              'processScheduleId': 370,
              'processScheduleName': '熊大:砖胎膜砌筑',
              'startDate': '2020-02-24T00:00:00.000+0800',
              'endDate': '2021-09-25T00:00:00.000+0800',
              'status': 0,
              'actualRatio': 0,
              'emergencyDegree': 1
            }, {
              'processScheduleId': 371,
              'processScheduleName': '熊二:砖胎膜砌筑',
              'startDate': '2020-02-24T00:00:00.000+0800',
              'endDate': '2021-09-25T00:00:00.000+0800',
              'status': 0,
              'actualRatio': 0,
              'emergencyDegree': 1
            }, {
              'processScheduleId': 372,
              'processScheduleName': '熊三:砖胎膜砌筑',
              'startDate': '2020-02-24T00:00:00.000+0800',
              'endDate': '2021-09-25T00:00:00.000+0800',
              'status': 0,
              'actualRatio': 0,
              'emergencyDegree': 1
            }, {
              'processScheduleId': 373,
              'processScheduleName': '熊二:混凝土浇筑',
              'startDate': '2021-09-22T00:00:00.000+0800',
              'endDate': '2021-11-26T00:00:00.000+0800',
              'status': 3,
              'actualRatio': 0,
              'emergencyDegree': 0
            }]
          }, {
            'engineeringScheduleId': 13888,
            'engineeringName': '熊氏重工:结构工程',
            'startDate': '2020-03-26T00:00:00.000+0800',
            'endDate': '2020-03-30T00:00:00.000+0800',
            'status': 3,
            'actualRatio': 0,
            'emergencyDegree': 0,
            'processSchedules': [{
              'processScheduleId': 673,
              'processScheduleName': '熊二:内架搭设',
              'startDate': '2020-03-26T00:00:00.000+0800',
              'endDate': '2020-03-27T00:00:00.000+0800',
              'status': 3,
              'actualRatio': 0,
              'emergencyDegree': 0
            }, {
              'processScheduleId': 674,
              'processScheduleName': '熊三:外架搭设',
              'startDate': '2020-03-27T00:00:00.000+0800',
              'endDate': '2020-03-30T00:00:00.000+0800',
              'status': 3,
              'actualRatio': 0,
              'emergencyDegree': 0
            }]
          }, {
            'engineeringScheduleId': 13865,
            'engineeringName': '熊氏重工:屋面工程',
            'startDate': '2020-05-18T00:00:00.000+0800',
            'endDate': '2020-05-27T00:00:00.000+0800',
            'status': 0,
            'actualRatio': 0,
            'emergencyDegree': 1,
            'processSchedules': [{
              'processScheduleId': 640,
              'processScheduleName': '熊二:屋面面层施工',
              'startDate': '2020-05-18T00:00:00.000+0800',
              'endDate': '2020-05-20T00:00:00.000+0800',
              'status': 0,
              'actualRatio': 0,
              'emergencyDegree': 1
            }, {
              'processScheduleId': 643,
              'processScheduleName': '熊三:屋面装饰层施工',
              'startDate': '2020-05-20T00:00:00.000+0800',
              'endDate': '2020-05-27T00:00:00.000+0800',
              'status': 0,
              'actualRatio': 0,
              'emergencyDegree': 1
            }]
          }, {
            'engineeringScheduleId': 13840,
            'engineeringName': '熊氏重工:抹灰工程',
            'startDate': '2020-05-20T00:00:00.000+0800',
            'endDate': '2021-02-02T00:00:00.000+0800',
            'status': 0,
            'actualRatio': 0,
            'emergencyDegree': 1,
            'processSchedules': [{
              'processScheduleId': 606,
              'processScheduleName': '熊大:墙体抹灰(外抹灰)',
              'startDate': '2020-05-20T00:00:00.000+0800',
              'endDate': '2021-02-02T00:00:00.000+0800',
              'status': 0,
              'actualRatio': 0,
              'emergencyDegree': 1
            }, {
              'processScheduleId': 607,
              'processScheduleName': '熊二:墙体抹灰(内抹灰)',
              'startDate': '2020-06-06T00:00:00.000+0800',
              'endDate': '2020-06-24T00:00:00.000+0800',
              'status': 0,
              'actualRatio': 0,
              'emergencyDegree': 1
            }]
          }, {
            'engineeringScheduleId': 13897,
            'engineeringName': '熊氏重工:防水工程',
            'startDate': '2020-07-30T00:00:00.000+0800',
            'endDate': '2020-08-31T00:00:00.000+0800',
            'status': 1,
            'actualRatio': 11.00,
            'emergencyDegree': 1,
            'processSchedules': [{
              'processScheduleId': 398,
              'processScheduleName': '熊二:阳台、厨卫、露台防水施工',
              'startDate': '2020-07-30T00:00:00.000+0800',
              'endDate': '2020-08-15T00:00:00.000+0800',
              'status': 0,
              'actualRatio': 0,
              'emergencyDegree': 1
            }, {
              'processScheduleId': 400,
              'processScheduleName': '熊二:地下室防水施工',
              'startDate': '2020-07-30T00:00:00.000+0800',
              'endDate': '2020-08-31T00:00:00.000+0800',
              'status': 1,
              'actualRatio': 19.00,
              'emergencyDegree': 1
            }, {
              'processScheduleId': 404,
              'processScheduleName': '熊大:屋面防水施工',
              'startDate': '2020-08-02T00:00:00.000+0800',
              'endDate': '2020-08-10T00:00:00.000+0800',
              'status': 1,
              'actualRatio': 4.00,
              'emergencyDegree': 1
            }]
          }, {
            'engineeringScheduleId': 13902,
            'engineeringName': '熊氏重工:机电安装工程',
            'startDate': '2020-09-06T00:00:00.000+0800',
            'endDate': '2021-09-31T00:00:00.000+0800',
            'status': 1,
            'actualRatio': 97.00,
            'emergencyDegree': 1,
            'processSchedules': [{
              'processScheduleId': 439,
              'processScheduleName': '熊大:电气工程',
              'startDate': '2020-09-06T00:00:00.000+0800',
              'endDate': '2020-09-22T00:00:00.000+0800',
              'status': 2,
              'actualRatio': 100.00,
              'emergencyDegree': 0
            }, {
              'processScheduleId': 441,
              'processScheduleName': '熊熊:电扶梯工程',
              'startDate': '2020-09-06T00:00:00.000+0800',
              'endDate': '2021-09-31T00:00:00.000+0800',
              'status': 1,
              'actualRatio': 97.00,
              'emergencyDegree': 1
            }, {
              'processScheduleId': 442,
              'processScheduleName': '熊熊:消防水工程施工',
              'startDate': '2020-09-26T00:00:00.000+0800',
              'endDate': '2020-09-30T00:00:00.000+0800',
              'status': 3,
              'actualRatio': 0,
              'emergencyDegree': 0
            }, {
              'processScheduleId': 445,
              'processScheduleName': '熊二:采暖工程施工',
              'startDate': '2020-09-27T00:00:00.000+0800',
              'endDate': '2020-09-31T00:00:00.000+0800',
              'status': 1,
              'actualRatio': 54.00,
              'emergencyDegree': 1
            }, {
              'processScheduleId': 446,
              'processScheduleName': '熊三:空调工程施工',
              'startDate': '2020-10-01T00:00:00.000+0800',
              'endDate': '2020-10-31T00:00:00.000+0800',
              'status': 1,
              'actualRatio': 60.00,
              'emergencyDegree': 1
            }]
          }, {
            'engineeringScheduleId': 13856,
            'engineeringName': '熊氏重工:室内装修工程',
            'startDate': '2020-10-10T00:00:00.000+0800',
            'endDate': '2021-06-10T00:00:00.000+0800',
            'status': 0,
            'actualRatio': 0,
            'emergencyDegree': 1,
            'processSchedules': [{
              'processScheduleId': 618,
              'processScheduleName': '熊二:精装湿作业(抹灰)',
              'startDate': '2020-10-10T00:00:00.000+0800',
              'endDate': '2021-04-10T00:00:00.000+0800',
              'status': 0,
              'actualRatio': 0,
              'emergencyDegree': 1
            }, {
              'processScheduleId': 623,
              'processScheduleName': '熊二:弱电施工',
              'startDate': '2021-03-10T00:00:00.000+0800',
              'endDate': '2021-06-10T00:00:00.000+0800',
              'status': 3,
              'actualRatio': 0,
              'emergencyDegree': 0
            }]
          }, {
            'engineeringScheduleId': 13858,
            'engineeringName': '熊氏重工:公区装修工程',
            'startDate': '2021-05-01T00:00:00.000+0800',
            'endDate': '2021-05-02T00:00:00.000+0800',
            'status': 0,
            'actualRatio': 0,
            'emergencyDegree': 0,
            'processSchedules': []
          }, {
            'engineeringScheduleId': 13859,
            'engineeringName': '熊氏重工:私区装修工程',
            'startDate': '2021-05-01T00:00:00.000+0800',
            'endDate': '2021-05-02T00:00:00.000+0800',
            'status': 3,
            'actualRatio': 0,
            'emergencyDegree': 0,
            'processSchedules': []
          }, {
            'engineeringScheduleId': 13909,
            'engineeringName': '熊氏重工:小市政工程',
            'startDate': '2021-09-18T00:00:00.000+0800',
            'endDate': '2022-02-12T00:00:00.000+0800',
            'status': 0,
            'actualRatio': 0,
            'emergencyDegree': 1,
            'processSchedules': [{
              'processScheduleId': 686,
              'processScheduleName': '熊三:道路垫层',
              'startDate': '2021-09-18T00:00:00.000+0800',
              'endDate': '2021-10-18T00:00:00.000+0800',
              'status': 0,
              'actualRatio': 0,
              'emergencyDegree': 1
            }, {
              'processScheduleId': 687,
              'processScheduleName': '熊二:强电施工',
              'startDate': '2021-09-29T00:00:00.000+0800',
              'endDate': '2021-11-25T00:00:00.000+0800',
              'status': 3,
              'actualRatio': 0,
              'emergencyDegree': 0
            }, {
              'processScheduleId': 688,
              'processScheduleName': '熊三:雨污水施工',
              'startDate': '2021-10-22T00:00:00.000+0800',
              'endDate': '2022-02-12T00:00:00.000+0800',
              'status': 0,
              'actualRatio': 0,
              'emergencyDegree': 1
            }]
          }, {
            'engineeringScheduleId': 13920,
            'engineeringName': '熊氏重工:景观工程',
            'startDate': '2021-10-12T00:00:00.000+0800',
            'endDate': '2021-12-26T00:00:00.000+0800',
            'status': 1,
            'actualRatio': 40.00,
            'emergencyDegree': 1,
            'processSchedules': [{
              'processScheduleId': 907,
              'processScheduleName': '熊二:结构施工',
              'startDate': '2021-10-12T00:00:00.000+0800',
              'endDate': '2021-12-26T00:00:00.000+0800',
              'status': 3,
              'actualRatio': 0,
              'emergencyDegree': 0
            }, {
              'processScheduleId': 908,
              'processScheduleName': '熊大:地面铺装',
              'startDate': '2021-11-12T00:00:00.000+0800',
              'endDate': '2021-12-26T00:00:00.000+0800',
              'status': 1,
              'actualRatio': 18.00,
              'emergencyDegree': 0
            }, {
              'processScheduleId': 909,
              'processScheduleName': '熊二:沥青施工',
              'startDate': '2021-11-12T00:00:00.000+0800',
              'endDate': '2021-12-26T00:00:00.000+0800',
              'status': 3,
              'actualRatio': 0,
              'emergencyDegree': 0
            }, {
              'processScheduleId': 910,
              'processScheduleName': '熊三:软景施工',
              'startDate': '2021-12-12T00:00:00.000+0800',
              'endDate': '2021-12-26T00:00:00.000+0800',
              'status': 3,
              'actualRatio': 0,
              'emergencyDegree': 0
            }]
          }],
          'projectMilestoneList': [{
            'name': '开工',
            'deadline': '2019-08-02T00:00:00.000+0800',
            'emergencyDegree': 0,
          }, {
            'name': '竣备',
            'deadline': '2019-08-12T00:00:00.000+0800',
            'emergencyDegree': 0,
          }, {
            'name': '砌体完成',
            'deadline': '2021-07-31T00:00:00.000+0800',
            'emergencyDegree': 1,
          }, {
            'name': '主体结构完成',
            'deadline': '2021-08-04T00:00:00.000+0800',
            'emergencyDegree': 1,
          }, {
            'name': '外饰面完成',
            'deadline': '2021-07-30T00:00:00.000+0800',
            'emergencyDegree': 0,
          }, {
            'name': '室内装饰完成',
            'deadline': '2021-10-01T00:00:00.000+0800',
            'emergencyDegree': 1,
          }, {
            'name': '景观完成',
            'deadline': '2021-12-26T00:00:00.000+0800',
            'emergencyDegree': 1,
          }]
        },
      }
    };
  },
  methods: {
    onPickerChange(picker, value) {
      this.name = value;
      this.isShowPicker = false;
    }
  }
};
</script>

<style lang="less" scoped>
.mui-demo-block {
  padding: 0;
}
</style>
