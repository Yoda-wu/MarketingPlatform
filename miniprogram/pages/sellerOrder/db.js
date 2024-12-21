const dbBehavior = Behavior({
  data:{
    testSellerData: {
      company_name: 'xx公司',
      bussiness_scope: ['广州', '深圳'],
      name: '陈先生',
      phone: '12967586031',
      rating: 4.9,
      viewCount: 901,
      productDetails: [
        {id: 1, name: 'a菇', amount: 10, expectedPrice: 32.7, description: '描述信息1'},
        {id: 2, name: 'c菇', amount: 13, expectedPrice: 12, description: '描述信息2'},
        {id: 3, name: 'c菇', amount: 13, expectedPrice: 12, description: '描述信息3'},
      ],
    }
  },
  methods:{
    getSellerById(_id) {
      const sellerData = this.data.testSellerData;
      sellerData.wantedProducts = new Array();
      const record = new Set();
      for(var i = 0; i < sellerData.productDetails.length; i ++) {
        const productName = sellerData.productDetails[i].name
        if(! record.has(productName)) {
          record.add(productName)
          sellerData.wantedProducts.push(productName)
        }
      }
      return sellerData
    },
    createOrder(productID, fromID, toID) {},
  },

})

export default dbBehavior