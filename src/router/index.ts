import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import AppLayout from '../layout/AppLayout.vue'
import productRoutes from './modules/product'
import mediaRoutes from './modules/media'
import orderRoutes from './modules/order'
import permissionRoutes from './modules/permission'

// 引入进度条加载插件及其样式
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { store } from '@/store'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    meta: {
      requiredAuth: true // 父路由设置登录权限子路由无需重复设置
    },
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('../views/home/index.vue'),
        meta: {
          title: '首页',
          requiredAuth: true
        }
      },
      productRoutes,
      mediaRoutes,
      orderRoutes,
      permissionRoutes
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(), // 路由模式
  routes
})

// 路由拦截器全局前置守卫
router.beforeEach((to, from) => {
  nprogress.start() // 进入每一个路由时开始加载进度条
  // 统一处理页面访问登录状态
  if (to.meta.requiredAuth && !store.state.user) {
    // 此路由需要授权，请检查是否授权（requiredAuth：true表示已授权，反则未授权）
    // 如果没有授权则返回到登录页
    return {
      path: '/login',
      query: {
        // 传递查询参数，保存我们所在位置，登录成功后可回到之前的页面
        redirect: to.fullPath
      }
    }
  }
})

// 路由拦截器全局后置守卫
router.afterEach(() => {
  nprogress.done() // 结束进度条
})

export default router
