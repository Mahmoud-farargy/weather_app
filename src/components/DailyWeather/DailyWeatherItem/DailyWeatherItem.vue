<template>
    <div id="dailyWeatherItem" class="flex-row">
        <div class="daily--item--inner">
            <span>{{new Date(item.dt * 1000).toLocaleString("en-us", {weekday: "long"})}}</span>
        </div>
        <div class="condition flex-row">
            <img :src="require(`../../../../public/conditions/${item.weather[0].icon}.svg`)" alt="daily item" />
        </div>
        <div class="daily--weather flex-row">
            <span class="high">{{getDegree((item.temp && item.temp.max) && item.temp.max)}}&deg;</span>
            <span class="low" :style="{color: isDay ? '#e4e4e4' : '#9b9d9e'}">{{getDegree((item.temp && item.temp.min) && item.temp.min)}}&deg;</span>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        "item",
        "isDay",
        "getDegree"
    ]
}
</script>

<style lang="scss" scoped>
    #dailyWeatherItem{
        width:100%;
        align-items: center;
        justify-content: space-between;
        color : var(--white);
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
            // .low{
            //     color:#e4e4e4;
            // }
        }
    }
</style>