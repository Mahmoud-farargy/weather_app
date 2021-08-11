import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './state/store';
import "@/design/index.scss";
// import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import VueRouter from 'vue-router';
import VueToast from 'vue-toast-notification';
import AsyncComputed from 'vue-async-computed';
import VueConfirmDialog from 'vue-confirm-dialog'

Vue.config.productionTip = false;
Vue.use(axios);
Vue.use(VueRouter);
Vue.use(VueToast);
Vue.use(AsyncComputed);
Vue.use(VueConfirmDialog);

Vue.component('vue-confirm-dialog', VueConfirmDialog.default);
// Filters
Vue.filter("trimText",(txt, limit) => {
  return txt ? (`${txt.split("").length > limit ? txt.split("").slice(0,limit).join("")+"..." : txt}`) : "";
});

// Vue Instance
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');