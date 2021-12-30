<template>
  <section class="mui-demo-section">
    <slot />
  </section>
</template>

<script>
export default {
  name: 'demo-section'
};
</script>

<style lang="less">
.mui-demo-section {
  box-sizing: border-box;
  min-height: calc(100vh - 56px -58px);
  padding-bottom: 20px;
}
</style>
