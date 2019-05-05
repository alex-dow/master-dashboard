<template>
<div class="news-box">
    <h1 class="cga-yellow">
        <Typer content="Headlines" @rendered="process_feed"/>
        <div class="loader-container" v-if="loading">
            <Loader/>
        </div> 
    </h1>
    <p class="cga-light-green content">
        <Typer :content="headline" :minSpeed="30" :maxSpeed="80"/>
    </p>
    <!--
    <p class="cga-green" v-for="(headline, idx) in headlines" :key="idx">
        <Typer :content="'(' + idx + ')' + headline" :minSpeed="50" :maxSpeed="150"/>
    </p>
    -->
</div>
</template>

<script lang="ts">

import Vue from 'vue';
import Typer from '@/components/Typer.vue';
import rss from 'rss-parser-browser';
import Loader from '@/components/Loader.vue';

export default Vue.extend({

    components: {
        Typer,
        Loader
    },

    data() {
        return {
            loading: false,
            headline: '',
            headlines: [],
            queued_headlines: [],
            idx: 0,
            cycle_timer: null,
            refresh_timer: null
        }
    },

    methods: {
        async load_feed() {
            return new Promise((resolve, reject) => {
                rss.parseURL('/rss/news/cbc/montreal', function(err : any, parsed : any) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(parsed);
                    }
                });
            });
        },
        
        async process_feed() {
            this.loading = true;
            const feed = await this.load_feed();
            this.queued_headlines = feed.feed.entries;
            this.start_cycle();
            
        },

        start_cycle() {
            if (this.cycle_timer) {
                clearInterval(this.cycle_timer);
            }
            this.cycle_timer = setInterval(() => {
                this.idx++;

                if (this.idx >= this.queued_headlines.length) {
                    this.idx = -1;
                }

                this.headline = this.queued_headlines[this.idx].title;
                this.loading = false;
            },10000);

        }
    },

    beforeDestroy() {
        clearInterval(this.cycle_timer);
        clearInterval(this.refresh_timer);
    },

    mounted() {
        this.refresh_timer = setInterval(() => {
            this.process_feed();
        }, 36000000);
    }

});

</script>

<style lang="scss">

@import '@/sass/colours.scss';
@import '@/sass/cga-display.scss';

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
