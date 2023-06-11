<template>
  <div class="vab-avatar">
    <a-modal v-model:visible="visible" title="修改密码">
      <template #footer>
        <a-button key="back" @click="handleCancel">返回</a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="handleSubmit"
          :disabled="form.password.length < 6"
        >
          提交
        </a-button>
      </template>
      <a-form :model="form">
        <a-form-item name="password">
          <a-input
            v-model:value="form.password"
            placeholder="请输入密码"
          ></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-dropdown>
      <span class="ant-dropdown-link">
        <a-avatar :src="avatar" />
        {{ username }}
        <DownOutlined />
      </span>
      <template v-slot:overlay>
        <a-menu>
          <a-menu-item @click="showModal">修改密码</a-menu-item>
          <a-menu-item @click="logout">退出登录</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
  import { recordRoute } from '@/config'
  import { DownOutlined } from '@ant-design/icons-vue'

  import { useStore } from 'vuex'
  import { computed, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { message } from 'ant-design-vue'
  import request from '@/utils/request'
  export default {
    name: 'VabAvatar',
    components: { DownOutlined },
    setup() {
      const store = useStore()
      const router = useRouter()
      const route = useRoute()

      const logout = async () => {
        await store.dispatch('user/logout')
        if (recordRoute) {
          const fullPath = route.fullPath
          router.push(`/login?redirect=${fullPath}`)
        } else {
          router.push('/login')
        }
      }
      const loading = ref(false)
      const visible = ref(false)
      const form = ref({
        password: '',
      })
      const showModal = () => {
        visible.value = true
      }
      const handleSubmit = () => {
        const openid = localStorage.getItem('openid')
        loading.value = true
        request({
          url: '/user/changepwd',
          method: 'post',
          data: {
            openid,
            password: form.value.password,
          },
        }).then(
          () => {
            loading.value = false
            visible.value = false
            message.success('修改密码成功！')
          },
          (rea) => {
            console.log(rea)
          }
        )
      }
      const handleCancel = () => {
        visible.value = false
      }
      return {
        avatar: computed(() => store.getters['user/avatar']),
        username: computed(() => store.getters['user/username']),
        route: computed(() => store.getters['routes/routes']),
        logout,
        showModal,
        handleSubmit,
        handleCancel,
        visible,
        loading,
        form,
      }
    },
  }
</script>
<style lang="less">
  .vab-avatar {
    .ant-dropdown-link {
      display: block;
      min-height: 64px;
      cursor: pointer;
    }
  }
</style>
