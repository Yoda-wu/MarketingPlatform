// pages/farmerOrder/farmerOrder.js
import dbBehavior from './db'
Page({
  behaviors: [dbBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    sellerData: null,
    unit: "箱",
    showDialog: false,  // 展示下单弹窗
    orderamount: null,  // 下单数量
    targetOrder: null,  // 下单的产品
    totalcost: null,
    confirmOrder: false, // 是否已经确定下单
  },
  // 联系商家按钮
  callPhone(event) {
    wx.makePhoneCall({
      phoneNumber: this.data.sellerData.phone,
    })
  },

  // 点击出售按钮
  takeOrder(event) {
    // 点击的订单条目index
    const {orderIndex} = event.target.dataset
    const orderItem = this.data.sellerData.productDetails[orderIndex]
    this.setData({
      showDialog: true,
      targetOrder: orderItem
    })
  },
  resetOrderData() {
    this.setData({
      showDialog: false,
      orderamount: null,
      targetOrder: null,
      totalcost: null,
      confirmOrder: false
    })
  },
  // 确定下单
  confirmOrder(event) {
    // 出售的数量
    const amount = Number.parseInt(this.data.orderamount)

    if(isNaN(amount)) {
      wx.showToast({
        title: '请输入有效数字',
        icon: "error",
      })
      this.resetOrderData()
      return
    }

    if (amount > this.data.targetOrder.amount) {
      wx.showToast({
        title: '数量大于需求',
        icon: "error"
      })
      this.resetOrderData()
      return
    } 

      // 总价格
    const totalcost = amount * this.data.targetOrder.expectedPrice
    this.setData({
      confirmOrder: true,
      orderamount: amount,
      showDialog: false,
      totalcost: totalcost.toFixed(2)
    })
  },

  // 执行订单
  executeOrder() {
    // TODO 修改订单信息
    console.log("执行订单！")

    this.resetOrderData();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const sellerData = this.getSellerById('123')

    // 隐藏号码
    const maskedPhone = sellerData.phone.slice(0, 3) + '*'.repeat(5) + sellerData.phone.slice(8);
    // 信誉评价的颜色
    const goodColor = 'rgb(213, 255, 203)'
    const badColor = "rgb(248, 220, 143)"
    var crediscolor = ""
    if(sellerData.rating >= 3.0) {
      crediscolor = goodColor
    } else {
      crediscolor = badColor
    }
    
    this.setData({
      sellerData: sellerData,
      wantedProductStr: sellerData.wantedProducts.join('，'),
      places2sellStr: sellerData.bussiness_scope.join('，'),
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