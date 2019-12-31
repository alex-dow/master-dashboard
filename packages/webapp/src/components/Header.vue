<template>
<header class="main-header">
  <segment-clock :blink="true"/>
  <div class="current-temp">
    {{ currentTemp }}&deg;C <img :src="'https://weather.gc.ca/weathericons/' + currentConditionCode + '.gif'"/><br/>
    {{ currentCondition }}
  </div>
  <div class="weather-icon">

  </div>
  <div class="weather-warning">
    <span class="cga-red" id="warning-scroll-text">WEATHER WARNING</span>
  </div>
</header>
</template>
<style lang="scss">

@import '@/sass/cga-display.scss';
@import '@/sass/animations.scss';

.weather-warning {
  border: 2px solid $cga-red;
  text-align: center;
  margin-left: 2rem;
  margin-right: 2rem;
  overflow: hidden;

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

@Component
export default class Header extends Vue {

  private weatherTimer?: number;
  private scrollWarning: number = 1;

  @Get('weather/currentWeather@temp') currentTemp: number;
  @Get('weather/currentWeather@conditions') currentCondition: string;

  refreshWeather(): void {
    this.$store.dispatch('weather/loadWeather');
  }

  beforeDestroy() {
    clearInterval(this.weatherTimer);
  }

  mounted() {

    this.weatherTimer = setInterval(() => {
      this.refreshWeather();
    }, 60 * 60 * 1000);
    this.refreshWeather();

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
    el.style.animation = 'scroll-up-half 1s linear 1';
  }
}

</script>