<template>
  <div>
    <a-descriptions title="个人信息" bordered>
      <a-descriptions-item label="昵称">
        {{ info.username }}
      </a-descriptions-item>
      <a-descriptions-item label="性别">
        {{ info.gender == 1 ? '男' : '女' }}
      </a-descriptions-item>
      <a-descriptions-item label="年龄">{{ info.age }}</a-descriptions-item>
      <a-descriptions-item label="联系方式">
        {{ info.phone }}
      </a-descriptions-item>
      <a-descriptions-item label="注册时间" :span="2">
        {{ info.regiTime }}
      </a-descriptions-item>
      <a-descriptions-item label="家庭地址" :span="3">
        {{ info.address }}
        <!-- <a-badge status="processing" text="Running" /> -->
        <!-- {{ address }} -->
      </a-descriptions-item>
      <!-- <a-descriptions-item label="Negotiated Amount">
        $80.00
      </a-descriptions-item> -->
    </a-descriptions>
  </div>
</template>
<script setup>
  import { ref } from 'vue'
  const t = localStorage.getItem('userInfo')
  console.log(t)
  let info = ref()
  info.value = JSON.parse(localStorage.getItem('userInfo'))
</script>
<style scoped></style>
