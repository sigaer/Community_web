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
              v-if="editableData[record.openid] && column.dataIndex !== 'role'"
              v-model:value="editableData[record.openid][column.dataIndex]"
              style="margin: -5px 0"
            />
            <a-radio-group
              v-else-if="
                editableData[record.openid] && column.dataIndex === 'role'
              "
              v-model:value="editableData[record.openid][column.dataIndex]"
              name="radioGroup"
            >
              <a-radio value="管理员">管理员</a-radio>
              <a-radio value="服务机构">服务机构</a-radio>
            </a-radio-group>
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <a-popconfirm
            v-if="dataSource.length"
            title="确认删除吗?"
            @confirm="onDelete(record.openid)"
          >
            <a>删除</a>
          </a-popconfirm>
          <div class="editable-row-operations">
            <span v-if="editableData[record.openid]">
              <a-typography-link @click="save(record.openid)">
                保存
              </a-typography-link>
              <a-popconfirm
                title="确认取消吗?"
                @confirm="cancel(record.openid)"
              >
                <a>取消</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="edit(record.openid)">编辑</a>
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
  import { v4 } from 'uuid'
  // import { CheckOutlined } from '@ant-design/icons-vue'
  import { cloneDeep } from 'lodash-es'
  import request from '@/utils/request'
  import { message } from 'ant-design-vue'
  const columns = [
    {
      title: '姓名/名称',
      dataIndex: 'username',
      width: '30%',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      width: '30%',
    },
    {
      title: '权限',
      dataIndex: 'role',
      width: '30%',
    },
    {
      title: '操作',
      dataIndex: 'operation',
    },
  ]
  const loading = ref(true)
  let dataSource = ref()
  request({
    url: '/user/list',
  }).then(
    (res) => {
      console.log(res)
      dataSource.value = res.userlist
      loading.value = false
    },
    (rea) => {
      console.log(rea)
    }
  )
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
  const editableData = reactive({})

  const edit = (key) => {
    console.log(key)
    editableData[key] = cloneDeep(
      dataSource.value.filter((item) => key === item.openid)[0]
    )
  }
  const cancel = (key) => {
    if (editableData[key]['newFlag']) {
      dataSource.value.pop()
    }
    delete editableData[key]
  }
  const save = (key) => {
    if (!editableData[key]['username']) {
      message.warning('请输入名称/姓名')
      return
    } else if (!editableData[key]['role']) {
      message.warning('请选择用户权限')
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
        data: {
          password: '123456',
          ...editableData[key],
          regiTime: new Date().toLocaleString('chinese', { hour12: false }),
        },
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
