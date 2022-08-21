<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ $store.state.user?.account }}
      <!-- <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon> -->
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click="handleLogout">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang='ts'>
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { store } from '@/store'

const router = useRouter()

const handleLogout = () => {
  ElMessageBox.confirm('确认退出吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 清除用户登录信息
    store.commit('setUser', null)
    ElMessage({
      type: 'success',
      message: '退出成功'
    })
    router.push({
      name: 'login'
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消退出'
    })
  })
}
</script>

<style lang='scss' scoped>

</style>
