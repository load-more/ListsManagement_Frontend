import axios from 'axios'
// 导入NProgress进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const BASE_URL = 'http://localhost:3000/api/'

export default function request() {
  // 创建一个axios实例，并传入一些配置
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
  })

  // 设置拦截器，在请求或响应被 then 或 catch 处理前拦截它们
  instance.interceptors.request.use((config) => {
    // 请求拦截器，在发送请求之前做些什么
    NProgress.start() // 请求之前，启动进度条

    const temp = config // 临时存储参数，防止eslint报错

    return temp // 必须返回config
  }, (err) => {
    NProgress.done() // 失败，关闭进度条
    console.log(err)
  })

  instance.interceptors.response.use((res) => {
    // 响应拦截器，对响应数据做些什么
    NProgress.done() // 获得响应，关闭进度条
    return res.data // 利用响应拦截器，将res里的data抽取出来，也可以使用对象的解构
  }, (err) => {
    NProgress.done() // 失败，关闭进度条
    console.log(err)
  })

  return instance
}
