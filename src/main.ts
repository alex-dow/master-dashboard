import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueMqtt from 'vue-mqtt';

const mqtt_scheme = (window.location.protocol === 'https:')? 'mqtts' : 'mqtt';
const mqtt_host = window.location.host;
const mqtt_url = `${mqtt_scheme}://${mqtt_host}/mqtt`;

console.log(mqtt_url);

Vue.use(VueMqtt, mqtt_url, {
  rejectUnauthorized: false,
  clean: true,
  secure: true,
  clientId: 'dashboard'
});

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
