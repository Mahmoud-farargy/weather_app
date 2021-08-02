<template>
    <div @click="changeIndex" :class="{'active--hourly--item' : getKeys.isHoursDetailsOpen && (currentIndex === index)}" id="hourlyWeatherItem">
        <div class="hourly--item--inner flex-column">
            <span v-if="index !== 0">
                {{ formattedTime }}
            </span>
            <span v-else>
                Now
            </span>
             <span>{{ formattedByDay }}</span>
            <span>
                <img loading="lazy" :src="require(`../../../../public/conditions/${timeItem.weather[0].icon}.svg`)" :alt="formattedTime + 'weather'"/>
            </span>
            <span v-if=" timeItem.temp">
                {{timeItem && getDegree(timeItem.temp)}}&deg;
            </span>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from "moment-timezone";

export default {
    props: [
        "timeItem",
        "getDegree",
        "index",
        "updateHourIndex",
        "currentIndex"
    ],
    computed: {
        ...mapGetters("savedResults", {cityTimezone: "getCityTimezone"}),
         ...mapGetters("toggleKeys", ["getKeys"]),
        formattedTime() {
            return (this.timeItem && this.timeItem.dt) && moment(this.timeItem.dt * 1000).format('h A');
        },
        formattedByDay(){
            return (this.timeItem && this.timeItem.dt) && new Date(this.timeItem.dt * 1000).toLocaleString('en-us', {weekday: "short"});
        }
    },
    methods: {
        changeIndex() {           
            this.updateHourIndex(this.index, this.currentIndex !== this.index);
        }
    }
}
</script>

<style lang="scss" > 
    .active--hourly--item{
        background-color: var(--transparent-white-lev3) !important;
        border-radius: var(--el-radius);
        transition: var(--transition-mild);
    }

     #hourlyWeatherItem, #minutelyWeatherItem{
        width:100%;
        height: 100%;
        text-align:center;
        cursor: pointer;
        .hourly--item--inner, .minutely--item--inner{
            color: var(--white);
            text-align: center;
            min-width: 45px;
            padding: 5px 21px;
            justify-content: center;
            width: 100%;
            span{
                margin-bottom: 4px;
                &:last-of-type{
                    margin-bottom: 0;
                }
                &:nth-child(1){
                    white-space: nowrap;
                    font-weight: 300;
                    font-size: 14px;
                }
                &:nth-child(2){
                    font-weight: 900;
                }
                &:nth-child(4){
                    font-weight: 600
                }
            }
            img{
                width: auto;
                height: 22px;
                display: block;
                min-height: 100%;
                object-fit: contain;
                margin:0 auto;
            }
        }

     }
</style>