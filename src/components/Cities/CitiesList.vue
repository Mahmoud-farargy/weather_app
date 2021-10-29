<template>
  <div id="cities">
    <div v-if="citiesResults.length <= 0 && getKeys.isSearchBarOpen" class="empty--cities--container flex-row">
        <div class="empty--cities--inner flex-column">
          No results found.
        </div>
    </div>
    <div v-else-if="citiesResults.length <= 0 && !getKeys.isSearchBarOpen" class="empty--cities--container flex-row">
        <div class="empty--cities--inner flex-column">
          No city added, add a new one?
            <button @click="toggleModal('addCity')" class="add--city--btn">
              Add city
            </button>
        </div>
    </div>
   
    <div v-else-if="citiesResults.length > 0" class="cities--container">
        <div
          v-for="(city, index) in citiesResults"
          v-bind:key="city.id ? (city.id + index) : index"
          class="cities--inner"
        >
        <city-item v-if="city" :item="city" />
        </div>
    </div>

  </div>
</template>

<script>
import { mapActions,mapGetters } from "vuex";
import CityItem from "./CityItem/CityItem.vue";
export default {
  name: "Cities",
  computed: {
    ...mapGetters("savedResults", { citiesResults: "getResultList", rowCities:"getCities"}),
    ...mapGetters("toggleKeys", ["getKeys"]),
    trackCitiesLength () {
        return this.rowCities.length;
    }
  },
  watch:{
   trackCitiesLength(){
     if( this.$route.name === "Home" && (window.innerWidth || document.documentElement.clientWidth >= 670 ) ){
        const timeout = setTimeout(() => {
            window.scrollTo(0,0);
            window.clearTimeout(timeout);
        }, 1000);
       }

   }
  },
  methods: {
     ...mapActions("modals", {modal:"toggleModal"}),
      toggleModal(type){
           this.modal({type});
      }
  },
  components: {
    CityItem,
  }
};
</script>

<style lang="scss" scoped>
#cities {
  color : var(--white);
  padding-top: var(--component-padding-top);
  min-height: 100vh;
  background-color: var(--secondary-clr);
  grid-auto-rows: 240px;
  .cities--container, .empty--cities--container{
      width: 100%;
      height: 100%;
  }
  .cities--container{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 0px;
    .cities--inner {
            height: 100%;
            width: 100%;
            color: inherit;
    }
    @media only screen and (max-width: 670px){
            grid-template-columns: repeat(2, 1fr);
    }
    @media only screen and (max-width: 450px){
            grid-template-columns: 100% !important;
    }
  }
  .empty--cities--container{
    min-height: calc(100vh - 81px);
    align-items: center;
    justify-content:center;
    .empty--cities--inner{
      text-align:center;
      justify-content:center;
      font-size: 18px;
       button{
         border-radius: 8px;
         padding: 8px 24px;
      
         cursor: pointer;
         border: none;
         transition: 500ms var(---transition-mild);
         width: 150px;
         margin: 16px auto 0;
        background: var(--light-gray);

         &:hover{
           outline: none;
           transform: scale(0.98);
         }

        &:focus{
          outline: none;
        }
       }
    }
  }
}
</style>