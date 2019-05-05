<template>

<div class="container">
  <div class="title-bar">

    <Clock class="title" style="margin-right: 0.5rem"/>

    <div class="signals">
      <div class="signal">
        <SignalLight :value="true" label="Websockets"/>
      </div>
      <div class="signal">
        <SignalLight :value="false" label="MQTT Confirmed" />
      </div>
    </div>
    
  </div>

  <div class="content-container">
    <NewsBox/>
    <Weather/>
  </div>

  <Glow/>

  <div class="shadow"></div>

</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Typer from '@/components/Typer.vue';
import Clock from '@/components/Clock.vue';
import SignalLight from '@/components/SignalLight.vue';
import NewsBox from '@/components/News.vue';
import Weather from '@/components/Weather.vue';
import Glow from '@/components/Glow.vue';

import rss from 'rss-parser-browser';

import GtfsRealtimeBindings from 'gtfs-realtime-bindings';

import reader from '@/ec-weather/reader.js';


import axios from 'axios';

const NEWS_RSS_FEED = '/rss/news/cbc/montreal';

export default Vue.extend({
  name: 'app',
  components: {
    Typer,
    Clock,
    SignalLight,
    NewsBox,
    Weather,
    Glow
  },

  data() {
    return {
    }
  },
});
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

.title-bar {
  background-color: black;
  width: 100%;
  height: 9%;
  display: flex;
  flex-flow: row;
  justify-content:right;
  align-items: center;
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

  .content-container {
    z-index: 4;
    //border: 1px solid darken($cga-dark-gray, 20%);
    width: 50%;
    padding: 1rem;
    height: 91%;
    background-color: rgba(0,0,0,0.8);
    font-family: 'VT323', monospace;
    
    //height: 10%;
    //overflow: hidden;
  }

  .shadow {
    box-shadow:
      inset 0 0 10rem black,
      inset 0 0 10rem  black,
      inset 0 0 10rem black;
    position: fixed;
    background-color: transparent;
    width: 100%;
    height: 100%;
    z-index: 3;
  }

  .signals {
    display: flex;
    flex-flow: column;

    .signal {
      margin-bottom: 0.5rem;
    }
  }

}


</style>
