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
  }
})
