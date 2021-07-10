<template>
  <div :class="{'disabled': getKeys && getKeys.isLoading}" @click="goToWeather" id="cityItem" class="flex-column">
      <span>{{item && item.name}}</span>
      
      <div class="weather flex-row">
          <span>{{Math.round((item && item.main && item.main.temp) ? (item.main.temp) : 0)}}&deg;</span>
          <img :src="require(`../../../../public/conditions/${(item && item.weather && item.weather[0] && item.weather[0].icon) ? (item.weather[0].icon) : '01d' }.svg`)" :alt="`${item.name} temperature`"/>
         
      </div>
      
      <div class="weather--video">
          <video
          autoplay
          loop
          muted
          :src="require(`../../../../public/videos/${(item && item.weather && item.weather[0] && item.weather[0].icon)  ? (handleVideoPaths(item.weather[0].icon)) : '01d' }.mp4`)"
          >
        
          </video>
          
          <div class="weather--bg--overlay"></div>
          <div @click.stop="delCity" class="del--city" v-if="getKeys.editCities">
              <i class="fas fa-trash-alt"></i>
          </div>
      </div>
  </div>
</template>

<script>
import { deleteCity, notify } from "../../../Utilites/Utilites";
import { mapGetters } from "vuex";
export default {
  props: ["item"],
  computed: {
      ...mapGetters("toggleKeys", ["getKeys"])
  },
  methods: {
      delCity(){
        if(!this.getKeys?.isLoading) deleteCity( this.item?.name );
      },
      goToWeather() {
          if(!this.getKeys?.isLoading){
                if(this.item && this.item.name){
                        this.$router.push(`/weather/${this.item.name}`);
                }else{
                    notify({type: "error", msg: "An error occurred."});
                }    
          }

      },
      handleVideoPaths(iconName) {
          const lowerCasedName = iconName.toLowerCase();
          if(lowerCasedName === "03d" || lowerCasedName === "04d"){
              return"02d";
          }else if(lowerCasedName === "03n" || lowerCasedName === "04n"){
              return "02n";
          }else if(lowerCasedName === "09n" || lowerCasedName === "10d" || lowerCasedName === "10n" || lowerCasedName === "11d" || lowerCasedName === "11n" || lowerCasedName === "50d" || lowerCasedName === "50n") {
              return "09d";
          }else{
              return iconName;
          }
      }
  },
  created() {
    console.log("city triggered");
  },
};
</script>

<style lang="scss" scoped>
    #cityItem{
        cursor: pointer;
        position: relative;
        padding: 20px;
        flex-basis: 50%;
        min-height: 250px;
        color: var(--white);
        width:100%;
        height: 100%;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
        user-select: none;
        -webkit-user-select: none;
        -webkit-user-drag: none;
        span{
            z-index:1;
            font-size: 25px;
            font-weight: 600;
            text-transform: capitalize;
            display: block;
        }
        .weather{
            justify-content: flex-end;
            align-items: flex-end;
            flex:1;
            z-index: 1;

            span{
                font-size:35px;
                margin-right: 8px;
            }

            img{
                height: 20px;
                width: auto;
                object-fit: contain;
            }
        }
        .weather--video{
            overflow: hidden;
            position: absolute;
            top:0;
            left: 0;
            height: 100%;
            width: 100%;

            video{
                height: 100%;
                @media only screen and (min-width: 1000px){
                    height: auto;
                    width:100%;
                }
            }
            .weather--bg--overlay{
                position: absolute;
                height:100%;
                width:100%;
                top:0;
                left:0;
                background-color: rgba(0,0,0,0.2);
            }
            .del--city{
                position: absolute;
                bottom: 0;
                left:0;
                padding: 6px;
                border-top-right-radius: 10px;
                font-size: 20px;
                background-color: rgb(77,77,77);
                border: 1px solid rgb(77,77,77);
                z-index: 1;
                cursor: pointer;
            }
        }
    }
</style>