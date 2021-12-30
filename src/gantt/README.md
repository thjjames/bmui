# Gantt 甘特图

### 介绍

基于[echarts5](https://echarts.apache.org/zh/index.html)的 canvas 和 svg 功能描绘工程甘特图。

### 引入

```js
import Vue from "vue";
import { BmuiGantt } from "@longfor/bmui";

Vue.use(BmuiGantt);
```

## 代码演示

### 基础用法

动作面板通过 `actions` 属性来定义选项，`actions` 属性是一个由对象构成的数组，数组中的每个对象配置一列，对象格式见文档下方表格。

```html
<mui-cell title="全屏模式" is-link @click="isFullscreen = true" />
<bmui-gantt
  v-model="isFullscreen"
  :data="data"
  @click-engineering="$toast('点击工程事件')"
  @click-process="$toast('点击工序事件')"
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

| 事件名            | 说明             | 回调参数 |
| ----------------- | ---------------- | -------- |
| click-engineering | 点击工程项时触发 | -        |
| click-process     | 点击工序项时触发 | -        |
