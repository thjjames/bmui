import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    name: 'home',
    path: '/',
    alias: '/home',
    component: () => import('../../README.md')
  },
  ...__config__.nav.map(i => i.items).flat().map(i => ({
    name: i.path,
    path: `/${i.path}`,
    component: () => import(`@/${i.path}/README.md`)
  }))
];

export const router = new VueRouter({
  mode: 'hash',
  routes
});

router.afterEach((to) => {
  // 监听route变化 同步到iframe
  const iframe = document.querySelector('iframe');
  if (iframe) {
    iframe.contentWindow.postMessage({
      type: 'replacePath',
      value: to.name
    }, '*');
  }
});
