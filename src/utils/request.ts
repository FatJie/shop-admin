import axios, { AxiosRequestConfig } from 'axios'

const request = axios.create({
  baseURL: 'https://www.fastmock.site/mock/4d55240aee5d7124bf3b97c3bfae7a56/api'
})

// 请求拦截器
request.interceptors.request.use((config) => {
  // 同统一设置用户身份 token
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(res => {
  // 统一处理接口响应错误，列如token过期无效、服务端异常等...
  return res
}, (error) => {
  return Promise.reject(error)
})

export default <T = any>(config: AxiosRequestConfig) => {
  return request(config).then(res => {
    return res.data.data as T
  })
}
