import Vue from 'vue';
import App from './app.vue';
import { router } from './router';
import './plugin'

Vue.config.debug = true;

new Vue({
  el: '#app',
  render: h => h(App),
  router
});
