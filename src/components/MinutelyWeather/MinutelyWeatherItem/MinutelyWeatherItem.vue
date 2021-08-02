<template>
   <div id="minutelyWeatherItem">
        <div class="minutely--item--inner flex-column">
            <span class="time--by--minutes" v-if="index !== 0">
                {{ formattedTime }}
            </span>
            <span v-else>
                Now
            </span>
            <span>
                <img loading="lazy" :src="require(`../../../../public/conditions/${getPrecipitation > 0 ? ( getKeys.isDayWeather ? '10d' : '10n') : '04d'}.svg`)" :alt="formattedTime + 'weather'"/>
            </span>
            <span>
                {{Math.round(getPrecipitation)}}%
            </span>
        </div>
    </div>
</template>

<script>
import moment from "moment-timezone";
import { mapGetters } from "vuex";

export default {
    props: [
        "timeItem",
        "getDegree",
        "index"
    ],
    computed: {
         ...mapGetters("toggleKeys", ["getKeys"]),
        formattedTime() {
            return (this.timeItem && this.timeItem.dt) && moment(this.timeItem.dt * 1000).format('h:mm A');
        },
        getPrecipitation(){
            return this.timeItem.precipitation;
        }
    }
}
</script>

<style lang='scss' scoped>
#minutelyWeatherItem{
    .time--by--minutes{
       white-space: nowrap;
    }
}

</style>