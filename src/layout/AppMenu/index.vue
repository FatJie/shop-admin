<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#304156"
    text-color="#fff"
    router
  >
    <el-menu-item index="/">
      <span>首页</span>
    </el-menu-item>
    <!-- 商品 -->
    <el-sub-menu index="/product">
      <template #title>
        <span>商品</span>
      </template>
      <el-menu-item index="/product/product_list">
        商品列表
      </el-menu-item>
      <el-menu-item index="/product/product_classify">
        商品分类
      </el-menu-item>
      <el-menu-item index="/product/product_attr">
        商品规格
      </el-menu-item>
      <el-menu-item index="/product/product_reply">
        商品评论
      </el-menu-item>
    </el-sub-menu>
    <!-- 订单 -->
    <el-sub-menu index="/order">
      <template #title>
        <span>订单</span>
      </template>
      <el-menu-item index="/order/list">
        订单列表
      </el-menu-item>
    </el-sub-menu>
    <!-- 媒体 -->
    <el-menu-item index="/media">
      <span>媒体</span>
    </el-menu-item>
    <!-- 权限 -->
    <el-sub-menu index="/permission">
      <template #title>
        <span>权限</span>
      </template>
      <el-menu-item index="/permission/role">
        角色
      </el-menu-item>
      <el-menu-item index="/permission/admin">
        管理员
      </el-menu-item>
      <el-menu-item index="/permission/rule">
        权限规则
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
<script setup lang='ts'>
</script>

<style lang='scss' scoped>
.el-menu {
  border-right: none;
}
</style>
