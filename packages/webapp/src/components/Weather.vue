<template>
<div id="weather">

  <div class="weather-temp-container">

  <div class="weather-item">
    <h4>CURRENT</h4>
    <p class="temperature">
      {{ current.temp }}&deg;
    </p>
    <p class="temperature feelsLike">
      {{ current.feelsLike }}&deg;
    </p>
  </div>

  <div class="weather-item">
    <h4>TOMORROW</h4>
    <p class="temperature">
      {{ forecast[0].dayTemp }}&deg;
    </p>
    <p class="temperature feelsLike">
      {{ forecast[0].dayFeelsLikeTemp }}&deg;
    </p>
  </div>

  </div>

  <div class="weather-clock">
    <segment-clock :blink="true"/>
  </div>
  <div class="weather-warning-box" v-if="warnings.length > 0">
    {{ warnings[0].title }}
  </div>

</div>
</template>
<style lang="scss">

@import '@/sass/cga-display.scss';
@import '@/sass/animations.scss';

#weather {

  width: 100%;
  height: 10vh;
  display: flex;
  flex-flow: row wrap;

  .weather-warning-box {
    width: 100%;
    background-color: $cga-red;
    //height: 5vh;
    @include cga-text($cga-black);
    // color: $cga-black;
    font-size: 4em;
    padding: 0; margin: 0;
    //line-height: 0.75em;
    text-align: center;
  }

  .weather-clock {
    text-align: right;
    width: 50%;

  }

  .weather-temp-container {
    width: 50%;
  }

  .weather-item {
    width: 100%;
    display: flex;
    flex-flow: row;
    color: $cga-white;
    @include cga-text($cga-white);
    align-items: center;

    h4 {

      padding: 0; margin: 0;
      font-size: 5em;
      width: 55%;
      @include cga-text($cga-yellow);
    }

    p {
      text-align: right;
      padding: 0; margin: 0;
      font-size: 4em;
      width: 15%;
    }

    p.feelsLike {
      @include cga-text($cga-light-green);
    }
  }
}
.weather-warning {
  border: 2px solid $cga-red;
  text-align: center;
  margin-left: 2rem;
  margin-right: 2rem;
  // overflow: hidden;

  span {

  // position: relative;
    font-size: 48pt;
    display: block;
  }
}

.main-header {
  width: 100vw;
  height: 20vh;
  display: flex;
  flex-flow: row;
  color: $cga-white;
  align-items: center;
  flex-wrap: wrap;
}

.current-temp {
  font-size: 52pt;
  padding-left: 1rem;
  padding-right: 2rem;
}

.weather-icon {
  img {
    transform: scale(1.5);
  }
}

</style>
<script lang="ts">

import { Prop, Component, Vue } from 'vue-property-decorator';
import { Get } from 'vuex-pathify';
import { WeatherItem, WeatherWarning, CurrentWeatherItem } from '@retro-dashboard/library/dist/interfaces/weather';

@Component
export default class Weather extends Vue {

  private weatherTimer?: number;
  private scrollWarning: number = 1;

  @Get('weather/warnings') warnings: Array<WeatherWarning>;
  @Get('weather/currentWeather') current: CurrentWeatherItem;
  @Get('weather/currentWeather@temp') currentTemp: number;
  @Get('weather/currentWeather@conditions') currentCondition: string;
  @Get('weather/forecast') forecast: Array<WeatherItem>;

  refreshWeather(): void {
    this.$store.dispatch('weather/loadWeather');
  }

  beforeDestroy() {
    clearInterval(this.weatherTimer);
  }

  mounted() {

    this.weatherTimer = window.setInterval(() => {
      this.refreshWeather();
    }, 60 * 60 * 1000);
    this.refreshWeather();

    /*

    const el = document.getElementById('warning-scroll-text');
    el.addEventListener('animationend', () => {
      console.log('animation-ended');
      el.style.animation = 'none';
      el.style.transform = 'none';


      window.getComputedStyle(el);

      el.style.animation = null;

      setTimeout(() => {
        if (this.scrollWarning === 0) {
          console.log('scroll-up-half');
          el.style.animation = 'scroll-up-half 1s liner 1';
          this.scrollWarning = 1;
        } else if (this.scrollWarning === 1) {
          console.log('blink');
          el.style.animation = 'blink 1s linear 5';
          this.scrollWarning = 2;
        } else if (this.scrollWarning === 2) {
          console.log('scroll-up-half2');
          el.style.animation = 'scroll-up-half2 1s linear 1';
          this.scrollWarning = 0;
        }
      }, 10);

    });
    */
    // el.style.animation = 'scroll-up-half 1s linear 1';
  }
}

</script>