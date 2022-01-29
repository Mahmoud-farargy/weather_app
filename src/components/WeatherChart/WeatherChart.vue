<template>
    <div class="container">
        <LineChart :chartData="chartData" :isDay="isDay" />  
    </div>
</template>

<script>
import LineChart from "./Line-chart";
export default {
    props:{
        chartData: Object,
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