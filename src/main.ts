import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import './styles/index.scss' // 加载全局样式
import elementPlus from './plugins/element-plus'

createApp(App)
  .use(store, key)
  .use(router)
  .use(elementPlus)
  .mount('#app')
