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

Vue.config.productionTip = false;
Vue.use(axios);
Vue.use(VueRouter);
Vue.use(VueToast);
Vue.use(AsyncComputed);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

router.beforeEach((to, _, next) => {
  document.title = `${(to.meta && to.meta.title) ? to.meta.title : "Weather App"}`;
  next();
})
