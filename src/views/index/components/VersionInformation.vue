<template>
  <a-alert
    message="欢迎来到养老服务后台管理系统，目前系统状态良好！"
    type="success"
    show-icon
  />
  <a-card class="version-information">
    <template v-slot:title>系统运行状态</template>
    <template v-slot:extra>
      <a href="#">部署时间{{ updateTime }}</a>
    </template>
    <div class="chartWrapper">
      <cpu-chart :cpuUsage="statusInfo.cpuUsage" />
      <disk-chart :disk="statusInfo.disk" />
      <memory-chart :memory="statusInfo.memory" />
    </div>
  </a-card>
</template>
<script>
  import { dependencies, devDependencies } from '*/package.json'
  import cpuChart from './cpuChart'
  import diskChart from './diskChart'
  import memoryChart from './memoryChart'
  // import request from '@/utils/request'
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
      }
    },
    components: {
      // PanelGroup,
      // ProfitChart,
      // SalesChart,
      memoryChart,
      diskChart,
      cpuChart,
      // BarChart,
      // TransactionTable,
      // TodoList,
      // BoxCard,
    },
    created() {
      console.log(1111)
      const ws = new WebSocket('ws://101.34.19.31:5000/system')
      ws.onopen = (e) => {
        console.info('ws open 连接成功', e)
        this.socketOpen = true
        console.log(ws)
        ws.send(
          JSON.stringify({
            event: 'getstatus',
          })
        )
      }
      setInterval(() => {
        ws.send(
          JSON.stringify({
            event: 'getstatus',
          })
        )
        console.log('send request')
      }, 5000)
      ws.onmessage = (e) => {
        console.log(e.data)
        this.statusInfo = JSON.parse(e.data)
      }
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
    flex: 1;
    flex-wrap: nowrap;
  }
</style>
