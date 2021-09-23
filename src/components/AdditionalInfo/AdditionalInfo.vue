<template>
  <section v-if="currentCity" id="additionalInfo" class="flex-row">
    <div class="container flex-column">
        <!-- Section title -->
        <h3 class="forecast--title mb-3" :style="{color: isDay ? '#fff' :'#acfcff'}">Today's Forecast</h3>
        <div class="additional--info--inner flex-row">
            <div v-if="currentCity.sys.sunrise">
                <span>Sunrise</span>
                <span>{{new Date(currentCity.sys.sunrise * 1000).toLocaleString("en-us", {timeStyle: "short"})}}</span>
            </div>
            <div v-if="currentCity.sys.sunset">
                <span>Sunset</span>
                <span>{{new Date(currentCity.sys.sunset * 1000).toLocaleString("en-us", {timeStyle: "short"})}}</span>
            </div>
            <div v-if="currentCity.weather[0].main">
                <span>Description</span>
                <span>{{currentCity.weather[0].main}}</span>
            </div>
            <div v-if="currentCity.main.humidity">
                <span>Humidity</span>
                <span>{{currentCity.main.humidity}}%</span>
            </div>
            <div v-if="currentCity.clouds.all">
                <span>Cloudness</span>
                <span>{{currentCity.clouds.all}}%</span>
            </div>
            <div v-if="currentCity.wind.speed">
                <span>Wind speed</span>
                <span>{{currentCity.wind.speed}} km/h
                    <span v-if="currentCity.wind.deg" class="wind--degree">
                        <i :style="{transform: `rotateZ(${currentCity.wind.deg}deg)`}" class="fas fa-arrow-up"></i>
                    </span>  
                </span>
            </div>
            <div v-if="currentCity.wind.gust">
                <span>Wind gust</span>
                <span>{{currentCity.wind.gust}} mph</span>
                
            </div>
            <div v-if="currentCity.main.pressure">
                <span>Pressure</span>
                <span>{{currentCity.main.pressure}} hPa</span>
            </div>
            <div v-if="currentCity.main.grnd_level">
                <span>Ground level</span>
                <span>{{currentCity.main.grnd_level}} &deg;</span>
            </div>
            <div v-if="currentCity.main.sea_level">
                <span>Sea level</span>
                <span>{{currentCity.main.sea_level}} &deg;</span>
            </div>
            <div v-if="currentCity.coord.lat">
                <span>Latitude</span>
                <span>{{currentCity.coord.lat}}&deg;</span>
            </div>
            <div v-if="currentCity.coord.lon">
                <span>Longitude</span>
                <span>{{currentCity.coord.lon}}&deg;</span>
            </div>

        </div>
        <div v-if="currentCity.alerts && currentCity.alerts.length > 0">
            <Warnings :alerts="currentCity.alerts" :isDay="isDay" />
        </div>  
    </div>

  </section>
</template>

<script>
import Warnings from './Warnings/Warnings';
export default {
    props: [
        "currentCity",
        "isDay"
    ],
    components: {
        Warnings
    },
}
</script>

<style lang="scss" scoped>
 #additionalInfo{
     color: var(--white);
     .additional--info--inner{
         flex-wrap: wrap;
        > div {
            display: flex;
            flex-direction: column;
            flex-basis:50%;
            margin-bottom: 20px;
            &:last-of-type{
                margin-bottom:0;
            }
            span:nth-child(1){
                text-transform: capitalize;
                font-size: 12px;
                margin-bottom: 8px;
            }
            span:nth-child(2){
                font-weight:800;
            }
            .wind--degree{
                margin-left: 3px;
            }
        }

     }
 }
</style>