const contentConfig = {
  pageName: 'goods',
  header: {
    title: '商品列表',
    btnTitle: '新建商品'
  },
  propsList: [
    { type: 'selection', label: '选择', width: '80px' },
    { type: 'index', label: '序号', width: '80px' },
    { prop: 'name', label: '商品名称', width: '100px' },
    { prop: 'oldPrice', label: '原价格', width: '80px' },
    { prop: 'newPrice', label: '新价格', width: '80px' },
    { prop: 'imgUrl', type: 'pic', label: '图片', width: '100px' },
    { prop: 'inventoryCount', label: '库存', width: '80px' },
    { prop: 'saleCount', label: '销量', width: '80px' },
    { prop: 'favorCount', label: '收藏', width: '80px' },
    { prop: 'address', label: '地址', width: '80px' },
    { prop: 'createAt', type: 'timer', label: '创建时间' },
    { prop: 'updateAt', type: 'timer', label: '更新时间' },
    { type: 'handler', label: '操作', width: '150px' }
  ]
}

export default contentConfig
