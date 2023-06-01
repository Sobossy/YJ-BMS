<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <div class="tabs">
      <el-tabs type="border-card" v-model="activeName" stretch>
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span>账号登录</span>
            </div>
          </template>
          <pane-account ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span>手机登录</span>
            </div>
          </template>
          <pane-phone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isKeep" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" size="large" @click="loginBtn">立即登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'
import { localCache } from '@/utils/cache'

const activeName = ref('account')
const isKeep = ref<boolean>(localCache.getCache('isKeep') ?? false)
// watch(isKeep, (newValue) => {
//   localCache.setCache('isKeep', newValue)
//   console.log(newValue)
// })
watch(isKeep, (newValue) => {
  if (newValue) {
    localCache.setCache('isKeep', true)
  } else {
    localCache.removeCache('isKeep')
    // localCache.setCache('isKeep', false)   未生效
  }
})
const accountRef = ref<InstanceType<typeof PaneAccount>>()

const loginBtn = () => {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(isKeep.value)
  } else {
    console.log('点击了手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;
  .title {
    text-align: center;
    margin-bottom: 20px;
  }
  .tabs {
    .label {
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        margin-left: 5px;
      }
    }
  }

  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .login-btn {
    margin-top: 5px;
    width: 100%;
  }
}
</style>
