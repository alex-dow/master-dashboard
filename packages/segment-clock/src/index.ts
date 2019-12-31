import SegmentClock from './SegmentClock.vue';

export default {
    install: function(Vue, options) {
      Vue.component('segment-clock', SegmentClock);
    }
}