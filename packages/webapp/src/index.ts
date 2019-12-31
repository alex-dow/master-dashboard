import Vue from 'vue';
import App from './App.vue';

import store from './stores/index';

import SegmentClock from '@retro-dashboard/segment-clock';
Vue.use(SegmentClock);



const app = new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  store
});

