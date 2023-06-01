<template>
  <div class="pane-account">
    <el-form
      :model="account"
      label-width="60px"
      :rules="rules"
      size="large"
      status-icon
      ref="formRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="account.password"
          type="password"
          show-password
          placeholder="请输入密码"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus/lib/components/index.js'
import type { ElForm, FormRules } from 'element-plus/lib/components/index.js'
import { reactive, ref } from 'vue'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

const account = reactive<IAccount>({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})

const rules: FormRules = {
  name: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,20}$/, message: '必须是6~20位数字或字母组成', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 10, message: '请输入3~10位数字或字母', trigger: 'blur' }
  ]
}

// 执行登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isKeep: boolean) {
  formRef.value?.validate((valid: any) => {
    if (valid) {
      const name = account.name
      const password = account.password
      loginStore.loginAccountAction({ name, password }).then(() => {
        // 判断是否需要记住密码
        if (isKeep) {
          localCache.setCache('name', name)
          localCache.setCache('password', password)
        } else {
          localCache.removeCache('name')
          localCache.removeCache('password')
        }
      })
    } else {
      ElMessage.error('登录失败')
    }
  })
}
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.pane-account {
  color: skyblue;
}
</style>
