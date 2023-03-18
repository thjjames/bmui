import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    name: 'home',
    path: '/',
    alias: '/home',
    component: () => import('./component'),
  },
  ...__config__.nav.map(i => i.items).flat().map(i => ({
    name: i.path,
    path: `/${i.path}`,
    component: () =>
      import(`@/${i.path}/demo/index.vue`).catch(() => import('./component')),
  })),
];

export const router = new VueRouter({
  mode: 'hash',
  routes
});

router.afterEach((to) => {
  // 监听route变化 同步到window
  window.top.postMessage(
    {
      type: 'replacePath',
      value: to.name,
    },
    '*'
  );
});
