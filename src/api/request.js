import request from 'utils/request'

// 用于登录时向服务器发送请求
export function loginRequest(params) {
  return request().post('/users/login', params)
}

// 注册
export function registerRequest(params) {
  return request().post('/users/register', params)
}
