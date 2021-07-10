<template>
  <div id="app">
    <Header />
    <Modals v-if="modalsState && Object.keys(modalsState).length > 0 && Object.values(modalsState).some(el => el === true)" />
    <RouterView :key="$route.fullPath"/>
  </div>
</template>
<script>
import { refreshCitiesResults } from "./Utilites/Utilites";
import appConfig from "./app-config";
import { mapActions, mapGetters } from "vuex";
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
    ...mapGetters("modals", {modalsState:"getModals"}),
    ...mapGetters("savedResults", ["getResultList"]),
  },
  methods: {
    ...mapActions("savedResults", ["updateResultList"]),
  },
  mounted() {
    refreshCitiesResults();
  }
}
</script>
