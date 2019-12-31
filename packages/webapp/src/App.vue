<template>
<div class="container">
  <Weather />
  <!-- <news/> -->
</div>
</template>

<style lang="scss">
@import '@/sass/base.scss';
@import '@/sass/layout.scss';

</style>

<script lang="ts">

import { Prop, Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import News from '@/components/dashboardWidgets/News.vue';
import Clock from '@/components/dashboardWidgets/Clock.vue';
import Header from '@/components/Header.vue';
import Weather from '@/components/Weather.vue';

@Component({
  components: {
    News,
    Header,
    Weather
  }
})
export default class App extends Vue {
  mounted() {
    // this.$store.dispatch('news/loadNews', 'local');
  }
}

</script>