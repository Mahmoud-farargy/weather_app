<script>
import { Line } from 'vue-chartjs'
 
export default {
  data(){
    return {
       options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
           fontColor: this.isDay ? "#e4e4e4" :'#d6d6d6'
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: this.isDay? "#e4e4e4" : '#d6d6d6'
            },
          }],
          xAxes: [{
            ticks: {
              fontColor: this.isDay?  "#e4e4e4" : '#d6d6d6'
            },
          }]
        }
      }
    }
  },
  props: ["chartData", "currentCity", "isDay"],
  extends: Line,
  watch: {
    chartData() {
          this.renderChart({
          labels: this.chartData.map(el => el.labels),
          datasets: [
            {
              label: 'Temperature',
              backgroundColor: this.isDay? "#cecece" :"#27699b",
              data: this.chartData.map(el => el.temps)
            },
            {
              label: 'Feels like',
              backgroundColor:"#1d4da7",
              data: this.chartData.map(el => el.feelsLike)
            }
          ]
        }, this.options);
      },
  },
}
</script>

<style lang="scss" scoped>

</style>