import request from '@/utils/request'
import { TListParams, Admin, TAddAdmin } from './types/admin'

// 获取管理员列表
export const getAdmins = (params: TListParams) => {
  return request<{
    count: number
    list: Admin[]
  }>({
    method: 'GET',
    url: '/setting/admin',
    params
  })
}

// 添加管理员
export const addAdmin = (data: TAddAdmin) => {
  return request({
    method: 'POST',
    url: '/setting/admin',
    data
  })
}

// 修改管理员信息
export const updateAdmin = (id: number, data: TAddAdmin) => {
  return request({
    method: 'PUT',
    url: `/setting/admin/${id}`,
    data
  })
}

// 删除管理员
export const deleteAdmin = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/setting/admin/${id}`
  })
}

// 修改管理员状态
export const updateAdminStatus = (id: number, status: number) => {
  return request({
    method: 'PUT',
    url: `/setting/admin/${id}/${status}`
  })
}
