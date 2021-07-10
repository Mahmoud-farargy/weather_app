<template>
    <section id="hourlyWeatherList">
        <div class="container">
            <ul  class="hourly--list flex-row">
                <li class="w-100 h-100" v-for="(timeItem, index) in alteredHourlyList" v-bind:key="index">
                    <HourlyWeatherItem :timeItem="timeItem" :getDegree="getDegree"/>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import HourlyWeatherItem from "./HourlyWeatherItem/HourlyWeatherItem";

export default { 
    name: "HourlyWeather",
    props: [
        "loading",
        "currentCity",
        "getDegree"
    ],
    computed: {
        alteredHourlyList() {
            console.log("hourly wather", this.currentCity.hourly)
            return (this.currentCity && this.currentCity.hourly) ? this.currentCity.hourly?.slice(0,48) : [];
        }
    },
    components:{
        HourlyWeatherItem
    }
}
</script>

<style lang="scss" scoped>
 #hourlyWeatherList {
     width: 100%;
     border-bottom: var(--weather-border-bottom);
     .container{
         width:100%;
         .hourly--list{
            list-style: none;
            width: 100%;
            max-width: 100vw;
            overflow-x: scroll;
            overflow-y: hidden;
            &::-webkit-scrollbar{
                display: none;
                width:0;
            }
         }
        @media only screen and (max-width: 670px) {
            padding-left:0;
            padding-right:0;
        }
     }
 }
</style>