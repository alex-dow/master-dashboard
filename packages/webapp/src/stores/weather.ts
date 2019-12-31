import { make } from 'vuex-pathify';
import axios from 'axios';
import { CurrentWeatherItem, WeatherWarning, WeatherItem } from '@retro-dashboard/library';

interface IState {
  currentWeather?: CurrentWeatherItem
  warnings?: Array<WeatherWarning>,
  forecast?: Array<WeatherItem>,
  loaded: boolean,
  loading: boolean,
  error: boolean
};

const state: IState = {
  currentWeather: null,
  forecast: null,
  warnings: new Array<WeatherWarning>(),
  loaded: false,
  loading: false,
  error: false
};

const mutations = make.mutations(state);

mutations.SET_CURRENT_CONDITIONS = (state: IState, payload: CurrentWeatherItem) => {
  state.currentWeather = payload;
}

mutations.SET_FORECAST = (state: IState, payload: Array<WeatherItem>) => {
  state.forecast = payload;
}

const actions = {
  async loadWeather(ctx) {
    ctx.commit('SET_LOADED', false);
    ctx.commit('SET_LOADING', true);
    ctx.commit('SET_ERROR', false);

    try {
      const res = await axios.get('/api/weather');



      ctx.commit('SET_WARNINGS', res.data.warnings);
      ctx.commit('SET_CURRENT_CONDITIONS',res.data.currentReport);
      ctx.commit('SET_FORECAST', res.data.forecast);
      ctx.commit('SET_LOADED', true);

    } catch (err) {
      console.error(err);
      ctx.commit('SET_ERROR', true);
    }

    ctx.commit('SET_LOADING', true);

  }
}

export default {
  state,
  mutations,
  actions,
  namespaced: true
};