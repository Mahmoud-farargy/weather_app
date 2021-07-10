<template>
    <div class="container">
        <LineChart :chartData="chartData" :currentCity="currentCity" :getDegree="getDegree" :isDay="isDay" />  
    </div>
</template>

<script>
import LineChart from "./Line-chart";
export default {
    props:[
        "currentCity",
        "getDegree",
        "isDay"
    ],
    computed: {
        chartData() {
            console.log("hourly chart",this.currentCity);
            return (this.currentCity && this.currentCity?.hourly?.length > 0) ?
            this.currentCity?.hourly.slice(1,24).map(el => {
                return {
                    labels: `${new Date(el.dt * 1000).toLocaleString('en-us', {weekday: "short"})} ${new Date(el.dt * 1000).toLocaleString('en-us', {hour: "numeric"})}`,
                    temps: this.getDegree(el.temp),
                    feelsLike: this.getDegree(el.feels_like),
                    wind: el.wind_speed,
                }
            })
            : [];
        }
    },
    components: {
        LineChart
    }
}
</script>
<style lang="scss" scoped>
    .container{
        padding: 30px 0;
    }
</style>