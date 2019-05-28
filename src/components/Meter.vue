<template>
<div class="computer-meter">
  <div class="vu-meter low">
    <div class="vu-meter-light" :style="{'height': (100 - value) + '%'}"/>
  </div>
  <div class="vu-meter-amount">
    <span class="cga-cyan">{{ label }}</span>
    <br/>
    <span
      :class="{
        'cga-light-green': value < 40,
        'cga-yellow': value >= 40 && value < 80,
        'cga-light-red': value >= 80
      }">{{ roundedValue }}%
    </span>
  </div>
</div>
</template>

<style lang="scss">

@import '@/sass/standards.scss';
@import '@/sass/cga-display.scss';
@import '@/sass/colours.scss';

.vu-meter {
  width: 2rem;
  height: 3rem;
  display: inline-block;
  align-self: center;
  box-shadow: -1px 4px 38px -8px $cga-white;

  .vu-meter-light {
    width: 100%;
    height: 90%;
    background-color: black;

  }
}

.vu-meter[class$="low"] {
    background-color: $cga-light-green;
}

.vu-meter[class$="medium"] {
    background-color: $cga-yellow;
}

.vu-meter[class$="high"] {
    background-color: $cga-light-red;
}

.vu-meter-amount {
  font-size: 30pt;

}

.computer-meter {
  display: flex;
  flex-flow: column;
  align-content: center;
  justify-content: center;
  text-align: center;
  width: 4rem;
}

</style>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Meter extends Vue {

  @Prop({default: 0}) readonly value!: number;
  @Prop(String) readonly label!: string;

  get roundedValue(): number {
    return Math.ceil(this.value);
  }

}

</script>