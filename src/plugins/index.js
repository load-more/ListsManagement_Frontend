// 注册 ElementUI 组件（完整引入）
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入自制插件
import myPlugins from './myPlugins'

Vue.use(ElementUI)
Vue.use(myPlugins)
