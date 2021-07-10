<template>
    <section id="dailyWeatherList">
        <div class="container flex-column">
            <ul class="daily--weather--inner">
                <li v-for="(item, index) in alteredDailyList" :key="index + (item.dt && item.dt)" class="w-100 h-100">
                    <DailyWeatherItem :item="item" :isDay="isDay" :getDegree="getDegree" />
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import DailyWeatherItem from "./DailyWeatherItem/DailyWeatherItem.vue";

export default {
    components: {
        DailyWeatherItem
    },
    props: [
        "currentCity",
        "isDay",
        "getDegree"
    ],
    computed: {
        alteredDailyList () {
            return (this.currentCity && this.currentCity.daily) && this.currentCity.daily?.slice(1,8);
        }
    }
}
</script>

<style lang="scss" scoped>
    #dailyWeatherList{
        width: 100%;
        height: 100%; 
        border-bottom: var(--weather-border-bottom);
       
        .daily--weather--inner{
            list-style-type: none;
            padding:0;
            margin-bottom: 24px;
            &:last-of-type{
                margin-bottom: 0;
            }
        }
    }
</style>