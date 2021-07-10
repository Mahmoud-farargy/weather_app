<template>
  <div id="modals">
    <add-city v-if="modalsState.addCity" />
  </div>
 
</template>

<script>
import AddCity from "./AddCity/AddCity.vue";
import { mapGetters } from "vuex";

export default {
  name: "Modal",
  components: { AddCity },
  computed: {
      ...mapGetters("modals", {modalsState: "getModals"})
  },
  created() {
    console.log("created");
  },
};
</script>

<style lang="scss" scoped>
#modals {
    position: relative;
}
</style>