<template>
  <div id="app">
    <!-- Modals -->
    <vue-confirm-dialog></vue-confirm-dialog>
    <Modals v-if="modalsState && Object.keys(modalsState).length > 0 && Object.values(modalsState).some(el => el === true)" />
    <!-- Global Loading Screen -->
    <div v-if="loading" class="weather--loading flex-column">
        <span></span>
    </div>
    <!-- Header -->
    <Header />    
    <!-- Routes -->
    <transition name="fadepage" mode="out-in">
       <RouterView :key="$route.fullPath"/>
    </transition>
  </div>
</template>
<script>
import { refreshCitiesResults } from "./Utilities/Utilites";
import { mapGetters } from "vuex";
import Modals from "./components/Modals/Modals.vue";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-toast-notification/dist/theme-sugar.css';
import Header from "@/components/Header.vue";
export default {
  name: "app",
  components: {
    Header,
    Modals
  },
  computed: {
    ...mapGetters("modals", {modalsState:"getModals"}),
    ...mapGetters("toggleKeys", ["getKeys"]),
    loading() {
      return this.getKeys?.isLoading;
    },
  },
  mounted() {
    refreshCitiesResults();
  }
}
</script>
