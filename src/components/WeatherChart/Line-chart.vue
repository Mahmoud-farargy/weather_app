<script>
import { Line } from 'vue-chartjs'
 
export default {
  data(){
    return {
       options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
           fontColor: this.isDay ? "#e4e4e4" :'#d6d6d6',
           labels: {
                  fontColor: this.isDay ? "#e4e4e4" :'#fff'
               }
            
        },
        title: {
            fontColor: this.isDay? "#e4e4e4" : '#fff',
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
  props: ["chartData", "isDay"],
  extends: Line,
  watch: {
    chartData(val) {
          this.renderChart({
          labels: val?.labels,
          datasets: val?.sets
        }, this.options);
      },
  }
}
</script>

<style lang="scss" scoped>

</style>