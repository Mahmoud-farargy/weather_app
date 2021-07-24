<template>
    <div class="container">
        <LineChart :chartData="chartData" :currentCity="currentCity" :getDegree="getDegree" :isDay="isDay" />  
    </div>
</template>

<script>
import LineChart from "./Line-chart";
export default {
    props:{
        chartData: Object,
        currentCity: Object,
        getDegree: Function,
        isDay: Boolean
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