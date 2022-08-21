import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { TUserInfo } from '@/api/types/common'
import { setItem, getItem } from '@/utils/storage'
import { USER } from '@/utils/constants'

const state = {
  user: getItem<{ token: string } & TUserInfo>(USER)
  // user: JSON.parse(window.localStorage.getItem('user') || 'null') as TUserInfo | null
}

export type State = typeof state

// InjectionKey
export const key: InjectionKey<Store<State>> = Symbol('store')

// 创建一个新的 store 实例
export const store = createStore<State>({
  state,
  mutations: {
    // 设置用户信息
    setUser (state, payload) {
      state.user = payload
      // 页面用户信息持久化（防止刷新页面数据消失）
      setItem(USER, state.user)
    }
  }
})

// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}
