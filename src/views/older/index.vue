<template>
  <div>
    <a-button
      class="editable-add-btn"
      style="margin-bottom: 8px"
      @click="handleAdd"
    >
      发布公告
    </a-button>
    <a-modal
      v-model:visible="visible"
      title="发布公告"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
    >
      <a-form :model="form" @submit="handleSubmit" @submit.prevent>
        <a-form-item name="title">
          <a-input
            v-model:value="form.title"
            placeholder="请输入公告标题"
          ></a-input>
        </a-form-item>
        <a-form-item name="content">
          <a-textarea
            v-model:value="form.content"
            placeholder="请输入公告内容"
          ></a-textarea>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :disabled="form.title === '' || form.content === ''"
          >
            发布公告
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-table bordered :data-source="dataSource" :columns="columns">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'gender'">
          <div>
            <a-input
              v-if="editableData[record.key]"
              v-model:value="editableData[record.key][column.dataIndex]"
              style="margin: -5px 0"
            />
            <template v-else>
              {{ text == 1 ? '男' : '女' }}
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex !== 'operation'">
          <div>
            <a-input
              v-if="editableData[record.key]"
              v-model:value="editableData[record.key][column.dataIndex]"
              style="margin: -5px 0"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
      </template>
    </a-table>
    <div style="text-align: center">
      <a-spin tip="加载数据中..." size="large" v-if="loading"></a-spin>
    </div>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue'
  // import { CheckOutlined } from '@ant-design/icons-vue'
  // import { cloneDeep } from 'lodash-es'
  // import { v4 } from 'uuid'
  import request from '@/utils/request'
  import { message } from 'ant-design-vue'
  // import { message } from 'ant-design-vue'
  console.log(111)
  const columns = [
    {
      title: '昵称',
      dataIndex: 'username',
    },
    {
      title: '性别',
      dataIndex: 'gender',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
    },
    {
      title: '联系地址',
      dataIndex: 'address',
      width: '30%',
    },
    {
      title: '紧急联系人手机号码',
      dataIndex: 'urgent',
    },
    // {
    //   title: '操作',
    //   dataIndex: 'operation',
    //   width: '10%',
    // },
  ]
  const dataSource = ref()
  const loading = ref(true)
  const visible = ref(false)
  request({
    url: '/user/wxlist',
  }).then(
    (res) => {
      console.log(res)
      dataSource.value = res.wxlist
      loading.value = false
    },
    (rea) => {
      console.log(rea)
    }
  )
  const form = ref({
    title: '',
    content: '',
  })
  // const count = computed(() => dataSource.value.length + 1)
  const editableData = reactive({})
  const handleAdd = () => {
    visible.value = true
  }
  const handleSubmit = () => {
    request({
      url: '/anno',
      method: 'post',
      data: {
        ...form.value,
        time: new Date().toLocaleString('chinese', { hour12: false }),
      },
    }).then(
      (res) => {
        console.log(res)
        message.success('发布成功!')
      },
      (rea) => {
        console.log(rea)
      }
    )
  }
  const confirmLoading = ref(false)
  const handleOk = () => {
    confirmLoading.value = true
    setTimeout(() => {
      visible.value = false
      confirmLoading.value = false
    }, 2000)
  }
</script>

<style scoped>
  .editable-row-operations a {
    margin-right: 8px;
  }
</style>
