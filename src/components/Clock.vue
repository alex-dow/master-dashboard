<template>
<div>
    <SegmentDisplay :digit="h1"/>
    <SegmentDisplay :digit="h2"/>
    <SegmentDisplay :digit="dot1"/>
    <SegmentDisplay :digit="m1"/>
    <SegmentDisplay :digit="m2"/>
    <SegmentDisplay :digit="dot2"/>
    <SegmentDisplay :digit="s1"/>
    <SegmentDisplay :digit="s2"/>
</div>
</template>

<script>

import SegmentDisplay from './SevenSegmentNumber.vue';

export default {
    components: {
        SegmentDisplay
    },

    data() {
        return {
            h1: ' ',
            h2: ' ',
            dot1: ' ',
            m1: ' ',
            m2: ' ',
            dot2: ' ',
            s1: ' ',
            s2: ' ',
            interval: null
        }
    },

    methods: {
        updateTime() {
            var now = new Date();
            var h = now.getHours();
            var m = now.getMinutes();
            var s = now.getSeconds();

            if (h < 10) {
                this.h1 = 0;
                this.h2 = h;
            } else if (h < 20) {
                this.h1 = 1;
                this.h2 = h - 10;
            } else {
                this.h1 = 2;
                this.h2 = h - 20;
            }

            if (m === 0) {
                this.m1 = 0;
                this.m2 = 0;
            } else if (m < 10) {
                this.m1 = 0;
                this.m2 = m;
            } else {
                this.m1 = Math.floor(m / 10) % 10;
                this.m2 = m % 10;
            }

            if (s === 0) {
                this.s1 = 0;
                this.s2 = 0;
            } else if (s < 10) {
                this.s1 = 0;
                this.s2 = s;
            } else {
                this.s1 = Math.floor(s / 10) % 10;
                this.s2 = s % 10;
            }
        },
        blink() {
            if (this.dot === false) {
                this.dot1 = ' ';
                this.dor2 = ' ';
            } else {
                this.dot1 = '.';
                this.dot2 = '.';
            }
        }
    },

    mounted() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.interval = setInterval(() => {
            this.updateTime();
            this.blink();
        }, 500);
    },

    beforeDestroy() {
        clearInterval(this.interval);
    }
}
</script>
