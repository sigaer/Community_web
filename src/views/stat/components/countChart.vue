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
      count: Array,
    },
    watch: {
      count: {
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
            type: 'donut',
          },
          series: this.count,
          // colors: ['#20E647'],
          plotOptions: {
            pie: {
              donut: {
                size: '70%',
                labels: {
                  show: true,
                  total: {
                    show: true,
                    label: '总服务次数',
                  },
                },
              },
              // hollow: {
              //   margin: 0,
              //   size: '50%',
              //   background: '#293450',
              // },

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
          labels: ['家政服务', '健康服务', '心理支持'],
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
