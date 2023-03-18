<template>
  <demo-section>
    <demo-block title="基础用法">
      <van-cell
        title="切换数据"
        is-link
        :value="name"
        @click="isShowPicker = true"
      />
      <van-cell title="全屏模式" is-link @click="isFullscreen = true" />
      <bmui-gantt
        v-model="isFullscreen"
        :data="data[name]"
        @clickTask="$toast('点击任务事件')"
        @clickSubTask="$toast('点击子任务事件')"
      />
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
      name: '支付迭代5.0（正常排期）',
      data: {
        '支付迭代5.0（正常排期）': {
          'projectName': '支付迭代5.0',
          'startDate': '2021-08-01T00:00:00.000+0800',
          'endDate': '2021-10-31T00:00:00.000+0800',
          'status': 1,
          'progress': 77.00,
          'priority': 0,
          'taskList': [{
            'taskId': 14116,
            'taskName': '收银台新增支付方式',
            'startDate': '2021-08-01T00:00:00.000+0800',
            'endDate': '2021-10-31T00:00:00.000+0800',
            'status': 1,
            'progress': 30.00,
            'priority': 1,
            'subTaskList': [{
              'subTaskId': 579,
              'subTaskName': '熊前端:收银台新增支付方式',
              'startDate': '2021-08-11T00:00:00.000+0800',
              'endDate': '2021-09-31T00:00:00.000+0800',
              'status': 2,
              'progress': 100.00,
              'priority': 0,
            }, {
              'subTaskId': 580,
              'subTaskName': '熊后端:收银台新增支付方式',
              'startDate': '2021-08-01T00:00:00.000+0800',
              'endDate': '2021-08-31T00:00:00.000+0800',
              'status': 2,
              'progress': 100.00,
              'priority': 0,
            }, {
              'subTaskId': 581,
              'subTaskName': '熊测试:收银台新增支付方式',
              'startDate': '2021-10-01T00:00:00.000+0800',
              'endDate': '2021-10-10T00:00:00.000+0800',
              'status': 1,
              'progress': 5.00,
              'priority': 0,
            }],
          }, {
            'taskId': 14132,
            'taskName': '收银台迁移Native',
            'startDate': '2021-09-01T00:00:00.000+0800',
            'endDate': '2021-10-31T00:00:00.000+0800',
            'status': 2,
            'progress': 100.00,
            'priority': 0,
            'subTaskList': [{
              'subTaskId': 592,
              'subTaskName': '熊前端:收银台迁移Native',
              'startDate': '2021-10-01T00:00:00.000+0800',
              'endDate': '2021-10-06T00:00:00.000+0800',
              'status': 2,
              'progress': 100.00,
              'priority': 0,
            }, {
              'subTaskId': 593,
              'subTaskName': '熊安卓:收银台迁移Native',
              'startDate': '2021-09-01T00:00:00.000+0800',
              'endDate': '2021-10-11T00:00:00.000+0800',
              'status': 2,
              'progress': 100.00,
              'priority': 0,
            }, {
              'subTaskId': 594,
              'subTaskName': '熊IOS:收银台迁移Native',
              'startDate': '2021-09-01T00:00:00.000+0800',
              'endDate': '2021-10-11T00:00:00.000+0800',
              'status': 2,
              'progress': 100.00,
              'priority': 0,
            }, {
              'subTaskId': 595,
              'subTaskName': '熊测试:收银台迁移Native',
              'startDate': '2021-10-12T00:00:00.000+0800',
              'endDate': '2021-10-30T00:00:00.000+0800',
              'status': 2,
              'progress': 100.00,
              'priority': 0,
            }],
          }, {
            'taskId': 14182,
            'taskName': '发布验收',
            'startDate': '2021-10-30T00:00:00.000+0800',
            'endDate': '2021-10-31T00:00:00.000+0800',
            'status': 0,
            'progress': 0.00,
            'priority': 0,
            'subTaskList': [],
          }],
          'milestoneList': [{
            'name': '一阶段提测',
            'deadline': '2021-10-01T00:00:00.000+0800',
          }, {
            'name': '二阶段提测',
            'deadline': '2021-10-11T00:00:00.000+0800',
          }, {
            'name': '上线',
            'deadline': '2021-10-31T00:00:00.000+0800',
          }],
        },
        'Mock平台（长期-性能测试）': {
          'projectName': 'Mock平台',
          'startDate': '2020-08-12T00:00:00.000+0800',
          'endDate': '2022-02-12T00:00:00.000+0800',
          'status': 1,
          'progress': 23.00,
          'priority': 1,
          'taskList': [{
            'taskId': 13839,
            'taskName': 'Mock平台:方案调研',
            'startDate': '2020-08-12T00:00:00.000+0800',
            'endDate': '2020-08-16T00:00:00.000+0800',
            'status': 2,
            'progress': 100,
            'priority': 0,
            'subTaskList': [],
          }, {
            'taskId': 13850,
            'taskName': 'Mock平台:SDK',
            'startDate': '2020-08-16T00:00:00.000+0800',
            'endDate': '2020-09-16T00:00:00.000+0800',
            'status': 2,
            'progress': 100.00,
            'priority': 0,
            'subTaskList': [{
              'subTaskId': 360,
              'subTaskName': '熊前端:SDK',
              'startDate': '2020-08-16T00:00:00.000+0800',
              'endDate': '2020-09-12T00:00:00.000+0800',
              'status': 0,
              'progress': 0,
              'priority': 0,
            }, {
              'subTaskId': 364,
              'subTaskName': '熊安卓:SDK',
              'startDate': '2020-08-22T00:00:00.000+0800',
              'endDate': '2020-09-16T00:00:00.000+0800',
              'status': 0,
              'progress': 0,
              'priority': 1,
            }, {
              'subTaskId': 370,
              'subTaskName': '熊IOS:SDK',
              'startDate': '2020-08-22T00:00:00.000+0800',
              'endDate': '2020-09-16T00:00:00.000+0800',
              'status': 0,
              'progress': 0,
              'priority': 1,
            }],
          }, {
            'taskId': 13866,
            'taskName': 'Mock平台:Chrome插件',
            'startDate': '2021-08-05T00:00:00.000+0800',
            'endDate': '2022-01-30T00:00:00.000+0800',
            'status': 2,
            'progress': 100.00,
            'priority': 0,
            'subTaskList': [{
              'subTaskId': 601,
              'subTaskName': '熊前端:Chrome插件',
              'startDate': '2021-08-05T00:00:00.000+0800',
              'endDate': '2022-01-30T00:00:00.000+0800',
              'status': 2,
              'progress': 100.00,
              'priority': 0,
            }],
          }, {
            'taskId': 13876,
            'taskName': 'Mock平台:Nodejs',
            'startDate': '2020-08-16T00:00:00.000+0800',
            'endDate': '2021-07-31T00:00:00.000+0800',
            'status': 0,
            'progress': 0,
            'priority': 1,
            'subTaskList': [{
              'subTaskId': 640,
              'subTaskName': '兔前端:Nodejs-acceptor',
              'startDate': '2020-08-16T00:00:00.000+0800',
              'endDate': '2021-01-02T00:00:00.000+0800',
              'status': 0,
              'progress': 0,
              'priority': 1,
            }, {
              'subTaskId': 641,
              'subTaskName': '熊前端:Nodejs-device',
              'startDate': '2020-10-20T00:00:00.000+0800',
              'endDate': '2021-02-27T00:00:00.000+0800',
              'status': 0,
              'progress': 0,
              'priority': 1,
            }, {
              'subTaskId': 642,
              'subTaskName': '熊前端:Nodejs-mock',
              'startDate': '2021-02-28T00:00:00.000+0800',
              'endDate': '2021-04-02T00:00:00.000+0800',
              'status': 0,
              'progress': 0,
              'priority': 1,
            }, {
              'subTaskId': 643,
              'subTaskName': '兔前端:Nodejs-user',
              'startDate': '2021-04-20T00:00:00.000+0800',
              'endDate': '2021-07-31T00:00:00.000+0800',
              'status': 0,
              'progress': 0,
              'priority': 3,
            }],
          }, {
            'taskId': 13888,
            'taskName': 'Mock平台:管理后台',
            'startDate': '2021-01-03T00:00:00.000+0800',
            'endDate': '2021-03-30T00:00:00.000+0800',
            'status': 4,
            'progress': 0,
            'priority': 2,
            'subTaskList': [{
              'subTaskId': 673,
              'subTaskName': '兔前端:管理后台-调试页面',
              'startDate': '2021-01-03T00:00:00.000+0800',
              'endDate': '2021-02-20T00:00:00.000+0800',
              'status': 4,
              'progress': 0,
              'priority': 2,
            }, {
              'subTaskId': 674,
              'subTaskName': '兔前端:管理后台-管理页面',
              'startDate': '2021-02-21T00:00:00.000+0800',
              'endDate': '2020-03-30T00:00:00.000+0800',
              'status': 4,
              'progress': 0,
              'priority': 2,
            }],
          }, {
            'taskId': 13890,
            'taskName': 'Mock平台:上线',
            'startDate': '2022-02-10T00:00:00.000+0800',
            'endDate': '2022-02-12T00:00:00.000+0800',
            'status': 0,
            'progress': 0,
            'priority': 1,
            'subTaskList': [],
          }],
          'milestoneList': [{
            'name': '一阶段提测',
            'deadline': '2021-04-02T00:00:00.000+0800',
          }, {
            'name': '一阶段上线',
            'deadline': '2021-04-12T00:00:00.000+0800',
          }, {
            'name': '二阶段提测',
            'deadline': '2021-07-31T00:00:00.000+0800',
          }, {
            'name': '二阶段上线',
            'deadline': '2021-08-04T00:00:00.000+0800',
          }, {
            'name': '三阶段提测',
            'deadline': '2022-01-30T00:00:00.000+0800',
          }, {
            'name': '三阶段上线',
            'deadline': '2022-02-12T00:00:00.000+0800',
          }],
        },
      },
    };
  },
  methods: {
    onPickerChange(picker, value) {
      this.name = value;
      this.isShowPicker = false;
    },
  },
};
</script>

<style lang="less" scoped>
.mui-demo-block {
  padding: 0;
}
</style>
