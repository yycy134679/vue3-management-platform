import axios from 'axios'
import { ElMessage } from 'element-plus'
import config from './config'
// 创建一个 axios 实例
const service = axios.create({
  baseURL: config.baseApi, // 基础接口地址
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
service.interceptors.response.use((res) => {
  const { data, mes, code } = res.data
  if (code === 200) {
    return data
  } else {
    // 使用 Element Plus 的消息提示组件显示错误信息
    ElMessage.error(mes || '请求出错，请稍后重试！')
    return Promise.reject(new Error(mes || '请求出错，请稍后重试！'))
  }
})

// 封装的核心函数
function request(options) {
  // 默认请求方法为 'get'
  options.method = options.method || 'get'

  // 对 get 请求的参数进行特殊处理 (axios 规范)
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }

  let isMock = config.mock // 全局 mock 开关

  // 单个接口的 mock 开关优先级高于全局开关
  if (typeof options.mock !== 'undefined') {
    isMock = options.mock
  }

  // 根据环境是否使用 mock 接口来切换 baseApi
  if (config.env === 'prod') {
    // 生产环境统一使用正式接口
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }

  return service(options)
}

// 导出 request 函数
export default request
