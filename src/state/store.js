import Vue from 'vue'
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import modules from "./modules";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules,
  plugins: [createPersistedState()],
  strict: process.env.NODE_ENV !== "production"
})
export default store;