<template>
  <div>
    <a-button
      class="editable-add-btn"
      style="margin-bottom: 8px"
      @click="handleAdd"
    >
      添加信息
    </a-button>
    <a-table bordered :data-source="dataSource" :columns="columns">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex !== 'operation'">
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
        <template v-else-if="column.dataIndex === 'operation'">
          <a-popconfirm
            v-if="dataSource.length"
            title="确认删除吗?"
            @confirm="onDelete(record.key)"
          >
            <a>删除</a>
          </a-popconfirm>
          <div class="editable-row-operations">
            <span v-if="editableData[record.key]">
              <a-typography-link @click="save(record.key)">
                保存
              </a-typography-link>
              <a-popconfirm title="确认取消吗?" @confirm="cancel(record.key)">
                <a>取消</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="edit(record.key)">编辑</a>
            </span>
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
  import request from '@/utils/request'
  // import { CheckOutlined } from '@ant-design/icons-vue'
  import { cloneDeep } from 'lodash-es'
  import { message } from 'ant-design-vue'
  import { v4 } from 'uuid'
  const columns = [
    {
      title: '名称',
      dataIndex: 'username',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
    },
    {
      title: '地址',
      dataIndex: 'address',
      width: '30%',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '10%',
    },
  ]
  const loading = ref(true)
  const dataSource = ref()
  request({
    url: '/user/agencylist',
  }).then(
    (res) => {
      console.log(res)
      dataSource.value = res.agencylist
      loading.value = false
    },
    (rea) => {
      console.log(rea)
    }
  )
  const editableData = reactive({})

  const edit = (key) => {
    editableData[key] = cloneDeep(
      dataSource.value.filter((item) => key === item.key)[0]
    )
  }
  const cancel = (key) => {
    delete editableData[key]
  }
  const save = (key) => {
    if (!editableData[key]['username']) {
      message.warning('请输入名称/姓名')
      return
    }
    Object.assign(
      dataSource.value.filter((item) => key === item.openid)[0],
      editableData[key]
    )
    if (editableData[key]['newFlag']) {
      request({
        url: '/user/register',
        method: 'post',
        data: { password: '123456', role: '服务商', ...editableData[key] },
      }).then(
        (res) => {
          console.log(res)
          message.success('新增用户成功!')
        },
        (rea) => {
          console.log(rea)
          message.error('请检查网络设置')
        }
      )
    } else {
      request({
        url: '/user/updateinfo',
        method: 'post',
        data: {
          openid: editableData[key]['openid'],
          type: 'all',
          content: JSON.stringify(editableData[key]),
        },
      }).then(
        (res) => {
          console.log(res)
          message.success('修改用户成功!')
        },
        (rea) => {
          console.log(rea)
          message.error('请检查网络设置')
        }
      )
    }
    delete editableData[key]
  }

  const onDelete = (key) => {
    console.log(key)
    console.log(dataSource.value)
    request({
      url: '/user/remove',
      method: 'post',
      data: {
        openid: key,
      },
    }).then(
      (res) => {
        dataSource.value = dataSource.value.filter(
          (item) => item.openid !== key
        )
        console.log(res)
        message.success('删除用户成功!')
      },
      (rea) => {
        console.log(rea)
        message.error('请检查网络设置')
      }
    )
  }
  const handleAdd = () => {
    const newOpenid = v4()
    const newData = {
      openid: `${newOpenid}`,
      newFlag: true,
    }
    dataSource.value.push(newData)
    edit(`${newOpenid}`)
  }
</script>

<style scoped>
  .editable-row-operations a {
    margin-right: 8px;
  }
</style>
