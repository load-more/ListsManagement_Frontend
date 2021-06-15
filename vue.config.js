// 添加全局配置
const path = require('path')

module.exports = {
  // 开发服务器相关配置
  devServer: {
    // 配置静态资源目录
    contentBase: path.join(__dirname, 'public'),
    // 设置开发服务器的端口号
    port: 8848,
  },
  // 配置webpack相关
  configureWebpack: {
    // 解析
    resolve: {
      // 配置路径别名
      alias: {
        'views': path.resolve(__dirname, 'src/views'),
        'components': path.resolve(__dirname, 'src/components'),
        'assets': path.resolve(__dirname, 'src/assets'),
        'store': path.resolve(__dirname, 'src/store'),
        'api': path.resolve(__dirname, 'src/api'),
        'utils': path.resolve(__dirname, 'src/utils'),
        'config': path.resolve(__dirname, 'src/config'),
        'router': path.resolve(__dirname, 'src/router'),
      }
    },
  },
}