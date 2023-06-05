const contentConfig = {
  pageName: 'category',
  header: {
    title: '商品分类',
    btnTitle: '新建分类'
  },
  propsList: [
    { type: 'selection', label: '选择', width: '80px' },
    { type: 'index', label: '序号', width: '80px' },
    { prop: 'id', label: '类别id', width: '80px' },
    { prop: 'name', label: '类别名称', width: '120px' },
    { prop: 'createAt', type: 'timer', label: '创建时间' },
    { prop: 'updateAt', type: 'timer', label: '更新时间' },
    { type: 'handler', label: '操作', width: '150px' }
  ]
}

export default contentConfig
