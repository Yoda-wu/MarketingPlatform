// pages/farmerOrder/farmerOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    farmerInfo: {},
    farmerName: "xx合作社",
    products: ['梨', '苹果'],
    contactPerson: '李先生',
    phone: '18127125486',
    baseNum: 10,
    credits: 4.8,
    unit: "箱",
    viewAccount: 1090,
    productDetails: [
      { id: 1, name: 'a菇', amount: 10, expectedPrice: 32.7, description: '描述信息1', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
      { id: 2, name: 'c菇', amount: 13, expectedPrice: 12, description: '描述信息2', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
      { id: 3, name: 'c菇', amount: 13, expectedPrice: 12, description: '描述信息3', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
    ],
    showDialog: false,  // 展示下单弹窗
    orderamount: null,  // 下单数量
    targetOrder: null,  // 下单的产品
    totalcost: null,
    confirmOrder: false, // 是否已经确定下单
  },
  // 联系商家按钮
  callPhone(event) {
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  },

  // 点击下单按钮
  takeOrder(event) {
    const { orderindex } = event.target.dataset
    const orderItem = this.data.productDetails[orderindex]
    this.setData({
      showDialog: true,
      targetOrder: orderItem
    })
    // console.log(orderItem)
  },

  // 确定下单
  confirmOrder(event) {
    const amount = this.data.orderamount
    if (amount === null) {
      wx.showToast({
        title: '请输入有效数字',
        icon: "error"
      })
    } else if (amount > this.data.targetOrder.amount) {
      wx.showToast({
        title: '产品数量不足',
        icon: "error"
      })
    } else {
      const totalcost = this.data.orderamount * this.data.targetOrder.expectedPrice
      this.setData({
        confirmOrder: true,
        totalcost: totalcost.toFixed(2)
      })
    }
    this.setData({
      showDialog: false,
    })
  },

  // 执行订单
  executeOrder() {
    this.setData({
      confirmOrder: false
    })

    // TODO 修改订单信息
    console.log("执行订单！")

    this.setData({
      orderamount: null
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let productInfo = JSON.parse(options.id)
    productInfo.description = '描述信息'
    console.log('id', productInfo)
    // 隐藏号码
    const maskedPhone = this.data.phone.slice(0, 3) + '*'.repeat(5) + this.data.phone.slice(8);

    // 信誉评价的颜色
    const goodColor = 'rgb(213, 255, 203)'
    const badColor = "rgb(248, 220, 143)"
    var crediscolor = ""
    if (this.data.credits >= 3.0) {
      crediscolor = goodColor
    } else {
      crediscolor = badColor
    }

    this.setData({
      productStr: productInfo.product_name,
      productDetails: [productInfo],
      maskedPhone: maskedPhone,
      crediscolor: crediscolor
    })
  },
  // TODO 浏览量+1
  addViewAmount() {
    console.log("page is view")
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.addViewAmount()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})