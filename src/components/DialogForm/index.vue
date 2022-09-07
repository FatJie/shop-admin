<template>
  <el-dialog
    ref="dialogRef"
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <slot />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button
          type="primary"
          @click="handleConfirm"
          :loading="confirLoading"
        >确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang='ts'>
import { PropType, ref } from 'vue'
import { TElDialog } from '@/types/element-plus'

// 声明 emit 数据类型
// interface EmitType {
//   (e: 'confirm'): void
// }
// 获取父组件传递的 emit 事件
// const emit = defineEmits<EmitType>()

// 通过组件上定义 dialogRef 变量来通用的取消弹框
const dialogRef = ref<TElDialog | null>()
const handleCancel = () => {
  if (dialogRef.value) {
    dialogRef.value.visible = false
  }
}

// 通过声明 prop 的 confirm 事件为 promise 类型处理确认按钮的loading
const props = defineProps({
  confirm: {
    type: Function as PropType<() => Promise<void>>,
    default: () => Promise.resolve()
  }
})

// 提交表单按钮绑定loading
const confirLoading = ref(false)
const handleConfirm = async () => {
  confirLoading.value = true
  await props.confirm()
  confirLoading.value = false
}
</script>

<style lang='scss' scoped>

</style>
