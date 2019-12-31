import Vue from 'vue';
import Vuex from 'vuex';

import newsStore from './news';
import weatherStore from './weather';

Vue.use(Vuex);

export default new Vuex.Store({

  state: {},
  mutations: {},
  actions: {},
  modules: {
    news: newsStore,
    weather: weatherStore
  }

});