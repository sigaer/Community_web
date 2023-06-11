<template>
  <div>
    <a-table bordered :data-source="dataSource" :columns="columns">
      <template #bodyCell="{ text }">
        <div>
          {{ text }}
        </div>
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
  import { message } from 'ant-design-vue'
  const columns = [
    {
      title: '反馈内容',
      dataIndex: 'content',
    },
  ]
  let dataSource = ref()
  const loading = ref(true)
  request({
    url: '/complain',
  }).then(
    (res) => {
      let complain = res.clist
      dataSource.value = complain
      loading.value = false
    },
    (rea) => {
      console.log(rea)
      message.error('请检查网络设置')
    }
  )
</script>

<style scoped>
  .editable-row-operations a {
    margin-right: 8px;
  }
</style>
