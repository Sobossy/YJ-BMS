<template>
  <div class="goods">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></page-search>
    <page-content :content-config="contentConfig" ref="contentRef"></page-content>
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'

import usePageContent from '@/hooks/usePageContent'

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
</script>

<style lang="less" scoped>
.goods {
  color: skyblue;
}
</style>
