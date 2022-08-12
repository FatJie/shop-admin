<template>
  <h1>首页</h1>
  <div>{{ store.state.count }}</div>
  <div>{{ $store.state.count }}</div>
</template>

<script lang="ts" setup>
import { useStore } from '../../store'
import User from '@/api/user'

console.log(User)

const store = useStore()

console.log(store.state.count)
</script>

<style lang="scss">
// @import '@/styles/variables.scss';
h1 {
  color: $color;
}
</style>
