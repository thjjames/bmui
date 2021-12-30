<template>
  <div v-show="isShowHeader" class="mui-demo-header">
    <div class="mui-demo-header__title">{{ $route.name }}</div>
    <svg class="mui-demo-header__back" viewBox="0 0 1000 1000" @click="onBack">
      <path fill="#969799" fill-rule="evenodd" :d="path" />
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path:
        'M296.114 508.035c-3.22-13.597.473-28.499 11.079-39.105l333.912-333.912c16.271-16.272 42.653-16.272 58.925 0s16.272 42.654 0 58.926L395.504 498.47l304.574 304.574c16.272 16.272 16.272 42.654 0 58.926s-42.654 16.272-58.926 0L307.241 528.058a41.472 41.472 0 0 1-11.127-20.023z',
    };
  },
  computed: {
    isShowHeader() {
      return __config__.nav.slice(1).map(i => i.items).flat().map(i => i.path).includes(this.$route.name);
    }
  },
  methods: {
    onBack() {
      // 这里可能不会触发router.afterEach 可以考虑改为watch $route.name解决
      if (history.length > 1) {
        this.$router.back();
      } else {
        this.$router.replace({ name: 'home' });
      }
    },
  },
};
</script>

<style lang="less">
.mui-demo-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  background-color: #fff;

  &__title {
    font-weight: 600;
    font-size: 17px;
    text-transform: capitalize;
  }

  &__back {
    position: absolute;
    top: 16px;
    left: 16px;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
}
</style>
