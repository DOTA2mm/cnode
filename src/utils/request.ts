import { message } from 'antd'
import axios from 'axios'

const error = () => {
  message.error('数据加载失败！', 1)
}

const service = axios.create({
  baseURL: 'https://cnodejs.org/api/v1',
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => config,
  (err) => {
    error()
    return Promise.reject(err)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (respones) => respones.data,
  (err) => {
    error()
    return Promise.reject(err)
  }
)

export default service
