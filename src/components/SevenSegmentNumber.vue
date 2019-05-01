<template>
<div :class="digitClass"></div>
</template>

<script lang="ts">

import Vue from 'vue';

export default Vue.extend({
    computed: {
        digitClass() {
            if (this.digit === '.') {
                return 'segment-doton';
            } else if (this.digit === '') {
                return 'segment-dotoff';
            } else {
                return 'segment-' + this.digit; 
            }
        }
    },

    props: {
        digit: {
            required: true,
            default: ''
        }
    }
});

</script>

<style lang="scss">

@import '@/sass/clock/segment.scss';

</style>
