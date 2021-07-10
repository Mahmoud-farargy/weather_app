<template>
    <div>
      <div v-if="loading" class="weather--loading flex-column">
        <span></span>
      </div>
      <div v-else id="weather--view" v-bind:class="{'night--weather': !getKeys.isDayWeather,
    'day--weather': getKeys.isDayWeather }">
        <div class="weather--inner container">
          <CurrentWeather  :currentCity="currentCity" :isDay="getKeys.isDayWeather" :loading="loading" :getDegree="getDegree" />
          <WeatherChart :currentCity="currentCity" :isDay="getKeys.isDayWeather" :loading="loading" :getDegree="getDegree" />
          <HourlyWeatherList :currentCity="currentCity" :loading="loading" :getDegree="getDegree" />
          <DailyWeatherList  :currentCity="currentCity" :isDay="getKeys.isDayWeather" :loading="loading" :getDegree="getDegree" />
          <AdditionalInfo :currentCity="currentCity" :loading="loading"/>
          <Map :currentCity="currentCity" />
        </div>
      </div>
    </div>

</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { APIKey } from "../config/info";
import API from "../services/API";
import CurrentWeather from "../components/CurrentWeather/CurrentWeather";
import HourlyWeatherList from '../components/HourlyWeather/HourlyWeatherList';
import DailyWeatherList from '../components/DailyWeather/DailyWeatherList';
import AdditionalInfo from "../components/AdditionalInfo/AdditionalInfo";
import WeatherChart from "../components/WeatherChart/WeatherChart";
import Map from "../components/LeafletMap/LeafletMap";

export default {
  data(){
    return {
      currentCity: {},
      loading: false
    }
  },
  components: {
    CurrentWeather,
    HourlyWeatherList,
    DailyWeatherList,
    AdditionalInfo,
    WeatherChart,
    Map
  },
  computed: {
    ...mapGetters("savedResults", {results: "getResultList"}),
    ...mapGetters("toggleKeys", ["getKeys"]),
  },
  methods: {
    ...mapActions("toggleKeys", ["mutateKeys"]),
      getWeather(){
        this.loading = true;
        this.currentCity = this.results.filter(result => result.name === this.$route.params.city)[0];
        console.log( this.$route.params.city);
        console.log(this.currentCity);
        return new Promise((resolve, reject) => {
            API().get(`data/2.5/onecall?lat=${this.currentCity && this.currentCity.coord.lat}&lon=${this.currentCity && this.currentCity.coord.lon}&exclude=current&alerts&units=imperial&appid=${APIKey}
                      `)
            .then(res => {
              console.log(res);
              this.loading = false;
              resolve(res.data);
            }).catch(() => {
               this.loading = false;
                reject([]);
            })
        }) 
      },
      checkIfDayTime(sys){
        if(sys && sys.sunrise && sys.sunset){
          const currentHours = new Date().getHours();
          const sunrise = new Date(sys?.sunrise * 1000).getHours();
          const sunset = new Date(sys?.sunset * 1000).getHours();
          console.log(currentHours, sunrise, sunset)
          return (currentHours > sunrise && currentHours < sunset);
        }else{
          return false;
        }
      },
      getDegree(temp) {
        if(this.getKeys?.isFahrenheit){
          return Math.round(temp);
        }else{
          return Math.round((temp - 32) * 5 / 9);
        }
      }
  },
  created(){
    this.getWeather().then(res => {
      this.currentCity = {...this.currentCity, ...res};
      this.mutateKeys({ key: "isDayWeather", val: this.checkIfDayTime(this.currentCity?.sys || false)});
      console.log(res, this.currentCity);
    });
    // air polution
    // API().get(`/data/2.5/air_pollution?lat=50.8476&lon=14.0625&appid=${APIKey}`).then(res => {
    //   console.log(res);
    // })
    
  }
}
</script>

<style lang="scss" scoped>
 .weather--loading{
    @keyframes spin {
      to {
        transform: rotateZ(360deg);
      }
    }
    height: 100vh;
    width: 100%;
    justify-content: center;
    align-items:center;
    span {
      display: block;
      margin: 0 auto;
      width:60px;
      height: 60px;
      border: 4px solid transparent;
      border-top-color: #142a5f;
      border-radius: 50%;
      animation: spin ease 1000ms infinite;
    }
  }
  #weather--view{
    padding-top: var(--component-padding-top);
    color: #000;
    overflow-y: auto ;
    transition: 500ms var(---transition-mild);
    width: 100%;
    height: 100%;
    min-height: 100vh;
    .weather--inner{
      overflow: hidden;
      max-width: 1024;
      margin: 0 auto;
    }
    .weather--inner.container{
      padding: 0;
    }
  }

</style>