<template>
  <div>
    <a-table bordered :data-source="dataSource" :columns="columns">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'status'">
          <div>
            {{ statusName[text] }}
          </div>
        </template>
        <template v-else-if="column.dataIndex !== 'operation'">
          <div>
            {{ text }}
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <a-popconfirm
            v-if="dataSource.length && record.status == 0"
            title="确认派发吗?"
            @confirm="onDispatch(record.id)"
          >
            <a>派发</a>
          </a-popconfirm>
          <a-popconfirm
            v-else-if="dataSource.length && record.status == 1"
            title="确认取消派发吗?"
            @confirm="onDispatch(record.id)"
          >
            <a>取消派发</a>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
    <div style="text-align: center">
      <a-spin tip="加载数据中..." size="large" v-if="loading"></a-spin>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  // import { CheckOutlined } from '@ant-design/icons-vue'
  import request from '@/utils/request'
  import { message, notification } from 'ant-design-vue'
  const columns = [
    {
      title: '用户名称',
      dataIndex: 'username',
    },
    {
      title: '服务类型',
      dataIndex: 'service',
    },
    {
      title: '服务内容',
      dataIndex: 'content',
    },
    {
      title: '服务地址',
      dataIndex: 'address',
    },
    {
      title: '目前状态',
      dataIndex: 'status',
    },
    {
      title: '评分',
      dataIndex: 'rate',
    },
    {
      title: '操作',
      dataIndex: 'operation',
    },
  ]
  let dataSource = ref()
  const loading = ref(true)
  const statusName = ref(['未处理', '处理中', '已处理', '已评价'])
  request({
    url: '/user/serviceall',
  }).then(
    (res) => {
      console.log(res)
      dataSource.value = res.servicelist
      loading.value = false
    },
    (rea) => {
      console.log(rea)
    }
  )
  const ws = new WebSocket('ws://101.34.19.31:7000/manage')
  ws.onopen = (e) => {
    console.info('ws open 连接成功', e)
    console.log(ws)
  }
  setInterval(() => {
    ws.send(
      JSON.stringify({
        event: 'getservicelist',
      })
    )
  }, 5000)
  ws.onmessage = (e) => {
    console.log(JSON.parse(e.data))
    const newList = JSON.parse(e.data).servicelist
    if (newList.length > dataSource.value.length) {
      notification.open({
        message: '您有新的服务预约请求,请及时查看!',
      })
    }
    dataSource.value = JSON.parse(e.data).servicelist
  }
  // const dataSource = ref([
  //   {
  //     key: '0',
  //     name: 'Edward King 0',
  //     age: 32,
  //     address: 'London, Park Lane no. 0',
  //   },
  //   {
  //     key: '1',
  //     name: 'Edward King 1',
  //     age: 32,
  //     address: 'London, Park Lane no. 1',
  //   },
  // ])
  // const count = computed(() => dataSource.value.length + 1)

  const onDispatch = (key) => {
    console.log(key)
    console.log(dataSource.value)
    const service = dataSource.value.find((item) => item.id === key)
    service.status = service.status == 1 ? 0 : 1
    request({
      url: '/user/dispatchService',
      method: 'patch',
      data: service,
    }).then(
      (res) => {
        Object.assign(
          dataSource.value.find((item) => item.id === key),
          service
        )
        console.log(res)
        if (service.status == 1) {
          message.success('派发成功!')
        } else {
          message.success('取消派发成功!')
        }
      },
      (rea) => {
        console.log(rea)
        message.error('请检查网络设置')
      }
    )
  }
</script>

<style scoped>
  .editable-row-operations a {
    margin-right: 8px;
  }
</style>
