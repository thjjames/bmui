<template>
  <div class="mui-example-nav">
    <div
      v-for="(group, index) in config"
      class="mui-example-nav__group"
      :key="index"
    >
      <div class="mui-example-nav__title">
        {{ group.title }}
      </div>
      <template v-if="group.items">
        <div
          v-for="(item, groupIndex) in group.items"
          :key="groupIndex"
          class="mui-example-nav__item"
        >
          <router-link
            :to="item.path"
            exact
          >
            {{ index === 0 ? item.title : `${item.path} ${item.title}` }}
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mui-example-nav',
  data() {
    return {
      config: __config__.nav
    };
  },
};
</script>

<style lang="less">
.mui-example-nav {
  flex: 0 0 auto;
  z-index: 1;
  min-width: 220px;
  max-width: 220px;
  padding: 24px 0 72px;
  overflow-y: scroll;
  background-color: #fff;
  box-shadow: 0 8px 12px #ebedf0;

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 6px;
  }

  &__group {
    margin-bottom: 16px;
  }

  &__title {
    padding: 8px 0 8px 28px;
    color: #455a64;
    font-weight: 600;
    font-size: 15px;
    line-height: 28px;
  }

  &__item {
    a {
      display: block;
      margin: 0;
      padding: 8px 0 8px 28px;
      color: #455a64;
      font-size: 14px;
      line-height: 28px;
      transition: color 0.2s;
      text-decoration: none;

      &:hover,
      &.router-link-active {
        color: #4fc08d;
      }
    }
  }
}
</style>
