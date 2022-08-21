// 公共基础接口封装
import request from '@/utils/request'
import { TLoginResponse } from './types/common'

// 登录
export const login = (data: {
  account: string
  pwd: string
}) => {
  return request<TLoginResponse>({
    method: 'POST',
    url: '/api/login',
    data
  })
}
