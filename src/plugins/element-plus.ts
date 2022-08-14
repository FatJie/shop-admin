import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { App } from 'vue'

export default {
  install (app: App) {
    // 设置全局组件默认大小
    app.use(ElementPlus, { size: 'small', zIndex: 2000 })
  }
}
