<template>
<div class="dashboard-widget news-widget">
  <img src="@/assets/cbc-retro-logo.png" class="news-logo" alt="CBC News"/>

  <p class="cga-yellow">
    <typer :content="currentNewsItem.title + '. ' + currentNewsItem.summary"/>
  </p>
</div>

</template>

<style lang="scss">
@import '@/sass/dashboardWidget.scss';
@import '@/sass/cga-display.scss';

.news-widget {
  // display: flex;
  display: flex;
  flex-flow: row;

  .news-logo {
    width: 100px;
    height: 100px;
    display: block;
    margin: 1rem;
  }

  h1 {
    margin: 1rem;
    width: 40vw;
  }

}

</style>

<script lang="ts">

import { Prop, Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import Typer from '@/components/widgets/Typer.vue';
import { Get } from 'vuex-pathify';
import { INewsItem } from '@retro-dashboard/server/src/dataSources/news/INewsSource';

@Component({
  components: {
    Typer
  }
})
export default class NewsWidget extends Vue {

  @Get('news/newsItems') newsItems!: Array<INewsItem>;
  @Get('news/loadingNews') loadingNews!: boolean;
  @Get('news/loadingNewsError') loadingNewsError!: boolean;

  private newsTimer!: number;
  private newsItemTimer!: number;
  private itemIdx!: number;
  private currentNewsItem: INewsItem = {
    title: '',
    summary: ''
  };

  nextNewsItem() {

    if (this.newsItems.length === 0) {
      this.currentNewsItem = {
        title: '',
        summary: ''
      };

      return;
    }

    this.itemIdx++;

    if (this.itemIdx >= this.newsItems.length) {
      this.itemIdx = 0
    }

    this.currentNewsItem = this.newsItems[this.itemIdx];
  }

  async mounted() {

    this.itemIdx = 0;

    // refresh the headlines every hour
    this.newsTimer = setInterval(() => {
      this.$store.dispatch('news/loadNews', 'local');
    }, 60 * 60 * 1000);



    await this.$store.dispatch('news/loadNews', 'local');
    this.nextNewsItem();

    this.newsItemTimer = setInterval(() => {
      this.nextNewsItem();
    }, 30000);
  }

  beforeDestroy() {
    clearInterval(this.newsTimer);
    clearInterval(this.newsItemTimer);
  }
}

</script>