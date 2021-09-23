<template>
  <section id="hourlyWeatherList">
    <div class="container flex-column">
      <!-- Section title -->
      <h3
        class="forecast--title"
        :style="{ color: isDay ? '#fff' : '#acfcff' }"
      >
        Hourly Forecast
      </h3>
      <!-- Hourly forecast Chart -->
      <WeatherChart
        :chartData="chartData"
        :isDay="isDay"
        :loading="loading"
        :getDegree="getDegree"
      />
      <!-- Hourly forecast items -->
      <ul class="hourly--list flex-row">
        <li
          class="hourly--list--item"
          v-for="(timeItem, index) in alteredHourlyList"
          v-bind:key="index"
        >
          <HourlyWeatherItem
            :updateHourIndex="updateHourIndex"
            :timeItem="timeItem"
            :currentIndex="currentIndex"
            :getDegree="getDegree"
            :index="index"
          />
        </li>
      </ul>
      <!-- Hourly forecast details-->
      <transition name="huge-inc">
        <WeatherDetails
          :detailsList="detailsList"
          v-if="Object.keys(detailsList).length > 0 && currentIndex !== null"
          :listTitle="formattedTime"
          :openDetails="getKeys.isHoursDetailsOpen"
          :getDegree="getDegree"
          :alteredHourlyList="alteredHourlyList"
        />
      </transition>
    </div>
  </section>
</template>

<script>
import HourlyWeatherItem from "./HourlyWeatherItem/HourlyWeatherItem";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import WeatherChart from "@/components/WeatherChart/WeatherChart";
import { mapActions, mapGetters } from "vuex";
import moment from "moment-timezone";

export default {
  name: "HourlyWeather",
  data() {
    return {
      currentIndex: null,
      currentElement: {},
    };
  },
  props: ["loading", "currentCity", "getDegree", "isDay"],
  watch: {
    "getKeys.isHoursDetailsOpen"(val) {
      if (!val) {
        this.currentIndex = null;
      }
    },
    currentIndex(val) {
      if (typeof val !== "undefined") {
        this.currentElement = this.currentCity?.hourly?.[val]
          ? this.currentCity.hourly[val]
          : [];
      }
    },
  },
  computed: {
    ...mapGetters("toggleKeys", ["getKeys"]),
    chartData() {
      const { currentCity, getDegree } = this;
      const hourlyList = currentCity?.hourly?.slice(1, 24);
      return currentCity && currentCity?.hourly?.length > 0
        ? {
            labels: hourlyList.map(
              (el) =>
                `${new Date(el.dt * 1000).toLocaleString("en-us", {
                  weekday: "short",
                })} ${new Date(el.dt * 1000).toLocaleString("en-us", {
                  hour: "numeric",
                })}`
            ),
            sets: [
              {
                data: hourlyList.map((el) => {
                  return Math.round(getDegree(el.temp));
                }),
                label: "Temperature",
                backgroundColor: this.isDay ? "#cecece" : "#27699b",
              },
              {
                data: hourlyList.map((el) => {
                  return Math.round(getDegree(el.feels_like));
                }),
                label: "Feels Like",
                backgroundColor: "#1d4da7",
              },
            ],
          }
        : {};
    },
    alteredHourlyList() {
      return this.currentCity && this.currentCity.hourly
        ? this.currentCity.hourly?.slice(0, 48)
        : [];
    },
    detailsList() {
      const { getDegree, currentElement } = this;
      return currentElement
        ? {
            "UVI Index":
              typeof currentElement.uvi !== "undefined"
                ? currentElement.uvi
                : 0,
            Temperature:
              typeof currentElement.temp !== "undefined"
                ? `${getDegree(currentElement.temp)}°`
                : "",
            Humidity:
              typeof currentElement.humidity !== "undefined"
                ? `${currentElement.humidity}%`
                : "",
            Pressure:
              typeof currentElement.pressure !== "undefined"
                ? `${currentElement.pressure} hPa`
                : "",
            Clouds:
              typeof currentElement.clouds !== "undefined"
                ? `${currentElement.clouds}%`
                : "",
            Description:
              typeof currentElement.weather?.[0]?.description !== "undefined"
                ? currentElement.weather?.[0]?.description
                : "",
            "Wind speed":
              typeof currentElement.wind_speed !== "undefined"
                ? `${currentElement.wind_speed} km/h`
                : "",
            "Wind Degree":
              typeof currentElement.wind_deg !== "undefined"
                ? `${currentElement.wind_deg}°`
                : "",
            "Wind Gust":
              typeof currentElement.wind_gust !== "undefined"
                ? `${currentElement.wind_gust} mph`
                : "",
          }
        : {};
    },
    formattedTime() {
      return (
        this.currentElement &&
        this.currentElement.dt &&
        moment(this.currentElement.dt * 1000).format("ddd, MMM DD h:mm A")
      );
    },
  },
  components: {
    HourlyWeatherItem,
    WeatherDetails,
    WeatherChart,
  },
  methods: {
    ...mapActions("toggleKeys", ["mutateKeys"]),
    updateHourIndex(index, val) {
      this.currentIndex = index;
      this.mutateKeys({ key: "isHoursDetailsOpen", val });
      if (this.getKeys.isDailyDetailsOpen) {
        this.mutateKeys({ key: "isDailyDetailsOpen", val: false });
      }
    },
  },
};
</script>

<style lang="scss">
#hourlyWeatherList,
#minutelyWeatherList {
  width: 100%;
  border-bottom: var(--weather-border-bottom);
  .container {
    width: 100%;
    .hourly--list,
    .minutely--list {
      list-style: none;
      width: 100%;
      max-width: 100vw;
      overflow-x: scroll;
      overflow-y: hidden;
      &::-webkit-scrollbar {
        display: none;
        width: 0;
      }
      .hourly--list--item {
        width: 100%;
        height: 100%;
        margin-right: 1px;
      }
    }
    @media only screen and (max-width: 670px) {
      .forecast--title {
        margin-left: 15px;
      }
      padding-left: 0;
      padding-right: 0;
    }
  }
}
</style>