<template>
  <el-container>
    <el-aside width="200px">
      <AppMenu />
    </el-aside>
    <el-container>
      <el-header>
        <Breadcrumb />
        <FullScreen />
      </el-header>
      <el-main>
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang='ts'>
import AppMenu from './AppMenu/index.vue'
import FullScreen from './AppHeader/FullScreen.vue'
import Breadcrumb from './AppHeader/Breadcrumb.vue'
</script>

<style lang='scss' scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-aside {
  background-color: #304156;
  color: #333;
}
.el-main {
  background-color: #e0eef3;
  color: #333;
}
.el-container {
  height: 100vh;
}
</style>
