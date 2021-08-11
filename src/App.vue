<template>
  <div id="app">
    <!-- Confirmation Modal -->
    <vue-confirm-dialog></vue-confirm-dialog>
    <!-- Header -->
    <Header />
    <!-- Modals -->
    <Modals v-if="modalsState && Object.keys(modalsState).length > 0 && Object.values(modalsState).some(el => el === true)" />
    <!-- Routes -->
    <transition name="fadepage">
       <RouterView :key="$route.fullPath"/>
    </transition>
  </div>
</template>
<script>
import { refreshCitiesResults } from "./Utilities/Utilites";
import appConfig from "./app-config";
import { mapGetters } from "vuex";
import Modals from "./components/Modals/Modals.vue";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-toast-notification/dist/theme-sugar.css';
import Header from "@/components/Header.vue";
export default {
  name: "app",
  page: {
        // All subcomponent titles will be injected into this template.
    titleTemplate(title){
      title = typeof title === "function" ? title(this.$store) : title;
      return title ? `${title} | ${appConfig.title}` : appConfig.title;
    }
  },
  components: {
    Header,
    Modals
  },
  computed: {
    ...mapGetters("modals", {modalsState:"getModals"})
  },
  mounted() {
    refreshCitiesResults();
  }
}
</script>
