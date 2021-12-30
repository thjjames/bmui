<template>
  <div class="mui-demo-block">
    <h2 v-if="title" class="mui-demo-block__title">{{ title }}</h2>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'demo-block',

  props: {
    title: String,
  },
};
</script>

<style lang="less">
.mui-demo-block {
  padding: 0 16px;
  &__title {
    margin: 0;
    padding: 16px 0;
    color: #34495e;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
  }

  &:first-of-type {
    .mui-demo-block__title {
      padding-top: 20px;
    }
  }
}
</style>
