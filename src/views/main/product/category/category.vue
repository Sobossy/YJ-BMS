<template>
  <div class="category">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></page-search>
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    ></page-content>
    <page-modal :modal-config="modalConfig" ref="modalRef"></page-modal>
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

// 点击search，content的操作
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

// 点击content，modal的操作
const { modalRef, handleNewClick, handleEditClick } = usePageModal()
</script>

<style lang="less" scoped>
.category {
  color: skyblue;
}
</style>
