<template>
  <div class="home">
     <cities-list />
  </div>
</template>

<script>
// @ is an alias to /src
import CitiesList from "@/components/Cities/CitiesList.vue";
export default {
  name: 'Home',
  components: {
    CitiesList
  },
}
</script>

<style lang="scss" scoped>
  .home{
    width: 100%;
    height: 100%;
  }
</style>