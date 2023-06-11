<template>
  <a-alert
    message="以下是所有已完成服务的信息图表，供您分析。"
    type="info"
    show-icon
  />
  <a-card class="version-information">
    <template v-slot:title>服务信息</template>
    <div style="text-align: center">
      <a-spin tip="加载数据中..." size="large" v-if="loading"></a-spin>
    </div>
    <div class="chartWrapper" v-if="loading == false">
      <div>
        <count-chart :count="count" />
        <div style="width: 1px; height: 50px"></div>
        <time-chart :timeArr="timeArr" />
      </div>
      <rate-chart :rateArr="rateArr" />
    </div>
  </a-card>
</template>
<script>
  import { dependencies, devDependencies } from '*/package.json'
  import countChart from './countChart'
  import timeChart from './timeChart'
  import rateChart from './rateChart'
  import request from '@/utils/request'
  export default {
    data() {
      return {
        updateTime: process.env.VUE_APP_UPDATE_TIME,
        dependencies: dependencies,
        devDependencies: devDependencies,
        socketOpen: false,
        statusInfo: {
          memory: {
            totalMemory: 1,
            freeMemory: 1,
          },
          cpuUsage: 0,
          disk: {
            used: 0,
            total: 1,
          },
        },
        count: [0, 0, 0],
        loading: true,
        timeArr: [0, 0, 0, 0],
        rateArr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      }
    },
    components: {
      timeChart,
      rateChart,
      countChart,
    },
    created() {
      console.log(1111)
      request({
        url: '/user/serviceall',
      }).then(
        (res) => {
          console.log(res)
          console.log(res.servicelist)
          const countArr = [0, 0, 0]
          let time = [
            { x: '上午', y: 0 },
            { x: '中午', y: 0 },
            { x: '下午', y: 0 },
            { x: '晚上', y: 0 },
          ]
          res.servicelist.forEach((v) => {
            if (v.service.startsWith('家政')) {
              countArr[0]++
            } else if (v.service.startsWith('健康')) {
              countArr[1]++
            } else {
              countArr[2]++
            }
            const ts = parseInt(v.reserveTime.split(' ')[1].split(':')[0])
            if (ts < 11) {
              time[0].y++
            } else if (ts < 14) {
              time[1].y++
            } else if (ts < 18) {
              time[2].y++
            } else {
              time[3].y++
            }
          })
          let rateArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          const tmpArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          const nameToIndexMap = new Map()
          nameToIndexMap.set('餐饮服务', 0)
          nameToIndexMap.set('看护服务', 1)
          nameToIndexMap.set('日常家务', 2)
          nameToIndexMap.set('代办服务', 3)
          nameToIndexMap.set('装修服务', 4)
          nameToIndexMap.set('康复护理服务', 5)
          nameToIndexMap.set('体检服务', 6)
          nameToIndexMap.set('疫苗接种服务', 7)
          nameToIndexMap.set('心理咨询服务', 8)
          nameToIndexMap.set('精神支持服务', 9)
          const ratedServiceList = res.servicelist.filter((v) => v.rate)
          console.log(ratedServiceList)
          ratedServiceList.forEach((v) => {
            tmpArr[nameToIndexMap.get(v.service.split(' ')[1])]++
            rateArr[nameToIndexMap.get(v.service.split(' ')[1])] += parseInt(
              v.rate
            )
          })
          rateArr = rateArr.map((v, i) => {
            if (v === 0) {
              return 0
            } else {
              return (v / tmpArr[i]).toFixed(1)
            }
          })
          console.log(countArr)
          this.count = countArr
          this.timeArr = time
          this.rateArr = rateArr
          this.loading = false
        },
        (rea) => {
          console.log(rea)
        }
      )
      // request({

      // })
    },
  }
</script>
<style lang="less" scoped>
  .version-information {
    margin-top: @vab-margin;
    &-table {
      width: 100%;
      overflow: scroll;
      table {
        width: 100%;
        color: #666;
        border-collapse: collapse;
        background-color: #fff;

        td {
          position: relative;
          padding: 9px 15px;
          font-size: 14px;
          line-height: 20px;
          border: 1px solid #e6e6e6;

          &:nth-child(odd) {
            width: 20%;
            text-align: right;
            background-color: #f7f7f7;
          }
        }
      }
    }
  }
  .chartWrapper {
    display: flex;
    justify-content: space-around;
  }
</style>
