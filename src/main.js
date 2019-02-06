import Vue from 'vue';
import './events/Event-bus';
import App from './App';
import VueYoutube from 'vue-youtube';

Vue.use(VueYoutube);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
});