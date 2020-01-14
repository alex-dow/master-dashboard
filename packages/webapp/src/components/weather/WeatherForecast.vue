<template>
<div class="weather-container">
  <weather-item style="margin-right: 0.5rem"/>
  <weather-item/>
  <weather-item style="margin-left: 0.5rem"/>
</div>
</template>

<style lang="scss">

.weather-container {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  width: 100%;
  justify-content: center;
}

</style>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import WeatherItem from './WeatherItem.vue';

@Component({
  components: {
    WeatherItem
  }
})
export default class WeatherIcon extends Vue {



  mounted() {
    // this.$store.dispatch('news/loadNews', 'local');
  }
}


</script>