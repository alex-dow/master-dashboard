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
        <img :src="current.icon" :title="current.conditions" />
      </div>
      <div class="weather-info">
        <Typer :content="current.temperature" class="cga-light-green"/>
      </div>

    </div>
</div>
</template>

<style lang="scss">

@import '@/sass/standards.scss';

.weather-box {

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

<script lang="ts">

import transformer from '@/ec-weather/transformer.js';
import reader from '@/ec-weather/reader.js';

import axios from 'axios';

import Typer from '@/components/Typer.vue';
import Loader from '@/components/Loader.vue';

import { Vue, Component, Prop } from 'vue-property-decorator';

const condition_icons = {
  'Clear': {
    'day': require('@/assets/weather/day.svg'),
    'night': require('@/assets/weather/night.svg')
  },
  'Mainly Sunny': {
    'day': require('@/assets/weather/cloudy-day-1.svg'),
    'night': require('@/assets/weather/cloudy-night-1.svg')
  },
  'Partly Cloudy': {
    'day': require('@/assets/weather/cloudy-day-2.svg'),
    'night': require('@/assets/weather/cloudy-night-2.svg')
  },
  'Mostly Cloudy': {
    'day': require('@/assets/weather/cloudy.svg'),
    'night': require('@/assets/weather/cloudy.svg')
  },
  'Light Rainshower': {
    'day': require('@/assets/weather/rainy-5.svg'),
    'night': require('@/assets/weather/rainy-5.svg')
  },
  'Light Rain': {
    'day': require('@/assets/weather/rainy-5.svg'),
    'night': require('@/assets/weather/rainy-5.svg')
  },
  'Light Drizzle': {
    'day': require('@/assets/weather/rainy-4.svg'),
    'night': require('@/assets/weather/rainy-4.svg'),
  },
  'Rain': {
    'day': require('@/assets/weather/rainy-7.svg'),
    'night': require('@/assets/weather/rainy-7.svg')
  },
  'Mainly Clear': {
    'day': require('@/assets/weather/day.svg'),
    'night': require('@/assets/weather/night.svg')
  }
};

@Component({
  components: {
    Typer,
    Loader
  }
})
export default class WeatherComponent extends Vue {

  private refresh_timer!: number;

  loading = true
  current = {
    icon: '',
    temperature: '',
    conditions: ''
  }

  @Prop({default: 600000}) readonly refresh!: number;

  async load_weather() {

    this.loading = true;

    const res = await axios.get('/api/weather');

    const weather = await reader(res.data);
    const weather_data = transformer('en', 'qc-147', weather);

    const current = weather_data.entries[1];

    console.log(weather_data);

    const d = new Date();
    if (d.getHours() > 21 || d.getHours() < 5) {
      this.current.icon = condition_icons[current.condition].night;
    } else {
      this.current.icon = condition_icons[current.condition].day;
    }

    this.current.temperature = current.temperature;
    this.current.conditions = current.condition;

    this.loading = false;

    return weather_data;
  }

  beforeDestroy() {
    if (this.refresh_timer) {
      window.clearInterval(this.refresh_timer);
    }
  }

  mounted() {
    this.load_weather();
    this.refresh_timer = window.setInterval(() => {
      this.load_weather();
    }, this.refresh);
  }

}

</script>