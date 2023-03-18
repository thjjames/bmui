import Vue from 'vue';
import App from './app.vue';
import { router } from './router';
import demoBlock from './component/demoBlock';
import demoSection from './component/demoSection';
import Vant from 'vant';
import 'vant/lib/index.css';
import Bmui from '@/index';
import './touch-emulator';

Vue.config.debug = true;
Vue.component(demoBlock.name, demoBlock);
Vue.component(demoSection.name, demoSection);
Vue.use(Vant);
Vue.use(Bmui);

new Vue({
  el: '#app',
  render: h => h(App),
  router
});

