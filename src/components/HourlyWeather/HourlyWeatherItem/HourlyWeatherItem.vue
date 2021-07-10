<template>
    <div id="hourlyWeatherItem">
        <div class="hourly--item--inner flex-column">
            <span>{{ formattedTime }}</span>
             <span>{{ formattedByDay }}</span>
            <span>
                <img :src="require(`../../../../public/conditions/${timeItem.weather[0].icon}.svg`)" :alt="formattedTime + 'weather'"/>
            </span>
            <span v-if=" timeItem.temp">
                {{timeItem &&  getDegree(timeItem.temp)}}&deg;
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        "timeItem",
        "getDegree"
    ],
    computed: {
        formattedTime() {
            return (this.timeItem && this.timeItem.dt) && new Date(this.timeItem.dt * 1000).toLocaleString('en-us', {hour: "numeric"});
        },
        formattedByDay(){
            return (this.timeItem && this.timeItem.dt) && new Date(this.timeItem.dt * 1000).toLocaleString('en-us', {weekday: "short"});
        }
    }
}
</script>

<style lang="scss" scoped>
 #hourlyWeatherItem{
     width:100%;
     height: 100%;
     .hourly--item--inner{
         color: var(--white);
         text-align: center;
         min-width: 45px;
         margin-right: 30px;
         justify-content: center;
         span{
             margin-bottom: 4px;
             &:last-of-type{
                 margin-bottom: 0;
             }
             &:nth-child(1){
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