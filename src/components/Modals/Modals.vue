<template>
  <div id="modals">
    <add-city v-if="modalsState.addCity" />
    <share v-if="modalsState.share" :linkUrl="currentUrl" :cityName="cityName"/>
  </div>
 
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Modal",
  components: { 
    AddCity: () => import("./AddCity/AddCity.vue"),
    Share: () => import("./Share/Share.vue")
  },
  computed: {
      ...mapGetters("modals", {modalsState: "getModals"}),
      currentUrl(){
        return window.location.href || "";
      },
      cityName(){
        return this.$route.params?.city || "";
      }
  },
};
</script>

<style lang="scss" scoped>
#modals {
    position: relative;
}
</style>