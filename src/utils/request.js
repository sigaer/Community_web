import axios from 'axios'
import {
  baseURL,
  contentType,
  debounce,
  requestTimeout,
  successCode,
  // tokenName,
} from '@/config'
import store from '@/store'
import qs from 'qs'
import router from '@/router'
import { isArray } from '@/utils/validate'
import { message } from 'ant-design-vue'

let loadingInstance

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 处理code异常
 * @param {*} code
 * @param {*} msg
 */
const handleCode = (code, msg) => {
  switch (code) {
    case 401:
      message.error(msg || '登录失效')
      store.dispatch('user/resetAll').catch(() => {})
      break
    case 403:
      message.error('')
      router
        .push({
          path: '/403',
        })
        .catch(() => {})
      break
    default:
      message.error(msg || `后端接口${code}异常`)
      break
  }
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description axios初始化
 */
const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType,
  },
})

/**
 * @author chuzhixin 1204505056@qq.com
 * @description axios请求拦截器
 */
instance.interceptors.request.use(
  (config) => {
    console.log(config)
    if (config.url === '/icon/getList') {
      config.baseURL = 'mock-server'
    }
    if (store.getters['user/accessToken'])
      config.headers['authorization'] = store.getters['user/accessToken']
    if (
      config.data &&
      config.headers['Content-Type'] ===
        'application/x-www-form-urlencoded;charset=UTF-8'
    )
      config.data = qs.stringify(config.data)
    if (debounce.some((item) => config.url.includes(item))) {
      //这里写加载动画
    }
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

/**
 * @author chuzhixin 1204505056@qq.com
 * @description axios响应拦截器
 */
instance.interceptors.response.use(
  (response) => {
    console.log(response)
    if (loadingInstance) loadingInstance.close()
    const { data, config } = response
    console.log(response)
    const { code, msg } = data
    // 操作正常Code数组
    const codeVerificationArray = isArray(successCode)
      ? [...successCode]
      : [...[successCode]]
    // 是否操作正常
    if (codeVerificationArray.includes(code)) {
      // return Promise.resolve(data)
      return data
    } else {
      handleCode(code, msg)
      return Promise.reject(
        {
          url: config.url,
          code,
          msg,
        } || 'Error'
      )
      // return Promise.reject(
      //   'vue-admin-beautiful请求异常拦截:' +
      //   JSON.stringify({
      //     url: config.url,
      //     code,
      //     msg
      //   }) || 'Error'
      // )
    }
  },
  (error) => {
    if (loadingInstance) loadingInstance.close()
    const { response } = error
    if (error.response && error.response.data) {
      const { status, data } = response
      handleCode(status, data.message || error['message'])
      return Promise.reject(error)
    } else {
      let errMsg = error['message']
      if (errMsg === 'Network Error') {
        errMsg = '后端接口连接异常'
      }
      if (errMsg.includes('timeout')) {
        errMsg = '后端接口请求超时'
      }
      if (errMsg.includes('Request failed with status code')) {
        const code = errMsg.substr(errMsg.length - 3)
        errMsg = '后端接口' + code + '异常'
      }
      // message.error(errMsg || `后端接口未知异常`)
      // console.log(message);
      return Promise.reject(error)
    }
  }
)

export default instance
