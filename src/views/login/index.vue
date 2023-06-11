<template>
  <div class="login-container">
    <a-row>
      <a-col :xs="0" :md="0" :sm="12" :lg="14" :xl="16"></a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="10" :xl="6">
        <div class="login-container-form">
          <!-- <div class="login-container-hello">hello!</div> -->
          <div class="login-container-title">{{ title }}</div>
          <!-- <div class="login-container-title">{{ route.pop() }}</div> -->
          <!-- <div class="navBar">
            <a-menu v-model:selectedKeys="current" mode="horizontal">
              <a-menu-item key="login">
                <template #icon>
                  <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
                登录
              </a-menu-item>
              <a-menu-item key="register">
                <template #icon>
                  <UserAddOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
                注册
              </a-menu-item>
            </a-menu>
          </div> -->
          <div v-if="current == 'login'" style="margin-top: 60px">
            <a-form
              ref="form"
              :model="form"
              @submit="handleSubmit"
              @submit.prevent
              :rules="rules"
            >
              <a-form-item name="username">
                <a-input v-model:value="form.username" placeholder="Username">
                  <template v-slot:prefix>
                    <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item name="password">
                <a-input
                  v-model:value="form.password"
                  type="password"
                  placeholder="Password"
                >
                  <template v-slot:prefix>
                    <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-button
                  type="primary"
                  html-type="submit"
                  :disabled="form.username === '' || form.password === ''"
                >
                  登录
                </a-button>
              </a-form-item>
            </a-form>
          </div>
          <!-- <div v-else>
            <a-form
              ref="rForm"
              :model="registerForm"
              @submit="handleRegister"
              @submit.prevent
              :rules="rulesR"
            >
              <a-form-item name="username">
                <a-input
                  v-model:value="registerForm.username"
                  placeholder="Username"
                >
                  <template v-slot:prefix>
                    <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item name="password">
                <a-input
                  v-model:value="registerForm.password"
                  type="password"
                  placeholder="Password"
                >
                  <template v-slot:prefix>
                    <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-button
                  type="primary"
                  html-type="submit"
                  :disabled="
                    registerForm.username === '' || registerForm.password === ''
                  "
                >
                  注册
                </a-button>
              </a-form-item>
            </a-form>
          </div> -->
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
  import { dependencies, devDependencies } from '*/package.json'
  import { mapActions, mapGetters } from 'vuex'
  // import { resetRouter } from '@/router'
  import {
    UserOutlined,
    LockOutlined,
    // UserAddOutlined,
  } from '@ant-design/icons-vue'
  import { register } from '../../api/user'
  import { message } from 'ant-design-vue'
  export default {
    name: 'Login',
    components: {
      UserOutlined,
      LockOutlined,
      // UserAddOutlined,
    },
    data() {
      return {
        form: {
          username: '',
          password: '',
        },
        registerForm: {
          username: '',
          password: '',
        },
        current: ['login'],
        redirect: undefined,
        dependencies: dependencies,
        devDependencies: devDependencies,
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        },
        rulesR: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {
              min: 6,
              message: '密码长度不能小于6位',
              trigger: 'blur',
            },
          ],
        },
      }
    },
    computed: {
      ...mapGetters({
        logo: 'settings/logo',
        title: 'settings/title',
        // route: 'routes/routes',
      }),
    },
    watch: {
      $route: {
        handler(route) {
          this.redirect = (route.query && route.query.redirect) || '/'
        },
        immediate: true,
      },
    },
    mounted() {
      this.form.username = 'admin'
      this.form.password = '123456'
      // resetRouter()
      // this.resetRoutes([])
      /*  setTimeout(() => {
    this.handleSubmit()
  }, 3000) */
    },
    methods: {
      ...mapActions({
        login: 'user/login',
      }),
      // ...mapMutations({
      //   resetRoutes: 'routes/setRoutes',
      // }),
      handleRoute() {
        console.log(this.redirect)
        return this.redirect === '/404' || this.redirect === '/403'
          ? '/'
          : this.redirect
      },
      async handleSubmit() {
        try {
          await this.login(this.form)
        } catch (e) {
          message.error('请检查网络设置。')
        }
        this.$router.push(this.handleRoute())
      },
      async handleRegister() {
        this.$refs.rForm
          .validate()
          .then(() => {})
          .catch((res) => {
            console.log(res)
            console.log(this.current)
            if (res.errorFields.length === 0) {
              register(this.registerForm).then(
                (r) => {
                  console.log(r)
                  message.success('注册成功！')
                  this.current.splice(0, 1, 'login')
                },
                (e) => {
                  if (e.code === 403) {
                    message.error('用户名已被使用！')
                  } else {
                    message.error('用户名或密码不能为空！')
                  }
                }
              )
            }
          })
        // message.success('注册成功！')
        // await this.$router.push(this.handleRoute())
      },
    },
  }
</script>
<style lang="less">
  .login-container {
    width: 100%;
    height: 100vh;
    background: url('~@/assets/login_images/login_background.png');
    background-size: cover;

    &-form {
      width: calc(100% - 40px);
      height: 380px;
      padding: 4vh;
      margin-top: calc((90vh - 380px) / 2);
      margin-right: 20px;
      margin-left: 20px;
      background: url('~@/assets/login_images/login_form.png');
      background-size: 100% 100%;
      border-radius: 10px;
      box-shadow: 0 2px 8px 0 rgba(7, 17, 27, 0.06);
    }

    &-hello {
      font-size: 32px;
      color: #fff;
    }

    &-title {
      margin-bottom: 10px;
      font-size: 20px;
      color: #fff;
      text-align: center;
    }

    &-tips {
      position: fixed;
      bottom: @vab-margin;
      width: 100%;
      height: 40px;
      color: rgba(255, 255, 255, 0.856);
      text-align: center;
    }

    .ant-col {
      width: 100%;
      padding: 0 10px 0 10px;
    }

    .ant-input {
      height: 35px;
    }

    .ant-btn {
      width: 100%;
      height: 45px;
      border-radius: 99px;
    }
  }

  .navBar {
    display: flex;
    justify-content: space-evenly;
  }

  .ant-menu {
    width: calc(100% - 20px);
    justify-content: space-evenly;
    border-radius: 10px;
    margin-bottom: 20px;
  }

  .ant-menu::before {
    display: none;
  }
</style>
