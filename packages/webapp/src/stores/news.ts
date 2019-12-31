import { make } from 'vuex-pathify'
import axios from 'axios';

const state = {
  newsItems: [],
  loadingNews: false,
  loadingNewsError: false
};

const mutations = make.mutations(state);

const actions = {
  async loadNews(ctx, type: string) {
    try {
      ctx.commit('SET_LOADING_NEWS', true);
      const res = await axios.get(`/api/news/${type}`);
      ctx.commit('SET_NEWS_ITEMS', res.data);
    } catch (err) {
      console.error(err);
      ctx.commit('SET_LOADING_NEW_ERROR', true);
    }
    ctx.commit('SET_LOADING_NEWS', false);
  }
}

export default {
  state,
  mutations,
  actions,
  namespaced: true
};