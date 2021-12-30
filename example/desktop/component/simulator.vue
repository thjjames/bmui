<template>
  <div class="mui-example-simulator">
    <iframe ref="iframe" :src="src" frameborder="0" />
  </div>
</template>

<script>
export default {
  name: 'mui-example-simulator',

  props: {
    src: String,
  },
};
</script>

<style lang="less">
@border-radius: 12px;

.mui-example-simulator {
  flex: 0 0 auto;
  margin: 30px 12px 0 0;
  z-index: 1;
  box-sizing: border-box;
  width: 360px;
  min-width: 360px;
  height: 640px;
  overflow: hidden;
  background: white;
  border-radius: @border-radius;
  box-shadow: #ebedf0 0 4px 12px;

  iframe {
    display: block;
    width: 100%;
    height: 640px;
  }
}
</style>
