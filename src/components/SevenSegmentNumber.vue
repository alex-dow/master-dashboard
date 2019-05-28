<template>
<div :class="digitClass"></div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SevenSegmentNumber extends Vue {

  @Prop({required: true}) readonly digit!: number | string;

  get digitalClass() {
    if (this.digit === '.') {
        return 'segment-doton';
    } else if (this.digit === '') {
        return 'segment-dotoff';
    } else {
        return 'segment-' + this.digit;
    }
  }

}

</script>

<style lang="scss">

@import '@/sass/clock/segment.scss';

</style>
