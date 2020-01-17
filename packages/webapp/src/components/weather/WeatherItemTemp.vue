<template>
<div class="weather-item-temp">
  <p class="real-temp">-30.4&deg;C</p>
  <p class="feels-temp">Feels Like: -12.4&deg;</p>
</div>
</template>

<style lang="scss">
@import '@/sass/cga-display.scss';

.weather-item-temp {
  p {
    margin: 0; padding: 0;
    @include cga-text($cga-blue);
  }

  .real-temp {
    font-size: 6vw;
    font-weight: bold;
    @include cga-text($cga-light-blue);
  }

  .feels-temp {
    font-size: 5vw;
    @include cga-text($cga-black);
  }

  text-align: left;
}

</style>

<script lang="ts">

import { Prop, Component, Vue } from 'vue-property-decorator';

@Component({})
export default class WeatherItemTemp extends Vue {
  mounted() {
    // this.$store.dispatch('news/loadNews', 'local');
  }
}

</script>