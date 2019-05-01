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
  </div>

  <div class="glow">

  </div>

  <div class="shadow">

  </div>

</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Typer from '@/components/Typer.vue';
import Clock from '@/components/Clock.vue';
import SignalLight from '@/components/SignalLight.vue';
import NewsBox from '@/components/News.vue';

import rss from 'rss-parser-browser';

import GtfsRealtimeBindings = require('gtfs-realtime-bindings');

import reader from '@/ec-weather/reader.js';
import transformer from '@/ec-weather/transformer.js';

import axios from 'axios';

const NEWS_RSS_FEED = '/rss/news/cbc/montreal';

export default Vue.extend({
  name: 'app',
  components: {
    Typer,
    Clock,
    SignalLight,
    NewsBox
  },

  data() {
    return {
      headlines: []
    }
  },

  methods: {
    async load_feed() {
      return new Promise((resolve, reject) => {
        rss.parseURL(NEWS_RSS_FEED, function(err : any, parsed : any) {
          if (err) {
            reject(err);
          } else {
            resolve(parsed);
          }
        });
      });
    },

    async load_weather() {

      const res = await axios.get('/rss/weather/envcanada/montreal');

      const weather = await reader(res.data);

      console.log('weather:', weather);
      const weather_data = transformer('en', 'qc-147', weather);

      return weather_data;
    },

    async process_weather() {
      const rss = await this.load_weather();
      console.log('weather:', rss);
    },

    async process_feed() {
      this.process_weather();
      const rss = await this.load_feed();

      for (var i = 0; i < 5; i++) {
        this.headlines.push(rss.feed.entries[i].title);
      }
    }
  }
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
    width: 33%;
    padding: 1rem;
    height: 91%;
    background-color: rgba(0,0,0,0.4);
    font-family: 'VT323', monospace;
    //height: 10%;
    //overflow: hidden;
  }

  .glow {
    background: radial-gradient(circle at center, rgba(15, 177, 69, 1), ease-in-out, rgba(10, 23, 12, 0));
    opacity: 0.15;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
    filter: blur(1px);
  }

  .shadow {
  box-shadow:
    inset 0 0 4rem black,
    inset 0 0 2rem  black,
    inset 0 0 4rem black;
    position: fixed;
    background-color: transparent;
    width: 100%;
    height: 100%;
    z-index: 3;
    filter: blur(2px);
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