import { postPageListData } from '@/service/main/system/system'
import { defineStore } from 'pinia'

const useProductStore = defineStore('product', {
  state: () => ({
    goodsList: [],
    categoryList: []
  }),
  actions: {
    async postProductListAction(pageName: string, goodsInfo: any) {
      const productListResult = await postPageListData(pageName, goodsInfo)
      console.log(productListResult)
      this.goodsList = productListResult
    },
    async postCategoryListAction(pageName: string, categoryInfo: any) {
      const categoryListResult = await postPageListData(pageName, categoryInfo)
      console.log(categoryListResult)
      this.categoryList = categoryListResult
    }
  }
})

export default useProductStore
