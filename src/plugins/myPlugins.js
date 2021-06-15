import request from '../utils/request'

// 自定义插件
export default {
  // 插件对象必须要有一个 install 方法
  install(Vue) { // 参数：全局Vue对象、可选项
    Vue.mixin({
      // 添加混入，所有组件都有这里的methods
      methods: {
        $get(url, params) {
          // 注意，GET 传参传入第二个参数是对象，对象中有个属性params，它对应的是请求对应的参数对象
          return request().get(url, { params }) // 相当于 {params: params}，返回的是一个Promise对象
        },
        $post(url, params) {
          // POST 传入的第二个参数直接是一个参数对象
          return request().post(url, params) // 返回的是一个Promise对象
        },
        // 成功的消息提示
        $msgSuccess(message, duration = 2000) {
          this.$message({
            type: 'success',
            message,
            duration,
          })
        },
        // 错误的消息提示
        $msgError(message, duration = 2000) {
          this.$message({
            type: 'error',
            message,
            duration,
          })
        },
      },
    })
  },
}
