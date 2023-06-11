<template>
  <div>
    <a-descriptions title="机构信息" bordered>
      <a-descriptions-item label="机构名称">
        <span v-if="change == false">{{ info.username }}</span>
        <a-input
          v-model:value="form.username"
          placeholder="请填写名称"
          v-else
        ></a-input>
      </a-descriptions-item>
      <a-descriptions-item label="联系方式" :span="2">
        <span v-if="change == false">{{ info.phone }}</span>
        <a-input
          v-model:value="form.phone"
          placeholder="请填写联系方式"
          v-else
        ></a-input>
      </a-descriptions-item>
      <a-descriptions-item label="注册时间" :span="3">
        {{ info.regiTime }}
      </a-descriptions-item>
      <a-descriptions-item label="地址" :span="3">
        <span v-if="change == false">{{ info.address }}</span>
        <a-input
          v-model:value="form.address"
          placeholder="请填写联系地址"
          v-else
        ></a-input>
      </a-descriptions-item>
    </a-descriptions>
    <a-button
      style="margin-top: 16px"
      @click="changeInfo"
      type="primary"
      v-if="change == false"
    >
      修改信息
    </a-button>
    <div v-else>
      <a-button style="margin-top: 16px" @click="confirm" type="primary">
        确认修改
      </a-button>
      <a-button
        style="margin-top: 16px; margin-left: 16px"
        @click="cancel"
        type="primary"
      >
        取消
      </a-button>
    </div>
  </div>
</template>
<script setup>
  import { message } from 'ant-design-vue'
  import { ref } from 'vue'
  import request from '@/utils/request'
  const t = localStorage.getItem('userInfo')
  const form = ref({})
  let info = ref()
  const change = ref(false)
  const changeInfo = () => {
    change.value = true
  }
  const confirm = () => {
    form.value['openid'] = localStorage.getItem('openid')
    request({
      url: '/user/updateinfo',
      method: 'post',
      data: {
        openid: localStorage.getItem('openid'),
        type: 'all',
        content: JSON.stringify(form.value),
      },
    }).then(
      (res) => {
        console.log(res)
        message.success('修改信息成功!')
        change.value = false
        info.value = form.value
      },
      (rea) => {
        console.log(rea)
        message.error('请检查网络设置')
      }
    )
    change.value = true
  }
  const cancel = () => {
    change.value = false
  }
  info.value = JSON.parse(t)
  form.value = JSON.parse(t)
</script>
<style scoped></style>
