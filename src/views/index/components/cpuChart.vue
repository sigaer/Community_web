<template>
  <div>
    <div id="chart"></div>
  </div>
</template>

<script>
  // import CountTo from "vue-count-to";
  import ApexCharts from 'apexcharts'
  export default {
    // components: {
    //   CountTo,
    // },
    data() {
      return {
        chart: undefined,
      }
    },
    props: {
      cpuUsage: Number,
    },
    watch: {
      cpuUsage: {
        handler() {
          this.renderView()
        },
      },
      immediate: true,
    },
    mounted() {
      this.renderView()
    },
    methods: {
      renderView() {
        console.log(this.cpuUsage)
        var opt = {
          chart: {
            height: 240,
            type: 'radialBar',
          },
          series: [this.cpuUsage ? this.cpuUsage : 0],
          colors: ['#20E647'],
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 0,
                size: '50%',
                background: '#293450',
              },

              dataLabels: {
                showOn: 'always',
                name: {
                  offsetY: -5,
                  show: true,
                  color: '#fff',
                  fontSize: '16px',
                },
                value: {
                  offsetY: 12,
                  color: '#fff',
                  fontSize: '24px',
                  show: true,
                },
              },
            },
          },
          // 填充track
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              type: 'vertical',
              gradientToColors: ['#87D4F9'],
              stops: [0, 100],
            },
          },
          stroke: {
            lineCap: 'round',
          },
          labels: ['CPU占用'],
        }
        if (this.chart) {
          this.chart.updateOptions(opt)
        } else {
          this.chart = new ApexCharts(document.querySelector('#chart'), opt)
          this.chart.render()
        }
      },
      handleSetLineChartData(type) {
        this.$emit('handleSetLineChartData', type)
      },
    },
  }
</script>
<style lang="scss" scoped></style>
