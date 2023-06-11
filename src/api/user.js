import request from '@/utils/request'
// import {
//   tokenName
// } from '@/config'

export async function login(data) {
  return await request({
    // url: '/login',
    url: '/auth/login',
    method: 'post',
    data,
  })
}

export async function socialLogin(data) {
  return request({
    url: '/socialLogin',
    method: 'post',
    data,
  })
}

export function getUserInfo(openid) {
  //此处为了兼容mock.js使用data传递accessToken，如果使用mock可以走headers
  return request({
    // url: '/userInfo',
    url: '/user/info',
    // method: 'get',
    method: 'post',
    data: {
      openid,
    },
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post',
  })
}

export function register(data) {
  return request({
    url: '/user/register',
    // url: '/register',
    method: 'post',
    data,
  })
}
