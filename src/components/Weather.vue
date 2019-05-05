<template>
<div class="weather-box">
    <h1 class="cga-yellow">
        <Typer content="Weather"/>
        <div class="loader-container" v-if="loading">
            <Loader/>
        </div> 
    </h1>

    <div class="weather-rows">
      <div class="weather-icon">
        <img :src="current_icon"/>
      </div>
      <div class="weather-info">
        <Typer :content="current_temperature" class="cga-green"/>
      </div>

    </div>
</div>
</template>

<style lang="scss">
.weather-box {
  h1 {
    font-size: 42pt;
    line-height: 1rem;
    margin: 0;
    padding: 00;
  }
  .weather-rows {
    display: flex;
    flex-flow: row;

    .weather-info {
      display: flex;
      flex-flow: column;
      padding-top: 2rem;
      font-size: 32pt;
    }

    .weather-icon {
      display: flex;
      flex-flow: column;
      filter: grayscale(100%);
      width: 8rem;
      height: 8rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>

<script>

import transformer from '@/ec-weather/transformer.js';
import reader from '@/ec-weather/reader.js';

import axios from 'axios';

import Typer from '@/components/Typer.vue';
import Loader from '@/components/Loader.vue';

const condition_icons = {
  'Partly Cloudy': {
    'day': require('@/assets/weather/cloudy-day-1.svg'),
    'night': require('@/assets/weather/cloudy-night-1.svg')
  },
  'Mostly Cloudy': {
    'day': require('@/assets/weather/cloudy.svg'),
    'night': require('@/assets/weather/cloudy.svg')
  }
};

export default {

  data() {
    return {
      loading: true,
      current_icon: '',
      current_temperature: '',
      tomorrow_icon: '',
      two_day_icon: '',
      refresh_timer: null
    }
  },

  props: {
    refresh: {
      default: 1800000
    }
  },

  components: {
    Typer,
    Loader
  },

  methods: {

    async load_weather() {

      this.loading = true;

      const res = await axios.get('/rss/weather/envcanada/montreal');

      const weather = await reader(res.data);
      const weather_data = transformer('en', 'qc-147', weather);

      console.log(weather_data);

      const d = new Date();
      if (d.getHours() > 21 || d.getHours() < 5) {
        this.current_icon = condition_icons[weather_data.entries[1].condition].night;
      } else {
        this.current_icon = condition_icons[weather_data.entries[1].condition].day;
      }

      this.current_temperature = weather_data.entries[1].temperature;

      this.loading = false;

      return weather_data;
    }

  },

  beforeDestroy() {
    if (this.refresh_timer) {
      clearInterval(this.refresh_timer);
    }
  },

  mounted() {
    this.load_weather();
    this.refresh_timer = setInterval(() => {
      this.load_weather();
    }, this.refresh);
  }

}

</script>