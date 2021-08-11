<template>
  <section id="currentWeather">
    <div
      v-if="currentCity"
      class="container flex-column current--weather--inner"
    >
      <div class="weather--info flex-column">
        <span
          :title="`Current Location: ${currentCity.name} in ${currentCity.sys.country}`"
          class="city--name"
          ><i class="fas fa-map-marker-alt marker--icon"></i>
          {{ currentCity.name }},
          {{ currentCity.sys.country && currentCity.sys.country }}</span
        >
        <span
          :title="`Current time in ${currentCity.name}`"
          class="city--time"
          >{{ formattedTime }}</span
        >
        <span title="Main Temperature" class="current--temperture"
          >{{ getDegree(currentCity.main.temp) }}&deg;</span
        >
        <div class="high--low--temperture flex-row">
          <div title="High" class="high flex-row">
            <i class="fas fa-chevron-up"></i>
            <span>{{ getDegree(currentCity.main.temp_max) }}&deg;</span>
          </div>
          <div title="Low" class="low flex-row">
            <i class="fas fa-chevron-down"></i>
            <span>{{ getDegree(currentCity.main.temp_min) }}&deg;</span>
          </div>
        </div>
        <span title="Weather description" class="condition">{{
          currentCity.weather[0].description
        }}</span>
        <span class="feels--like"
          >Feels like {{ getDegree(currentCity.main.feels_like) }}&deg;</span
        >
      </div>
      <div class="weather--icon flex-column" v-if="typeof isDay === 'boolean'">
        <img
          loading="lazy"
          class="fadeEffect"
          v-bind:src="
            require(isDay
              ? '../../../public/sun.png'
              : '../../../public/moon.png')
          "
          :alt="`${isDay ? 'Daytime' : 'Nighttime'}`"
        />
      </div>
    </div>
  </section>
</template>

<script>
import moment from "moment-timezone";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      formattedTime: "Loading 00:00:00 AM",
      timeInterval: null,
    };
  },
  props: ["isDay", "currentCity", "loading", "getDegree"],
  computed: {
    ...mapGetters("savedResults", { cityTimezone: "getCityTimezone" }),
    timeZone() {
      return this.cityTimezone
        ? this.cityTimezone
        : Intl.DateTimeFormat().resolvedOptions().timeZone;
    },
  },
  methods: {
    getCityTime() {
      this.timeInterval = setInterval(() => {
        this.formattedTime = `${moment()
          .tz(this.timeZone)
          .format("dddd h:mm:ss A")}`;
      }, 1000);
    },
  },
  created() {
    this.getCityTime();
  },
  beforeDestroy() {
    clearInterval(this.timeInterval);
  },
};
</script>

<style lang="scss" scoped>
#currentWeather {
  padding-top: 10px;
  border-bottom: var(--weather-border-bottom);
  .container {
    margin: 30px auto;
    min-height: 360px;
    position: relative;
    color: var(--white);
  }
  span {
    display: block;
  }

  .weather--info {
    z-index: 5;
    flex: 1;
    .marker--icon {
      font-size: 20px;
    }
    .city--name {
      margin-bottom: 3px;
      font-size: 25px;
      font-weight: 700;
    }
    .current--temperture {
      margin-top: 40px;
      font-size: 80px;
      font-weight: 800;
    }
  }
  .high--low--temperture {
    gap: 16px;
    .high,
    .low {
      span {
        margin-left: 8px;
      }
    }
  }
  .condition {
    text-transform: capitalize;
    font-size: 24px;
    font-weight: 700;
    margin: 60px 0 8px 0;
  }
  .feels--like {
    font-size: 14px;
    font-weight: 500;
  }
  .current--weather--inner {
    position: relative;
    .weather--icon {
      justify-content: center;
      z-index: 0;
      height: 100%;
      position: absolute;
      right: -185px;
      display: flex;
      width: 366px;
      height: 366px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      @media (max-width: 670px) {
        width: 260px;
        height: 260px;
        top: 50%;
        transform: translate(-50%, -50%);
        right: -260px;
      }
    }
  }
}
</style>