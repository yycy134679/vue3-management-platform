import axios from 'axios'
import { ElMessage } from 'element-plus'
// 创建一个 axios 实例
const service = axios.create()

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

  return service(options)
}

// 导出 request 函数
export default request
