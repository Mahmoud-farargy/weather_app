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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

router.beforeEach((to, _, next) => {
  document.title = `${(to.meta && to.meta.title) ? to.meta.title : "Weather App"}`;
  next();
})
