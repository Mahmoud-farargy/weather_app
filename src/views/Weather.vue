<template>
  <div id="weather">
    <div v-if="currentCity">
      <div v-if="loading" class="weather--loading flex-column">
        <span></span>
      </div>
      <div
        v-else
        id="weather--view"
        v-bind:class="{
          'night--weather': !getKeys.isDayWeather,
          'day--weather': getKeys.isDayWeather,
        }"
      >
        <div class="weather--inner container">
          <CurrentWeather
            :currentCity="currentCity"
            :isDay="getKeys.isDayWeather"
            :loading="loading"
            :getDegree="getDegree"
          />
          <HourlyWeatherList
            :currentCity="currentCity"
            :loading="loading"
            :getDegree="getDegree"
            :isDay="getKeys.isDayWeather"
          />
          <MinutelyWeatherList
            v-if="showMinutelyWeather"
            :currentCity="currentCity"
            :loading="loading"
            :getDegree="getDegree"
            :isDay="getKeys.isDayWeather"
          />
          <DailyWeatherList
            :currentCity="currentCity"
            :isDay="getKeys.isDayWeather"
            :loading="loading"
            :getDegree="getDegree"
          />
          <AdditionalInfo :currentCity="currentCity" :loading="loading" :isDay="getKeys.isDayWeather" />
          <Map :currentCity="currentCity" />
        </div>
      </div>
    </div>
    <div v-else class="unavailable--data flex-column">
      <h3>No available cities</h3>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { APIKey } from "../config/info";
import API from "../services/API";
import CurrentWeather from "../components/CurrentWeather/CurrentWeather";
import HourlyWeatherList from "../components/HourlyWeather/HourlyWeatherList";
import DailyWeatherList from "../components/DailyWeather/DailyWeatherList";
import MinutelyWeatherList from "@/components/MinutelyWeather/MinutelyWeatherList";
import AdditionalInfo from "../components/AdditionalInfo/AdditionalInfo";
import Map from "../components/LeafletMap/LeafletMap";
import moment from "moment-timezone";

export default {
  data() {
    return {
      currentCity: {},
    };
  },
  components: {
    CurrentWeather,
    HourlyWeatherList,
    DailyWeatherList,
    AdditionalInfo,
    MinutelyWeatherList,
    Map,
  },
  computed: {
    ...mapGetters("savedResults", {
      results: "getResultList",
      cityTimezone: "getCityTimezone",
    }),
    ...mapGetters("toggleKeys", ["getKeys"]),
    loading() {
      return this.getKeys?.isGettingWeather;
    },
    showMinutelyWeather() {
      return this.currentCity?.minutely?.some((min) => min?.precipitation > 0);
    },
  },
  methods: {
    ...mapActions("toggleKeys", ["mutateKeys"]),
    ...mapActions("savedResults", ["updateTimezone"]),
    getWeather() {
      this.mutateKeys({ key: "isGettingWeather", val: true });
      this.currentCity = this.results.filter(
        (result) => result.name === this.$route.params.city
      )[0];
      return new Promise((resolve, reject) => {
        API()
          .get(
            `data/2.5/onecall?lat=${
              this.currentCity && this.currentCity.coord.lat
            }&lon=${
              this.currentCity && this.currentCity.coord.lon
            }&exclude=current&alerts&units=imperial&appid=${APIKey}
                      `
          )
          .then((res) => {
            this.mutateKeys({ key: "isGettingWeather", val: false });
            resolve(res.data);
          })
          .catch(() => {
            this.mutateKeys({ key: "isGettingWeather", val: false });
            reject([]);
          });
      });
    },
    checkIfDayTime(sys) {
      if (this.cityTimezone || (sys && sys.sunrise && sys.sunset)) {
        const currentHours = new Date().getHours();
        const currentCityHour = moment().tz(this.cityTimezone).format("HH");
        const sunrise = new Date(sys?.sunrise * 1000).getHours();
        const sunset = new Date(sys?.sunset * 1000).getHours();
        return currentCityHour
          ? currentCityHour > 6 && currentCityHour < 20
          : currentHours > sunrise && currentHours < sunset;
      } else {
        return false;
      }
    },
    getDegree(temp) {
      if (this.getKeys?.isFahrenheit) {
        return Math.round(temp);
      } else {
        return Math.round(((temp - 32) * 5) / 9);
      }
    },
  },
  created() {
    this.getWeather().then((res) => {
      this.currentCity = { ...this.currentCity, ...res };
      this.updateTimezone(res?.timezone);
      this.mutateKeys({
        key: "isDayWeather",
        val: this.checkIfDayTime(this.currentCity?.sys || false),
      });
    });
    // air polution api
    // API().get(`/data/2.5/air_pollution?lat=50.8476&lon=14.0625&appid=${APIKey}`).then(res => {
    //   console.log(res);
    // })
  },
};
</script>

<style lang="scss" scoped>
#weather {
  #weather--view {
    padding-top: var(--component-padding-top);
    color: #000;
    overflow-y: auto;
    transition: 500ms var(---transition-mild);
    width: 100%;
    height: 100%;
    min-height: 100vh;
    .weather--inner {
      overflow: hidden;
      max-width: 1024;
      margin: 0 auto 30px;
    }
    .weather--inner.container {
      padding: 0;
    }
  }
  .unavailable--data {
    background-color: var(--primary-clr);
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 100vh;
    h3 {
      color: var(--white);
    }
  }
}
</style>