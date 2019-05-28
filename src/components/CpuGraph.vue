<template>
<div :id="id" class="psistats-cpu-graph">
</div>
</template>

<style lang="scss">

@import '@/sass/cga-display.scss';

.psistats-cpu-graph {
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

  @for $i from 21 through 50 {
    rect[height^="#{$i}"] {
      fill: $cga-light-red;
    }
  }
}

</style>

<script lang="ts">

import Rickshaw from 'rickshaw';
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';

interface GraphData {
  x: number,
  y: number
}

@Component({
  props: {
    value: {
      required: false,
      default: 0
    },
    maxPositions: {
      required: false,
      default: 100
    },
    height: {
      required: false,
      default: 50
    },
    id: {
      required: true
    }
  }
})
class CpuGraph extends Vue {

  private graph!: any
  private graph_counter!: number
  private graph_data!: Array<GraphData>

  @Prop(Number) readonly value!: number
  @Prop({default: 10}) readonly maxPositions!: number
  @Prop({default: 50}) readonly height!: number
  @Prop({required: true}) readonly id!: string

  @Watch('value')
  onValueChanged(newVal: number) {
    if (newVal < 1) {
      newVal = 1;
    }
    this.graph_counter++;
    this.graph_data.shift();
    this.graph_data.push({
      x: this.graph_counter,
      y: newVal
    });

    if (this.graph) {
      this.graph.update();
    }
  }

  mounted() {

    this.graph_data = Array(this.maxPositions).fill(0).map((v,i) => { return {x: i, y: v}});
    this.graph_counter = this.maxPositions - 1;

    const el = document.getElementById(this.id);
    if (!el) {
      throw 'Element with id ' + this.id + ' does not exist';
    }

    const graphWidth = el.offsetWidth;

    this.graph = new Rickshaw.Graph({
      element: document.getElementById(this.id),
      width: graphWidth,
      height: this.height,
      renderer: 'bar',
      series: [{
        color: 'green',
        data: this.graph_data
      }],
      min: 0,
      max: 100
    });

    if (!this.graph) {
      console.error('[cpu-graph] Error loading CPU Graph');
    } else {
      this.graph.render();
    }
  }
}

export default CpuGraph;
</script>