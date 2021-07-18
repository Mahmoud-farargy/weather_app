<template>
    <div v-if="openDetails && Object.keys(this.detailsList).length > 0" id="hourlyDetails">
      <h3 v-if="listTitle" class="section--title">{{listTitle}}</h3>
      <div class="hourly--details--inner">
        <DetailsItem v-for="(el, index) in Object.keys(renderList).slice(0,limit)" :detailsList="renderList" :key="index" :title="el" :val="renderList[el]"  />
      </div>
      <span class="chevron--down--icon flex-column">
        <i @click="toggleVisibility" class="highlight--on--active" :class="showAllDetails ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
      </span>
    </div>
</template>

<script>
import DetailsItem from "./WeatherDetailsItem/WeatherDetailsItem";

export default {
  props: {
    getDegree: Function,
    openDetails: Boolean,
    detailsList: Object,
    listTitle: String
  },
  data() {
    return {
      currentElement: {},
      showAllDetails: false,
      limit: 6
    };
  },
  components: {
    DetailsItem,
  },
  computed: {
    renderList(){
      return this.detailsList
    }
  },
  watch:{
    showAllDetails(val){
      if(val){
        this.limit = Object.keys(this.detailsList).length;
      }else{
        this.limit = Math.round(Object.keys(this.detailsList).length /2);
      }
    },
    openDetails(val){
      if(!val && this.showAllDetails){
        this.showAllDetails = false;
        this.limit =6;
      }
    }
  },
  methods: {
    toggleVisibility(){
      this.showAllDetails = !this.showAllDetails;
    }
  },
};
</script>

<style lang="scss" scoped>
#hourlyDetails {
    padding: 20px 0  0;
    color: var(--white);
    .section--title{
        font-weight: var(--font-weight-heavy);
        font-size: var(--font-size-medium);
        color: inherit;
    }
  .hourly--details--inner {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
  }
  .chevron--down--icon{
    width:100%;
    align-items: center;
    justify-content: center;
    display: block;
    text-align:center;
    margin-top: 20px;
    i{
      padding: 4px 10px;
        font-size: var(--font-size-large);
      cursor: pointer;
      color: var(--gray);
      &:hover{
        transition: var(--transition-mild);
        color: var(--white);
      }
    }

  }
  @media only screen and (max-width: 700px) {
    padding: 20px 20px 0;
     .hourly--details--inner{
          grid-template-columns: repeat(2,1fr);
     }
  }
  @media only screen and (max-width: 400px) {
        grid-template-columns: 100% !important;
  }
}
</style>