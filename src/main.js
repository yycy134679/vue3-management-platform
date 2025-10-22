import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// 全局样式
import '@/assets/less/index.less'
// Element Plus 样式（确保包含 MessageBox/Message 等服务样式）
import 'element-plus/dist/index.css'
// Mock 数据（开发环境）
import '@/api/mock.js'
// API 管理对象
import api from '@/api/api'

// 创建 Vue 应用实例
const app = createApp(App)

// 创建 Pinia 状态管理实例
const pinia = createPinia()

// 将 API 对象挂载到全局属性，便于组件内通过 this.$api 访问
app.config.globalProperties.$api = api

// 全局注册 Element Plus 所有图标组件
// 使用方式：<el-icon><Edit /></el-icon>
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 注册插件并挂载应用
app.use(pinia).use(router).mount('#app')
