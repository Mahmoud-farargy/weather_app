<template>
    <div @click="changeIndex" id="dailyWeatherItem" :class="{'active--hourly--item' : getKeys.isDailyDetailsOpen && (currentIndex === index)}" class="flex-row">
        <div class="daily--item--inner">
            <span>{{new Date(item.dt * 1000).toLocaleString("en-us", {weekday: "long"})}}</span>
        </div>
        <div :title="item.weather[0].description" class="condition flex-row">
            <img loading="lazy" :src="require(`../../../../public/conditions/${item.weather[0].icon}.svg`)" alt="daily item" />
        </div>
        <div class="daily--weather flex-row">
            <span title="High" class="high">{{getDegree((item.temp && item.temp.max) && item.temp.max)}}&deg;</span>
            <span title="Low" class="low" :style="{color: isDay ? '#e4e4e4' : '#a8a8a8'}">{{getDegree((item.temp && item.temp.min) && item.temp.min)}}&deg;</span>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    props: [
        "item",
        "isDay",
        "getDegree",
        "index",
        "updateDayIndex",
        "currentIndex",
    ],
    computed: {
        ...mapGetters("toggleKeys", ["getKeys"]),
    },
    methods: {
        changeIndex() {           
            this.updateDayIndex(this.index, this.currentIndex !== this.index);
        }
    }
}
</script>

<style lang="scss" scoped>
    #dailyWeatherItem{
        width:100%;
        align-items: center;
        justify-content: space-between;
        color : var(--white);
        padding: 6px 13px;
        cursor: pointer;
        div{
            flex:1 ;
        }
        .condition{
            align-items: center;
            justify-content: center;
            img{
                width: 20px;
                min-height: 100%;
                object-fit: contain;
            }
        }
        .daily--weather{
            justify-content: flex-end;
            span{
                min-width: 20px;
            }
            .high{
                font-weight: 20px;
                margin-right: 12px;
            }
        }
    }
</style>