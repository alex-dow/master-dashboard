<template>
<div class="segment-clock">
  <segment-number :digit="hour1"/>
  <segment-number :digit="hour2"/>
  <segment-number :digit="separator"/>
  <segment-number :digit="minute1"/>
  <segment-number :digit="minute2"/>
  <segment-number :digit="separator"/>
  <segment-number :digit="second1"/>
  <segment-number :digit="second2"/>
</div>
</template>

<script lang="ts">

import { Prop, Component, Vue } from 'vue-property-decorator';
import SegmentNumber from '@retro-dashboard/segment-number/src/SegmentNumber.vue';

@Component({
  components: {
    SegmentNumber
  }
})
export default class SegmentClock extends Vue {

  @Prop({ default: false }) readonly blink!: boolean;
  @Prop() readonly sync!: number;

  private counterTimer!: number;
  private currentTime!: string;
  private showDot: boolean = true;
  hour: number = 0;
  minute: number = 0;
  second: number = 0;


  mounted() {
    this.dateObj = new Date();
    this.counterTimer = setInterval(() => {
      if (this.blink) this.showDot = !this.showDot;
      const d = new Date();
      this.hour = d.getHours();
      this.minute = d.getMinutes();
      this.second = d.getSeconds();
    }, 500);
  }

  get hour1(): number {
    if (this.hour < 10) {
      return 0;
    } else {
      return parseInt(this.hour.toString()[0]);
    }
  }

  get hour2(): number {
    if (this.hour < 10) {
      return this.hour;
    } else {
      return parseInt(this.hour.toString()[1]);
    }
  }

  get separator(): string {
    return this.showDot ? 'doton' : 'dotoff';
  }

  get minute1(): number {
    if (this.minute < 10) {
      return 0;
    } else {
      return parseInt(this.minute.toString()[0]);
    }
  }

  get minute2(): number {
    if (this.minute < 10) {
      return this.minute;
    } else {
      return parseInt(this.minute.toString()[1]);
    }
  }

  get second1(): number {
    if (this.second < 10) {
      return 0;
    } else {
      return parseInt(this.second.toString()[0]);
    }
  }

  get second2(): number {
    if (this.second < 10) {
      return this.second;
    } else {
      return parseInt(this.second.toString()[1]);
    }
  }
}

</script>
