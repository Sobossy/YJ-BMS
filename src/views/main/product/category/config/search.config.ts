const searchConfig = {
  pageName: 'category',
  formItems: [
    {
      prop: 'name',
      type: 'input',
      label: '商品类别',
      placeholder: '请输入商品类别'
    },
    {
      prop: 'id',
      type: 'input',
      label: '商品id',
      placeholder: '请输入商品id'
    },
    {
      prop: 'createAt',
      type: 'date-picker',
      label: '创建时间',
      otherOption: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}

export default searchConfig
