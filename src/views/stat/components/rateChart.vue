<template>
  <div>
    <div id="chart3"></div>
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
      rateArr: Array,
    },
    watch: {
      rateArr: {
        handler() {
          this.renderView()
        },
        deep: true,
      },
    },
    mounted() {
      this.renderView()
    },
    methods: {
      renderView() {
        console.log(this.rateArr)
        var opt = {
          series: [
            {
              name: '平均评价',
              data: this.rateArr,
            },
          ],
          chart: {
            height: 400,
            type: 'bar',
            width: 600,
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: {
                position: 'top', // top, center, bottom
              },
            },
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val
            },
            offsetY: -20,
            style: {
              fontSize: '12px',
              colors: ['#304758'],
            },
          },

          xaxis: {
            categories: [
              '餐饮',
              '看护',
              '日常家务',
              '代办',
              '装修',
              '康复护理',
              '体检',
              '疫苗接种',
              '心理咨询',
              '精神支持',
            ],
            position: 'top',
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            crosshairs: {
              fill: {
                type: 'gradient',
                gradient: {
                  colorFrom: '#D8E3F0',
                  colorTo: '#BED1E6',
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5,
                },
              },
            },
            tooltip: {
              enabled: true,
            },
          },
          yaxis: {
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            labels: {
              show: false,
              formatter: function (val) {
                return val
              },
            },
          },
          title: {
            text: '服务平均得分表',
            floating: true,
            offsetY: 380,
            align: 'center',
            style: {
              color: '#444',
            },
          },
        }
        if (this.chart) {
          this.chart.updateOptions(opt)
        } else {
          this.chart = new ApexCharts(document.querySelector('#chart3'), opt)
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
