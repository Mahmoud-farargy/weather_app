<template>
    <section id="minutelyWeatherList">
        <div class="container flex-column">
            <!-- Section title -->
            <h3 class="forecast--title mb-3" :style="{color: isDay ? '#fff' :'#acfcff'}">Minutely Precipitation Forecast</h3>
            <!-- Minutely precipitation forecast -->
            <ul  class="hourly--list flex-row">
                <li class="w-100 h-100" v-for="(timeItem, index) in alteredMinutelyList" v-bind:key="index">
                    <MinutelyWeatherItem :timeItem="timeItem" :getDegree="getDegree" />
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import MinutelyWeatherItem from "./MinutelyWeatherItem/MinutelyWeatherItem";
export default { 
    name: "HourlyWeather",
    props: [
        "loading",
        "currentCity",
        "getDegree",
        "isDay"
    ],
    computed: {
        alteredMinutelyList() {
            return (this.currentCity && this.currentCity.minutely) ? this.currentCity.minutely : [];
        }
    },
    components:{
        MinutelyWeatherItem
    },
}
</script>
<style lang="scss" scoped>
 #minutelyWeatherList{
     @media (max-width: 670px) {
        .forecast--title{
            margin-left: 15px;
        }   
     }
 }
</style>