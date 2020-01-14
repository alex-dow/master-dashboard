<template>
  <img :src="weatherIcon" class="weather-icon" />
</template>

<script lang="ts">

import { WeatherType } from '@retro-dashboard/library';
import { Prop, Component, Vue } from 'vue-property-decorator';

const iconMap = {
  [WeatherType.Clear]: function(d) {
    // TODO check if d is day or night
    return require('@/assets/weather/day.svg');
  },
  [WeatherType.PartlyCloudy]: function(d) {
    // TODO check if d is day or night
    return require('@/assets/weather/cloudy-night-1.svg');
  },
  [WeatherType.LightSnow]: function(d) {
    // TODO check if d is day or night
    return require('@/assets/weather/snowy-1.svg');
  },
  [WeatherType.Snow]: require('@/assets/weather/snowy-6.svg'),
  [WeatherType.HeavySnow]: require('@/assets/weather/snowy-6.svg'),
  [WeatherType.Blizzard]: require('@/assets/weather/snowy-6.svg'),
  [WeatherType.Hail]: require('@/assets/weather/rainy-7.svg'),
  [WeatherType.Unknown]: require('@/assets/weather/weather.svg'),
  [WeatherType.Cloudy]: require('@/assets/weather/cloudy.svg'),
  [WeatherType.Overcast]: require('@/assets/weather/cloudy.svg'),
  [WeatherType.LightRain]: function(d) {
    // TOOD check if d is day or night
    return require('@/assets/weather/rainy-2.svg');
  },
  [WeatherType.Rain]: require('@/assets/weather/rainy-7.svg'),
  [WeatherType.HeavyRain]: require('@/assets/weather/rainy-7.svg'),
  [WeatherType.FreezingRain]: require('@//assets/weather/snowy-6.svg'),
  [WeatherType.Thunderstorms]: require('@/assets/weather/thunder.svg'),
  [WeatherType.Flurries]: require('@/assets/weather/snowy-4.svg')
}

@Component({})
export default class WeatherIcon extends Vue {
  @Prop() readonly weatherType: WeatherType | undefined

  get weatherIcon() {
    return (typeof iconMap[this.weatherType] === 'function') ?
      iconMap[this.weatherType]()
      :
      iconMap[this.weatherType];
  }

  mounted() {
    // this.$store.dispatch('news/loadNews', 'local');
  }
}


</script>