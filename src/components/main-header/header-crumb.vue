<template>
  <el-breadcrumb separator-icon="ArrowRight">
    <template v-for="item in breadcrumbs" :key="item.id">
      <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useLoginStore from '@/store/login/login'
import { mapPathToBreadcrumbs } from '@/utils/map-menus'
import { useRoute } from 'vue-router'

const route = useRoute()
const userMenus = useLoginStore().userMenus

const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, userMenus)
})
</script>

<style lang="less" scoped>
.home {
  color: skyblue;
}
</style>
