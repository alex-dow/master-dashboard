import vue from 'vue';

declare module 'vue/types/vue' {
  interface vue {
    $mqtt?: any
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends vue> {
    mqtt?: any;
  }
}