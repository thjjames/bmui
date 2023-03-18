<template>
  <div class="mui-demo-status-bar">
    <img class="mui-demo-status-bar__bar" src="../status-bar.png" />
    <div class="mui-demo-status-bar__url">{{ src }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: location.href
    };
  },
  watch: {
    '$route.name': {
      handler(val, oldVal) {
        if (val === oldVal) return;
        this.src = location.href
      }
    }
  }
};
</script>

<style lang="less">
.mui-demo-status-bar {
  padding: 4px;

  &__bar {
    width: 100%;
    height: 12px;
  }

  &__url {
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    // color: white;
    background-color: #ADADAD;
    margin: 0 auto;
    padding: 4px;
    border-radius: 4px;
    white-space: nowrap;
    overflow-x: scroll;
  }
}
</style>
