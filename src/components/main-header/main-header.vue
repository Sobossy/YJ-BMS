<template>
  <div class="main-header">
    <div class="menu-icon" @click="menuIconClick">
      <el-icon size="26px">
        <component :is="isFold ? 'Fold' : 'Expand'"></component>
      </el-icon>
    </div>
    <div class="content">
      <header-crumb></header-crumb>
      <header-info></header-info>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderInfo from './header-info.vue'
import useMainStore from '@/store/main/main'
import HeaderCrumb from './header-crumb.vue'
import { storeToRefs } from 'pinia'

const mainStore = useMainStore()
const { isFold } = storeToRefs(mainStore)

function menuIconClick() {
  isFold.value = !isFold.value
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
