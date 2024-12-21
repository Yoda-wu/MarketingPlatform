const dbBehavior = Behavior({
  data: {
    testFarmerInfo: {
      _id: "123456",
      company_name: "xx合作社",
      products: ['梨', '苹果'],
      name: '李先生',
      phone: '18127125486',
      baseNum: 10,
      rating: 4.8,
      unit: "箱",
      viewCount: 1090,
      productDetails: [
        {id: 1, name: 'a菇', amount: 10, expectedPrice: 32.7, description: '描述信息1', image: 'https://img.yzcdn.cn/vant/cat.jpeg'},
        {id: 2, name: 'c菇', amount: 13, expectedPrice: 12, description: '描述信息2', image: 'https://img.yzcdn.cn/vant/cat.jpeg'},
        {id: 3, name: 'c菇', amount: 13, expectedPrice: 12, description: '描述信息3', image: 'https://img.yzcdn.cn/vant/cat.jpeg'},
      ],
    }
  },
  methods: {
    // 根据ID获取农户数据
    getFarmerDataByID(_id) {
      return this.data.testFarmerInfo
    },
    
  }
})

export default dbBehavior