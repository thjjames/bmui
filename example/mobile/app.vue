<template>
  <div>
    <demo-status-bar />
    <demo-header />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import DemoStatusBar from './component/demoStatusBar';
import DemoHeader from './component/demoHeader';

export default {
  components: {
    DemoStatusBar,
    DemoHeader
  },
  mounted() {
    // 接收父级html's route变化 保持自身同步
    window.addEventListener('message', event => {
      if (event.data?.type !== 'replacePath') {
        return;
      }

      const name = event.data?.value || '';
      if (this.$route.name !== name) {
        this.$router.replace({ name }).catch(() => {});
      }
    });
  }
};
</script>

<style lang="less">
@import '~@/style/index';
body {
  min-width: 100vw;
  margin: 0;
}

::-webkit-scrollbar {
  width: 0;
  display: none;
  background: transparent;
}
</style>
