<template>
<div class="logger-box">
  <svg style="width:0;height:0;position:absolute;" aria-hidden="true" focusable="false">
    <linearGradient id="spectrum2000" x1="0%" x2="100%" y1="0%" y2="100%" gradientTransform="rotate(45)"
    gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ef00ff" />
      <stop offset="10%" stop-color="#ff0000" />
      <stop offset="40%" stop-color="#f9ff08" />
      <stop offset="60%" stop-color="#f1ff00" />
      <stop offset="100%" stop-color="#0eff00" />
    </linearGradient>
  </svg>
  <div class="logger-statuses" id="logger-statuses">
    <h2 class="cga-light-cyan">Status</h2>
    <div id="psistats-graph"></div>
  </div>
  <div class="logger-output" id="logger-output">
    <h2 class="cga-light-cyan">Output</h2>
    <ul>
      <li v-for="message in messages" class="cga-light-magenta log-item">
        <!-- <Typer :content="message" class="cga-light-green" :minSpeed="5" :maxSpeed="10"/> -->
        {{ message }}
      </li>
    </ul>
  </div>
</div>
</template>

<style lang="scss">

@import '@/sass/colours.scss';
@import '@/sass/cga-display.scss';

.logger-box {
  padding-top: 1rem;

  display: flex;
  flex-flow: column;

  .status-item {
    padding: 0.5rem;
    font-size: 12pt;
  }

  .log-item {
    padding: 0; margin: 0;
    font-size: 8pt;
  }

  .logger-output {
    height: 20%;
    overflow: hidden;
    padding: 0.25rem;
  }

  .logger-statuses, .logger-output {
    width: 100%;
  }

  h2 {
    line-height: 1rem;
    margin: 0;
    padding: 0;

  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
}

.logger-items-box {
  padding: 1rem;
  color: $cga-white;

}

#psistats-graph {
  @for $i from 0 through 10 {
    rect[height^="#{$i}"] {
      fill: $cga-green;
    }
  }

  @for $i from 11 through 20 {
    rect[height^="#{$i}"] {
      fill: $cga-yellow;
    }
  }

  @for $i from 21 through 30 {
    rect[height^="#{$i}"] {
      fill: $cga-light-red;
    }
  }
}
</style>



<script>

import Typer from '@/components/Typer.vue';
import SignalLight from '@/components/SignalLight.vue';
import Rickshaw from 'rickshaw';

var graph;
var graph_cpu = Array(500).fill(0).map((v,i) => { return {x: i, y: v}});
var graph_cpu_counter = graph_cpu.length;
console.log('graph cpu:', graph_cpu);

export default {
  components: {
    Typer,
    SignalLight
  },

  data() {
    return {
      msgmax: 10,
      messages: [],
      hosts: [],
      host_cache: {},
      graph: null
    }
  },

  methods: {
    add_message(msg) {
      this.messages.push(msg);
      if (this.messages.length > this.msgmax) {
        this.messages.shift();
      }
    }
  },

  mounted() {

    const graphWidth = document.getElementById("logger-statuses").offsetWidth;

    console.log(Rickshaw.Graph);

    graph = new Rickshaw.Graph({
      element: document.getElementById('psistats-graph'),
      width: graphWidth,
      height: 50,
      renderer: 'bar',
      series: [{
        color: 'blue',
        data: graph_cpu
      }],
      min: 0,
      max: 100
    });

    graph.render();

  },

  mqtt: {
    'psistats2/#' (msg) {
      const m = JSON.parse(msg.toString());
      if (m['sender'] === 'cpu_total') {
        graph_cpu.shift();
        graph_cpu.push({
          x: graph_cpu_counter,
          y: m['message'],
          fill: 'white'

        });
        graph_cpu_counter++;
        graph.update();
      }
    },

    '#'(msg) {
      const m = JSON.parse(msg.toString());
      this.add_message(msg.toString());
    }
  }
}

</script>