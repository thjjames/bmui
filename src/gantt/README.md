# Gantt 甘特图

### 介绍

基于[echarts5](https://echarts.apache.org/zh/index.html)的 canvas 和 svg 功能描绘甘特图。

### 引入

```js
import Vue from "vue";
import { BmuiGantt } from "bmui";

Vue.use(BmuiGantt);
```

## 代码演示

### 基础用法

甘特图通过 `v-model` 绑定全屏展示的状态， `data` 属性来定义渲染内容。

```html
<mui-cell title="全屏模式" is-link @click="isFullscreen = true" />
<bmui-gantt
  v-model="isFullscreen"
  :data="data"
  @clickTask="$toast('点击任务事件')"
  @clickSubTask="$toast('点击子任务事件')"
/>
```

```js
export default {
  components: {},
  data() {
    return {
      isFullscreen: false,
      data: {},
    };
  },
};
```

## API

### Props

| 参数    | 说明         | 类型      | 默认值  |
| ------- | ------------ | --------- | ------- |
| v-model | 是否全屏模式 | _boolean_ | `false` |
| data    | 数据         | _object_  | `{}`    |

### Events

| 事件名       | 说明             | 回调参数 |
| ------------ | ---------------- | -------- |
| clickTask    | 点击任务时触发   | -        |
| clickSubTask | 点击子任务时触发 | -        |
