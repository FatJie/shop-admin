<template>
  <div class="login-container">
    <el-form
      class="login-form"
      :rules="rules"
      ref="formRef"
      :model="user"
      @submit.prevent="handleSubmit"
      size="large"
    >
      <div class="login-form__header">
        登录界面
      </div>
      <el-form-item prop="account">
        <el-input
          v-model="user.account"
          placeholder="请输入用户名"
        >
          <!-- <template #prefix>
            <i class="el-input__icon el-icon-user" />
          </template> -->
        </el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input
          v-model="user.pwd"
          type="password"
          placeholder="请输入密码"
        >
          <!-- <template #prefix>
            <i class="el-input__icon el-icon-lock" />
          </template> -->
        </el-input>
      </el-form-item>
      <!-- <el-form-item prop="imgcode">
        <div class="imgcode-wrap">
          <el-input
            v-model="user.imgcode"
            placeholder="请输入验证码"
          >
            <template #prefix>
              <i class="el-input__icon el-icon-key" />
            </template>
          </el-input>
          <img
            class="imgcode"
            alt="验证码"
            :src="captchaSrc"
          >
        </div>
      </el-form-item> -->
      <el-form-item>
        <el-button
          class="submit-button"
          type="primary"
          :loading="loading"
          native-type="submit"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { login } from '@/api/common'
import { useRouter } from 'vue-router'
import { TElForm } from '@/types/element-plus'
import { store } from '@/store'

const router = useRouter()

const user = reactive({
  account: 'admin',
  pwd: '123456'
  // imgcode: ''
})
const loading = ref(false)
const rules = ref({
  account: [
    { required: true, message: '请输入账号', trigger: 'change' }
  ],
  pwd: [
    { required: true, message: '请输入密码', trigger: 'change' }
  ]
  // imgcode: [
  //   { required: true, message: '请输入验证码', trigger: 'change' }
  // ]
})

const formRef = ref<TElForm | null>(null)
// 登录事件
const handleSubmit = async () => {
  // 表单验证
  const valid = await formRef.value?.validate()
  if (!valid) {
    return false
  }
  // 验证通过，展示loading
  loading.value = true
  // 请求提交
  const loginData = await login(user).finally(() => {
    loading.value = true
  })
  store.commit('setUser', loginData.user_info)
  router.replace({
    name: 'home'
  })
  // 处理响应
}

</script>

<style lang="scss" scoped>
.login-container {
  min-width: 400px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3a4b;
}

.login-form {
  padding: 30px;
  border-radius: 6px;
  background: #fff;
  min-width: 350px;
  .login-form__header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 30px;
    font-size: 30px;
    color: #409eff;
  }

  .el-form-item:last-child {
    margin-bottom: 0;
  }

  .login__form-title {
    display: flex;
    justify-content: center;
    color: #fff;
  }

  .submit-button {
    width: 100%;
  }

  .login-logo {
    width: 271px;
    height: 74px;
  }
  .imgcode-wrap {
    display: flex;
    align-items: center;
    .imgcode {
      height: 37px;
    }
  }
}
</style>
