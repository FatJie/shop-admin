// 封装本地存储模块
export const getItem = <T>(key: string) => {
  const data = window.localStorage.getItem(key)
  if (!data) return null
  // 当JSON.parse转换异常时抛出
  try {
    return JSON.parse(data) as T
  } catch (err) {
    return null
  }
}

export const setItem = (key: string, value: object | string | null) => {
  // 当值类型为object时，先将值JSON.stringify再存到本地
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

export const removeItem = (key: string) => {
  window.localStorage.removeItem(key)
}
