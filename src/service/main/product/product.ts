import hyRequest from '@/service'

export function postGoodsListData(goodsInfo: any) {
  return hyRequest.post({
    url: '/goods/list',
    data: goodsInfo
  })
}

export function postCategoryListData(categoryInfo: any) {
  return hyRequest.post({
    url: '/category/list',
    data: categoryInfo
  })
}
