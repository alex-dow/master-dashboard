<template>
<img :src="require('./assets/7segment/lt303/' + digit + '.jpg')" class="segment-number" v-if="digit !== 'doton' && digit !== 'dotoff'"/>
<img :src="require('./assets/7segment/lt303/' + digit + '.jpg')" class="segment-dot" v-else/>
</template>

<style lang="scss">

.segment-number {
  width: 50px;
  height: 64px;
}

.segment-dot {
  width: 17px;
  height: 64px;
}
</style>

<script lang="ts">

import { Prop, Component, Vue } from 'vue-property-decorator';

@Component
export default class SegmentNumber extends Vue {

  @Prop([Number, String]) readonly digit: number | string;

}

</script>
