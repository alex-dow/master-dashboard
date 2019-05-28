<template>
<div class="news-box">
    <h1 class="cga-yellow">
        <Typer :content="current_news_label"/>
    </h1>
    <p class="content" v-if="loading">
      <Loader/>
    </p>

    <p class="cga-light-green content" v-else>
        <Typer :content="headline" :minSpeed="30" :maxSpeed="80"/>
    </p>
</div>
</template>

<script lang="ts">


import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

import Typer from '@/components/Typer.vue';
//import rss from 'rss-parser-browser';
import Loader from '@/components/Loader.vue';
import feedme from 'feedme';

interface Feed {
  url: string,
  label: string
}

@Component({
  components: {
    Typer,
    Loader
  }
})
export default class NewsComponent extends Vue {
  private cycle_headline_timer!: number;
  private cycle_news_timer!: number;
  private feeds!: Array<Feed>;

  loading = false
  headline = ''
  queued_headlines = new Array<any>();
  idx = 0
  cycle_timer = null
  refresh_timer = null
  current_news_label = ''
  current_news_url = ''
  current_news_idx = 0


  rotate_news_type() {
    if (this.current_news_idx >= this.feeds.length) {
      this.current_news_idx = 0;
    }

    this.current_news_label = this.feeds[this.current_news_idx].label;
    this.current_news_url = this.feeds[this.current_news_idx].url;

    this.process_feed()
    .then(() => {
      this.current_news_idx++;
    });
  }

  rotate_headlines() {

    if (this.idx >= this.queued_headlines.length) {
      this.idx = 0;
    }

    this.headline = this.queued_headlines[this.idx];

    this.idx++;
  }

  async load_feed(): Promise<NodeListOf<any>> {
    const res = await fetch(this.current_news_url);
    const text = await res.text();

    const dom = new DOMParser().parseFromString(text, "text/xml");

    return dom.querySelectorAll('item title');
  }

  async process_feed() {
      this.loading = true;
      const items = await this.load_feed();

      const headlines = new Array<string | null>();

      items.forEach((item: HTMLElement) => {
        headlines.push(item.textContent);
      });
      this.queued_headlines = headlines;
      this.rotate_headlines();
      this.loading = false;
  }

  start() {
    this.cycle_news_timer = window.setInterval(() => {
      this.rotate_news_type();
    },30000);

    this.cycle_headline_timer = window.setInterval(() => {
      this.rotate_headlines();
    },15000);

  }

  beforeDestroy() {
      window.clearInterval(this.cycle_headline_timer);
      window.clearInterval(this.cycle_news_timer);
  }

  mounted() {
    this.feeds = [{
      url: '/api/news/local',
      label: 'Local Headlines'
    },{
      url: '/api/news/national',
      label: 'National Headlines'
    },{
      url: '/api/news/international',
      label: 'World Headlines'
    }]

    this.start();
    this.rotate_news_type();
  }

}

</script>

<style lang="scss">

@import '@/sass/colours.scss';
@import '@/sass/cga-display.scss';
@import '@/sass/standards.scss';

.news-box {
  height: 35%;
  h1 {
    line-height: 1rem;
    display: flex;
    flex-flow: row;
    align-items: center;
    font-size: 42pt;
    margin: 0;
    padding: 0;
    margin-bottom: 2rem;
  }
  .content {
    margin: 0;
    padding: 0;
    font-size: 38pt;
    line-height: 2rem;
  }

  .loader-container {
    margin-left: 2rem;
  }
}

</style>
