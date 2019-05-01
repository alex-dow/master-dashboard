<template>

<div class="light-container">
    <div class="light" :class="'light-cga-' + light_colour">
        
    </div>
    <div class="label">
        <Typer :content="label" :class="'cga-' + light_colour" />
    </div>
</div>

</template>

<style lang="scss">


@import '@/sass/colours.scss';
@import '@/sass/cga-display.scss';

@mixin light {
    border: 1px solid transparent;
    border-radius: 50%;
    width: 5px;
    height: 5px;
    margin-right: 0.5rem;
}

@mixin light-colours {
    @each $name, $colour in $cga-colours-map {
        .light-cga-#{$name} {
            background: $colour;
            box-shadow: 0 0 0.5rem 0.5rem darken($colour, 20%);
            @include light;
        }
    }
}

.light-container {
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    align-items: center;
    line-height: 12px;

    @include light-colours;

    .label {
        color: #fff;
        font-family: 'VT323', monospace;
        font-size: 10pt;
    }
}

</style>

<script>

import Vue from 'vue';
import Typer from '@/components/Typer.vue';

export default Vue.extend({
    components: {
        Typer
    },

    props: {
        value: {
            required: true,
            default: false
        },

        label: {
            required: false,
            default: ''
        },

        colours: {
            required: false,
            default: () => {
                return {
                    true: 'green',
                    false: 'red'
                }
            }
        }
    },

    computed: {
        light_colour() {
            return this.colours[this.value];
        }
    }
});

</script>