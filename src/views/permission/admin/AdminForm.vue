<template>
  <app-dialog-form
    :title="props.adminId ? '编辑管理员' : '添加管理员'"
    :confirm="handleSubmit"
    @closed="dialogClosed"
    @open="handleOpen"
  >
    <el-form
      ref="form"
      :model="formData"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item
        label="管理员账号"
        prop="account"
      >
        <el-input
          v-model="formData.account"
          placeholder="请输入管理员账号"
        />
      </el-form-item>
      <el-form-item
        label="管理员密码"
        prop="pwd"
      >
        <el-input
          v-model="formData.pwd"
          type="password"
          placeholder="请输入管理员密码"
        />
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="conf_pwd"
      >
        <el-input
          v-model="formData.conf_pwd"
          type="password"
          placeholder="请输入确认密码"
        />
      </el-form-item>
      <el-form-item
        label="管理员姓名"
        prop="real_name"
      >
        <el-input
          v-model="formData.real_name"
          placeholder="请输入管理员姓名"
        />
      </el-form-item>
      <el-form-item
        label="管理员身份"
        prop="roles"
      >
        <el-select
          v-model="formData.roles"
          multiple
          placeholder="请选择管理员身份"
        >
          <el-option
            v-for="item in roles"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="formData.status">
          <el-radio
            :label="1"
          >
            开启
          </el-radio>
          <el-radio
            :label="0"
          >
            关闭
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </app-dialog-form>
</template>
<script setup lang='ts'>
import { PropType, ref } from 'vue'
import AppDialogForm from '@/components/DialogForm/index.vue'
import type { TElForm } from '@/types/element-plus'

const props = defineProps({
  adminId: {
    type: Number as PropType<number | null>,
    default: null
  }
})

const form = ref<TElForm | null>(null)
const formLoading = ref(false)
const formData = ref({
  account: '',
  pwd: '',
  conf_pwd: '',
  roles: [] as number[],
  status: 0 as 0 | 1,
  real_name: ''
})

interface Troles {
  value: number
  label: string
}
const roles = ref<Troles[]>([])

// 声明 emit 数据类型
interface EmitType {
  (e: 'update:admin-id', value: number | null): void
  (e: 'submitSuccess'): void
}
// 获取父组件传递的 emit 事件
const emit = defineEmits<EmitType>()

// 监听dialog打开事件并请求身份信息(模拟)
const handleOpen = () => {
  formLoading.value = true
  roles.value = [
    { value: 1, label: '超级管理员' },
    { value: 2, label: '运营' },
    { value: 3, label: '用户  ' }
  ]
  const interval = setInterval(() => {
    formLoading.value = false
    clearInterval(interval)
  }, 2000)

  // 当编辑或添加用户时需并发请求身份信息和用户信息
  // Promise.all([func1(), func2()]).finally(() => {
  //   formLoading.value = false
  // })
}

// 监听弹框关闭事件
const dialogClosed = () => {
  emit('update:admin-id', null)
  form.value?.clearValidate() // 清除验证结果
  form.value?.resetFields() // 清除表单数据
}

// 提交表单成功之后再执行子组件 确认button 的 loading 为 true
const handleSubmit = async () => {
  if (props.adminId) {
    // 更新管理员
    // await ...
  } else {
    // 添加管理员
    // await ...
  }
  // 对父组件发布自定义事件
  emit('submitSuccess')
}
</script>

<style lang='scss' scoped>

</style>
