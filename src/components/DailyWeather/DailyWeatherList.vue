<template>
    <section id="dailyWeatherList">
        <div class="container flex-column">
            <ul class="daily--weather--inner">
                <li v-for="(item, index) in alteredDailyList" :key="index + (item.dt && item.dt)" class="w-100 h-100">
                    <DailyWeatherItem 
                        :item="item"
                        :isDay="isDay"
                        :updateDayIndex="updateDayIndex"
                        :currentIndex="currentIndex"
                        :getDegree="getDegree"
                        :index="index" />
                </li>
            </ul>
            <transition name="huge-inc">
            <WeatherDetails :detailsList="detailsList" v-if="Object.keys(detailsList).length > 0 && currentIndex !== null" :listTitle="formattedTime" :openDetails="getKeys.isDailyDetailsOpen" :getDegree="getDegree"/>
            </transition>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import DailyWeatherItem from "./DailyWeatherItem/DailyWeatherItem.vue";
import moment from "moment-timezone";

export default {
    data(){
        return {
            currentIndex: null,
            currentElement: {},
        }
    },
    components: {
        DailyWeatherItem,
        WeatherDetails
    },
    props: [
        "currentCity",
        "isDay",
        "getDegree",
    ],
    computed: {
        ...mapGetters("toggleKeys", ["getKeys"]),
        alteredDailyList () {
            return (this.currentCity && this.currentCity.daily) && this.currentCity.daily?.slice(0,8);
        },
        detailsList() {
            const { getDegree, currentElement } = this;
            return currentElement ? {
                "Day": typeof currentElement.temp?.day !== 'undefined' ? `${getDegree(currentElement.temp?.day)}°`: "",
                "Evening": typeof currentElement.temp?.eve !== 'undefined' ? `${getDegree(currentElement.temp?.eve)}°`: "",
                "Morning": typeof currentElement.temp?.morn!== 'undefined' ? `${getDegree(currentElement.temp?.morn)}°`: "",
                "Night": typeof currentElement.temp?.night  !== 'undefined' ? `${getDegree(currentElement.temp?.night)}°`: "",
                "Humidity": typeof currentElement.humidity !== 'undefined' ? `${currentElement.humidity}%` : "",
                "Clouds": typeof currentElement.clouds !== 'undefined' ? `${currentElement.clouds }%`: "",
                "Pressure": typeof currentElement.pressure !== 'undefined' ? `${currentElement.pressure } hPa`: "",
                "Rain": typeof currentElement.rain !== 'undefined' ? `${currentElement.rain }%`: "",
                "Description": typeof currentElement.weather?.[0]?.description !== 'undefined' ? currentElement.weather?.[0]?.description:  "",
                "Sunrise": typeof currentElement.sunrise !== 'undefined' ? `${new Date(currentElement.sunrise * 1000).toLocaleString("en-us", {timeStyle: "short"})}`: "",
                "Sunset": typeof currentElement.sunset !== 'undefined' ? `${new Date(currentElement.sunset* 1000).toLocaleString("en-us", {timeStyle: "short"}) }`: "",
                "Moonrise": typeof currentElement.moonrise !== 'undefined' ? `${new Date(currentElement.moonrise * 1000).toLocaleString("en-us", {timeStyle: "short"}) }`: "",
                "Moonset": typeof currentElement.moonset !== 'undefined' ? `${new Date(currentElement.moonset * 1000).toLocaleString("en-us", {timeStyle: "short"}) }`: "",
                "Moon Phase": typeof currentElement.moon_phase !== 'undefined' ? `${currentElement.moon_phase }`: "",
                "Wind speed": typeof currentElement.wind_speed !== 'undefined' ?  `${currentElement.wind_speed} mi/h`: "",
                "Wind Degree": typeof currentElement.wind_deg !== 'undefined' ?  `${currentElement.wind_deg}°` : "",
                "Wind Gust": typeof currentElement.wind_gust  !== 'undefined' ?  `${currentElement.wind_gust} mph` :"",
                "UVI Index": typeof currentElement.uvi !== 'undefined' ? currentElement.uvi : 0,
            }: {};
        },
        formattedTime(){
            return (this.currentElement && this.currentElement.dt) && moment(this.currentElement.dt * 1000).format('ddd, MMM DD');
        },
    },
    methods:{
        ...mapActions("toggleKeys", ["mutateKeys"]),
        updateDayIndex(currIndex, val){
            this.mutateKeys({key: "isDailyDetailsOpen", val});
            if(this.getKeys.isHoursDetailsOpen){
                 this.mutateKeys({key: "isHoursDetailsOpen", val: false});
            }
            this.currentIndex = currIndex;
        },
    },
    watch: {
        'getKeys.isDailyDetailsOpen'(val){
            if(!val){
                this.currentIndex = null
            }
        },
        currentIndex(val) {
                if(typeof val !== "undefined"){
                    this.currentElement = this.alteredDailyList[val] ? this.currentCity.daily[val] : [];
                }
        },
    },
}
</script>

<style lang="scss" scoped>
    #dailyWeatherList{
        width: 100%;
        height: 100%; 
        border-bottom: var(--weather-border-bottom);
       .container{
           width:100%;
            .daily--weather--inner{
            list-style-type: none;
            padding:0;
            margin-bottom: 24px;
            &:last-of-type{
                margin-bottom: 0;
            }
        }
         @media only screen and (max-width: 670px) {
            padding-left:0;
            padding-right:0;
        }
       }

    }
</style>