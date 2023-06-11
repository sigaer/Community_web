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
      timeArr: Array,
    },
    watch: {
      timeArr: {
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
        var opt = {
          chart: {
            type: 'bar',
          },
          plotOptions: {
            bar: {
              horizontal: true,
              borderRadius: 4,
            },
          },
          series: [
            {
              data: this.timeArr,
            },
          ],
          title: {
            text: '服务时间分布',
          },
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
