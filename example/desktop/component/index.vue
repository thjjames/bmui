<template>
  <div class="mui-example">
    <example-nav />
    <example-content>
      <slot />
    </example-content>
    <example-simulator :src="simulatorSrc" />
  </div>
</template>

<script>
import ExampleNav from './nav';
import ExampleContent from './content';
import ExampleSimulator from './simulator';

export default {
  name: 'mui-example',

  components: {
    ExampleNav,
    ExampleContent,
    ExampleSimulator,
  },

  props: {
    simulatorSrc: String,
  },
};
</script>

<style lang="less">
body {
  min-width: 1100px;
  height: 100%;
  margin: 0;
  overflow-x: auto;
  color: #323233;
  font-size: 16px;
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
  background-color: #f7f8fa;
  -webkit-font-smoothing: antialiased;
  .mui-example {
    display: flex;
    height: 100vh;
  }
}
</style>
