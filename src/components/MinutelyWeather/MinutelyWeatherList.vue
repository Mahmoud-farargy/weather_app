<template>
    <section id="minutelyWeatherList">
        <div class="container">
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
        "getDegree"
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