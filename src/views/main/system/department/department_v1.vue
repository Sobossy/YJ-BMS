<template>
  <div class="department">
    <page-search @query-click="handleQueryClick" @reset-click="handleResetClick"></page-search>
    <page-content
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    ></page-content>
    <page-modal ref="modelRef"></page-modal>
  </div>
</template>

<script setup lang="ts" name="department">
import PageSearch from './c-cpns/page-search.vue'
import PageContent from './c-cpns/page-content.vue'
import PageModal from './c-cpns/page-modal.vue'

import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof PageContent>>()
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}
function handleResetClick() {
  contentRef.value?.fetchPageListData()
}

const modelRef = ref<InstanceType<typeof PageModal>>()
function handleNewClick() {
  modelRef.value?.setModalVisible()
}
function handleEditClick(itemData: any) {
  modelRef.value?.setModalVisible(false, itemData)
}
</script>

<style scoped>
.department {
  border-radius: 8px;
  overflow: hidden;
}
</style>
