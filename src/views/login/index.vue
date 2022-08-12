<template>
  <h1>登路</h1>
</template>

<script lang="ts" setup>
import { getLoginInfo } from '@/api/common'
import { ILoginInfo } from '@/api/types/common'
import { onMounted, ref } from 'vue'

const list = ref<ILoginInfo['slide']>([])

onMounted(() => {
  getLoginInfo().then(data => {
    console.log(data)
    list.value = data.slide
  })
})
</script>
