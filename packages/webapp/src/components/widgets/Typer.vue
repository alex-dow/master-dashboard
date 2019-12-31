<template>
<span>
    {{ rendered }}
</span>
</template>

<script lang="ts">
import random from 'lodash/random';


import { Watch, Prop, Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class Typer extends Vue {
  rendered: string = '';
  idx: number = 0;

  private renderTimer!: number;

  @Prop({ required: true}) readonly content!: string;
  @Prop({ default: 50}) readonly minSpeed!: number;
  @Prop({ default: 100}) readonly maxSpeed!: number;

  @Watch('content')
  onContentChanged() {
    this.reset();
    this.start();
  }

  reset(): void {
    clearInterval(this.renderTimer);
    this.rendered = '';
    this.idx = 0;
  }

  typeCharacters() {
    if (this.idx < this.content.length) {

      this.rendered = this.rendered + this.content[this.idx];
      this.idx++;
      setTimeout(() => {
        this.typeCharacters();
      }, random(this.minSpeed, this.maxSpeed));
    }
  }

  start(): void {
    this.typeCharacters();
  }

  stop(): void {
    clearInterval(this.renderTimer);
  }

  mounted(): void {
    this.start();
  }

  beforeDestroy() {
    this.stop();
  }
}


</script>