<template>
  <div class="app">
    <mui-example :simulatorSrc="simulatorSrc">
      <router-view />
    </mui-example>
  </div>
</template>

<script>
import MuiExample from './component';

export default {
  components: {
    MuiExample
  },

  data() {
    const path = location.pathname.replace(/\/index(\.html)?/, '/');

    return {
      simulatorSrc: `${path}mobile.html${location.hash}`
    };
  },

  computed: {
  },

  mounted() {
    // 接收子级iframe's route变化 保持自身同步
    window.addEventListener('message', event => {
      if (event.data?.type !== 'replacePath') {
        return;
      }

      const name = event.data?.value || '';
      if (this.$route.name !== name) {
        this.$router.replace({ name }).catch(() => {});
      }
    });
  },

  methods: {
  },
};
</script>

<style lang="less">
@import '~@/style/index';
@import '../../build/md-parser-loader/highlight.less';
</style>
