<template>
<header class="main-header">
  <div class="logo">
    TEMPERATURE: -30.2&deg;C
  </div>
  <div class="clock-container">
    <segment-clock blink="true"/>
  </div>
</header>
</template>
<style lang="scss">

@import '@/sass/cga-display.scss';
@import '@/sass/animations.scss';

.main-header {
  display: flex;
  flex-flow: row;
  width: 100%;
  align-items: center;

  .logo {
    font-size: 6vw;
    width: 50%;
    @include cga-text($cga-white);
  }

  .clock-container {
    width: 50%;
    text-align: right;
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