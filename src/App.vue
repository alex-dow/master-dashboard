<template>
<div class="container">
  <div class="title-bar">
    <Clock class="title" style="margin-right: 0.5rem; display: inline-block"/>
  </div>

  <div class="content-container">
    <NewsBox/>
    <Weather/>
  </div>
  <div class="content-container">
    <Computers/>
  </div>

<!--
  <div class="servers-list">
    <h1 class="cga-yellow">Servers</h1>
    <ul>
      <li>
        <SignalLight :value="true"><h2 class="cga-green" style="margin: 0; padding: 0">neuromancer</h2></SignalLight><br/>

        <span class="cga-cyan">CPU:</span> <span class="cga-red">100%</span>
        <span class="cga-cyan">MEM:</span> <span class="cga-red">100%</span>
      </li>
    </ul>
  </div>
-->

  <Glow/>

  <!--<div class="shadow"></div>-->

</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Typer from '@/components/Typer.vue';
import Clock from '@/components/Clock.vue';
import SignalLight from '@/components/SignalLight.vue';
import NewsBox from '@/components/News.vue';
import Weather from '@/components/Weather.vue';
import Glow from '@/components/Glow.vue';
import Logger from '@/components/Logger.vue';
import axios from 'axios';
import Computers from '@/components/Computers.vue';

/*
import rss from 'rss-parser-browser';
import GtfsRealtimeBindings from 'gtfs-realtime-bindings';
*/

const NEWS_RSS_FEED = '/rss/news/cbc/montreal';

@Component({
  name: 'app',
  components: {
    Clock,
    NewsBox,
    Weather,
    Glow,
    Logger,
    Computers
  }
})
export default class App extends Vue {
  $mqtt!: any;

  mounted() {
    this.$mqtt.subscribe('#');
  }
}
</script>

<style lang="scss">

@import '@/sass/colours.scss';
@import '@/sass/cga-display.scss';
@import url('https://fonts.googleapis.com/css?family=VT323');

// @import '@/sass/mixins/scrim.scss';

html,body {
  height: 100%;
  width: 100%;
  background: #141311;
  margin: 0; padding: 0;
}


* {
  box-sizing: border-box;
}

.container {
  //background-color: transparent;
  background-color: #141311;
  height: 100vh;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;



  .title-bar {
    background-color: black;
    width: 100%;
    height: 10vh;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: right;
    text-align: right;
  }

  .content-container {
    overflow: hidden;
    z-index: 4;
    width: 50%;
    padding: 1rem;
    height: 90vh;
    background-color: rgba(0,0,0,0.8);
    font-family: 'VT323', monospace;
  }

  .servers-list {
    flex: 1 1 auto;
    z-index: 4;
    width: 50%;
    height: 91%;
    padding: 1rem;
    background-color: rgba(0,0,0,0.4);
    font-family: 'VT323', monospace;

    ul, li {
      list-style: none;
      padding: 0; margin: 0;
    }
  }

  .shadow {
    position: fixed;
    background-color: transparent;
    width: 100%;
    height: 100%;
    z-index: 3;
  }

  .signals {
    display: inline-block;
    .signal {
      margin-bottom: 0.5rem;
    }
  }
}


</style>
