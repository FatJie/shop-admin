import axios, { AxiosRequestConfig } from 'axios'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { store } from '@/store'

const router = useRouter()

const request = axios.create({
  // baseURL: import.meta.env.VITE_API_BASEURL
})

// 请求拦截器
request.interceptors.request.use((config) => {
  // 统一设置用户身份 token
  // const user = store.state.user
  // if (user && user.token) {
  //   config.headers.Authorization = `Bearer ${user.token}`
  // } // 登出未请求接口
  return config
}, (error) => {
  return Promise.reject(error)
})

// 控制登录过期的锁,避免同一页面多个请求反复执行响应拦截器
let isRefreshing = false

// 响应拦截器
request.interceptors.response.use(res => {
  const status = res.data.status
  // 统一处理接口响应错误，列如token过期无效、服务端异常等...
  if (!status || status === 200) {
    return res
  }
  // 统一处理登录过期(具体状态码根据后台返回参数而定，此处未实际请求后台token)
  if (status === 410000) {
    if (isRefreshing) return Promise.reject(res)
    isRefreshing = true
    ElMessageBox.confirm('您的登录已过期，点击取消停留在此，确认重新登陆', '登录过期', {
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }).then(() => {
      // 清除本地过期登陆状态
      store.commit('setUser', null)
      // 跳转登陆页面
      router.push({
        name: 'login',
        query: {
          redirect: router.currentRoute.value.fullPath
        }
      })
      // 抛出异常
    }).finally(() => {
      isRefreshing = false
    })
    // 在内部消化掉这个业务异常
    return Promise.reject(res)
  }
  // 其他错误情况
  ElMessage.error(res.data.msg || '请求失败，请重试')
  // 手动返回异常终止程序
  return Promise.reject(res.data)
}, (error) => {
  return Promise.reject(error)
})

export default <T = any>(config: AxiosRequestConfig) => {
  return request(config).then(res => {
    return (res.data.data || res.data) as T
  })
}
