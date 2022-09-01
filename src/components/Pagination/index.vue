<template>
  <el-pagination
    :current-page="props.page"
    :page-size="limit"
    background
    :page-sizes="[2, 3, 4]"
    :total="props.listCount"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
    layout="prev, pager, next, jumper"
  />
</template>
<script setup lang='ts'>

// 指定 Props ts类型 方法一
// interface PropsType {
//   page: number
//   limit: number
//   listCount: number
//   loadList: () => void
// }
// const props = withDefaults(defineProps<PropsType>(), {
//   page: 1,
//   limit: 10,
//   listCount: 0,
//   loadList: () => {}
// })

// 指定 Props ts类型 方法二
import { PropType } from 'vue'
const props = defineProps({
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 10
  },
  listCount: {
    type: Number,
    default: 0
  },
  loadList: {
    type: Function,
    default: () => {}
  },
  obj: {
    required: true,
    type: Object as PropType<{ a: string, b: string }>
  }
})

// 指定 emit ts类型
interface EmitsType {
  (e: 'update:page', page: number): void
  (e: 'update:limit', size: number): void
}
const emit = defineEmits<EmitsType>()

// 修改当前页码
const handleCurrentChange = (page: number) => {
  emit('update:page', page)
  props.loadList()
}
// 修改当前页码
const handleSizeChange = (size: number) => {
  emit('update:page', 1)
  emit('update:limit', size)
  props.loadList()
}
</script>

<style lang='scss' scoped>

</style>
