<template>
<div class="weather-item">
  <h4 class="weather-item-header">Wednesday</h4>
  <div class="weather-item-temp-container">
    <div class="weather-item-icon">
      <weather-icon :weather-type="weatherType"/>
    </div>
    <weather-item-temp/>
  </div>
</div>
</template>

<style lang="scss">

@import '@/sass/cga-display.scss';

.weather-item {
  border: 3px solid $cga-light-blue;
  // display: flex;
  flex-flow: column;
//  margin: 0 3rem 3rem 0;
  padding: 0.25rem;
  background-color: $cga-light-gray;
  text-align: center;
  //justify-content: center;
  //justify-items: center;
  width: 40%;
  //height: 50vh;
}

.weather-item-temp-container {
  width: 100%;
  display: flex;
  flex-flow: row;
}

.weather-item-header {
  margin: 0; padding: 0;
  font-size: 10vw;
  font-weight: normal;
  text-align: center;
  @include cga-text($cga-blue);
}

.weather-item-icon {
  height: 300px;
  background-color: $cga-black;
  width: 50%;
  overflow: hidden;
  img {
    width: 200%;
    height: 200%;
    position: relative;
    top: -50%;
    left: -50%;
  }
}


</style>

<script lang="ts">

import { Prop, Component, Vue } from 'vue-property-decorator';
import WeatherItemTemp from './WeatherItemTemp.vue';
import WeatherIcon from './WeatherIcon.vue';
import { WeatherType } from '@retro-dashboard/library';

@Component({
  components: {
    WeatherItemTemp,
    WeatherIcon
  }
})
export default class WeatherItem extends Vue {

  get weatherType() {
    return WeatherType.Clear;
  }

  mounted() {
    // this.$store.dispatch('news/loadNews', 'local');
  }
}

</script>