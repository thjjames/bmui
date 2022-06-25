<template>
  <div class="mui-demo-home">
    <h1 class="mui-demo-home__title">
      <img src="../mui.webp" />
      <span>Mui</span>
    </h1>
    <h2 class="mui-demo-home__desc">
      业务组件库
    </h2>
    <div class="mui-demo-home-nav" v-for="(group, index) in config.slice(1)" :key="index">
      <div class="mui-demo-home-nav__title">{{ group.title }}</div>
      <div class="mui-demo-home-nav__group">
        <router-link
          class="mui-demo-home-nav__block"
          v-for="navItem in group.items"
          :key="navItem.path"
          :to="`/${navItem.path}`"
        >
          {{ `${navItem.path} ${navItem.title}` }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mui-demo-home',
  data() {
    return {
      config: __config__.nav
    };
  },
};
</script>

<style lang="less">
.mui-demo-home {
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  padding: 16px;
  background: #fff;

  &__title,
  &__desc {
    padding-left: 16px;
    font-weight: normal;
    line-height: 1;
    user-select: none;
  }

  &__title {
    margin: 0 0 16px;
    font-size: 32px;

    img,
    span {
      display: inline-block;
      vertical-align: middle;
    }

    img {
      width: 32px;
    }

    span {
      margin-left: 16px;
    }
  }

  &__desc {
    margin: 0 0 32px;
    color: rgba(69, 90, 100, 0.6);
    font-size: 14px;
  }

  .mui-demo-home-nav {
    &__title {
      margin: 24px 0 8px 16px;
      color: rgba(69, 90, 100, 0.6);
      font-size: 14px;
    }

    &__block {
      text-decoration: none;
      position: relative;
      display: flex;
      margin: 0 0 12px;
      padding-left: 20px;
      color: #323233;
      font-weight: 600;
      font-size: 14px;
      line-height: 40px;
      background: #f7f8fa;
      border-radius: 99px;
      transition: background 0.3s;

      &:hover {
        background: darken(#f7f8fa, 3%);
      }

      &:active {
        background: darken(#f7f8fa, 6%);
      }
    }

    &__icon {
      position: absolute;
      top: 50%;
      right: 16px;
      width: 16px;
      height: 16px;
      margin-top: -8px;
    }
  }
}
</style>
