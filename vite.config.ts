import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      // 配置选项
      cache: false // 禁用eslint缓存
    }),
    vueJsx({
      // 配置选项
    })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  css: { // 指定传递给CSS预处理器的选项
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";' // CSS全局变量名
      }
    }
  },
  server: {
    proxy: {
      // 选项写法
      '/api': {
        target: 'https://www.fastmock.site/mock/4d55240aee5d7124bf3b97c3bfae7a56', // 代理的目标地址
        /* http请求头部的origin字段
          开发模式中默认的origin是本地的origin
          代理服务会将origin修改为目标地址
        */
        changeOrigin: true
        // 路径重写
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
// 客户端中的开发服务器proxy可以接收页面的请求，然后去请求服务端的接口服务，页面和开发服务器是同源的所以没有跨域问题，而开发服务器发送请求到服务端没有跨域限制，利用此特点规避了跨域的问题
