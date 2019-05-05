<template>
<span>
    {{ rendered }}
</span>
</template>

<script lang="ts">
import Vue from 'vue';

import { random } from '@/utils/math.ts';

type Data = {
    rendered: String,
    idx: number,
    render_timer: null | number
}

export default Vue.extend({
    data() : Data {
        return {
            rendered: '',
            idx: -1,
            render_timer: null
        };
    },

    props: {
        content: {
            required: true,
            type: String
        },

        minSpeed: {
            required: false,
            type: Number,
            default: 30
        },

        maxSpeed: {
            required: false,
            type: Number,
            default: 80
        }
    },

    watch: {
        content(newVal) {
            this.reset();
            this.render();
        }
    },

    methods: {
        render_next() {
            this.idx++;

            if (this.idx === this.content.length) {
                return;
            }

            this.rendered = this.rendered + this.content.charAt(this.idx);
        },

        render() {
            this.render_next();

            if (!this.content) {
              this.$emit('rendered');
              return;
            }

            if (this.idx < this.content.length) {
                this.render_timer = setTimeout(() => {
                    this.render();
                }, random(this.minSpeed, this.maxSpeed));
            } else {
                this.$emit('rendered');
            }
        },

        reset() {
            if (this.render_timer) {
                clearTimeout(this.render_timer);
            }
            this.rendered = '';
            this.idx = -1;
        }
    },

    mounted() {
        this.render();
    }
});
</script>