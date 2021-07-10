<template>
  <section id="currentWeather">
      <div class="container flex-column">
        <div class="weather--info flex-column">
            <span class="city--name">{{currentCity.name}}, {{currentCity.sys.country && currentCity.sys.country}}</span>
            <span>{{formattedTime}}</span>
            <span class="current--temperture">{{getDegree(currentCity.main.temp)}}&deg;</span>
            <div class="high--low--temperture flex-row">
                <div class="high flex-row">
                    <i class="fas fa-chevron-up"></i>
                    <span>{{getDegree(currentCity.main.temp_max)}}&deg;</span>
                </div>
                 <div class="low flex-row">
                    <i class="fas fa-chevron-down"></i>
                    <span>{{getDegree(currentCity.main.temp_min)}}&deg;</span>
                </div>
            </div>
            <span class="condition">{{currentCity.weather[0].description}}</span>
            <span class="feels--like">Feels like {{getDegree(currentCity.main.feels_like)}}&deg;</span>
        </div>
        <div class="weather--icon">
            <img v-bind:src="require( isDay ? '../../../public/sun.png' :'../../../public/moon.png')" alt="icon"/>
        </div>
      </div>
  </section>
</template>

<script>
export default {
 props:[
     "isDay",
     "currentCity",
     "loading",
     "getDegree"
 ],
 computed:{
    formattedTime(){
        // todo: get the correct timezone offset
        var d = new Date();
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        var nd = new Date(utc + (3600000* -4));
        console.log( nd.toLocaleString(), this.currentCity.timezone_offset);

        return (this.currentCity && this.currentCity?.dt) && (`${new Date(this.currentCity?.dt * 1000).toLocaleString('en-us', {weekday: "long"})} ${new Date(this.currentCity?.dt * 1000).toLocaleString('en-us', {hour: "numeric"})}`);
    }
 }

}
</script>

<style lang="scss" scoped>
 #currentWeather{
     padding-top:10px;
     border-bottom: var(--weather-border-bottom);
     .container {
         margin: 30px auto;
         min-height: 360px;
         position: relative;
         color: var(--white);
     }
     span{
         display: block;
     }

     .weather--info {
         z-index: 5;
         flex: 1;
         .city--name{
             font-size: 25px;
             font-weight: 700;
         }
         .current--temperture{
             margin-top: 40px;
             font-size: 80px;
             font-weight: 800;
         }
     }
     .high--low--temperture{
         gap: 16px;
         .high, .low{
             span{
                 margin-left: 8px
             }
         }
     }
     .condition{
         text-transform: capitalize;
         font-size: 24px;
         font-weight: 700;
         margin: 60px 0 8px 0;
     }
     .feels--like{
         font-size: 14px;
         font-weight: 500;
     }

     .weather--icon{
        z-index: 0;
        height: 100%;
        position: absolute;
        right: -100px;
        display: flex;
        img{
            width: 366px;
            height: 366px;
        }
     }
 }
</style>