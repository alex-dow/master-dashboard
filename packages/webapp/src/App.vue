<template>
<div class="container">
  <Header/>
  <weather-forecast/>
</div>
</template>

<style lang="scss">
@import '@/sass/base.scss';
@import '@/sass/layout.scss';
@import '@/sass/cga-display.scss';
</style>

<script lang="ts">

import { Prop, Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import News from '@/components/dashboardWidgets/News.vue';
import Clock from '@/components/dashboardWidgets/Clock.vue';
import Header from '@/components/Header.vue';
import WeatherForecast from '@/components/weather/WeatherForecast.vue';

@Component({
  components: {
    Header,
    WeatherForecast
  }
})
export default class App extends Vue {
  mounted() {
    // this.$store.dispatch('news/loadNews', 'local');
  }
}

</script>