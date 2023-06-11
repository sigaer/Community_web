<template>
  <div>
    <div id="chart2"></div>
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
      disk: Object,
    },
    watch: {
      disk: {
        handler() {
          this.renderView()
        },
        // immediate: true,
        deep: true,
      },
    },
    mounted() {
      this.renderView()
    },
    methods: {
      renderView() {
        console.log(this.disk)
        var opt = {
          chart: {
            height: 240,
            type: 'radialBar',
          },
          series: [Math.round((this.disk.used * 100) / this.disk.total)],
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
          labels: ['磁盘占用'],
        }
        if (this.chart) {
          this.chart.updateOptions(opt)
        } else {
          this.chart = new ApexCharts(document.querySelector('#chart2'), opt)
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
