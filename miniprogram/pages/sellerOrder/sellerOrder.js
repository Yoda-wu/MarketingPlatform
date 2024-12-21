// pages/farmerOrder/farmerOrder.js
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
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
      phoneNumber: this.data.baseInfo.phone,
    })
  },

  // 点击出售按钮
  takeOrder(event) {
    // 点击的订单条目index
    const {orderIndex} = event.target.dataset
    const orderItem = this.data.productDetails[orderIndex]
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

    if (amount > this.data.targetOrder.capcacity) {
      wx.showToast({
        title: '数量大于需求',
        icon: "error"
      })
      this.resetOrderData()
      return
    } 

      // 总价格
    const totalcost = amount * this.data.targetOrder.prices
    this.setData({
      confirmOrder: true, // 展示二次确认窗口
      orderamount: amount,
      showDialog: false,
      totalcost: totalcost.toFixed(2)
    })
  },

  // 确如完成，点击确认，二次确认后创建订单
  executeOrder() {
    console.log("执行订单！")
    
    const app = getApp()
    const userInfo = app.globalData.userInfo;
    console.log(this.data.targetOrder)
    wx.cloud.callFunction({
      name: 'createOrder',
      data: {
        targetOrder: this.data.targetOrder,
        amount: this.data.orderamount,
        userInfo: userInfo
      }
    })
    .then(res => {
      console.log(res)
      wx.showToast({
        title: '下单成功',
        icon: 'success'
      })
    })
    .catch(err => { 
      wx.showToast({
        title: '下单失败',
        icon: 'error'
      })
    })
    .finally(
      this.resetOrderData()
    )
  },
  // 加载用户基本信息；
  async loadBaseInfo(_id) {
    return await db.collection("UserList").where({
      _id: _id
    })
    .limit(1)
    .get()
  },
  // 加载用户发布的信息
  async loadPublishList(userID) {
    return await db.collection("PublishList")
      .where({
        user_id: userID,
        type: 1
      }).get()
  },
  // 浏览量+1
  async addViewCount(_id) {
    var _ = db.command
    return await db.collection("UserList")
      .doc(_id)
      .update({
        data: {
          view_count: _.inc(1)
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // const {_id} = options
    const _id = "0e839fa467668e2701a7edd91c25d8d5"
    wx.showLoading({
      title: '数据加载中',
    })
    this.loadBaseInfo(_id)
      .then(res => { // 加载基础信息
        const baseInfo = res.data[0]
        const phone = baseInfo.phone
        // 隐藏号码
        const maskedPhone = phone.slice(0, 3) + '*'.repeat(5) + phone.slice(8)
        this.setData({
          baseInfo: baseInfo,
          maskedPhone: maskedPhone
        })
        return this.loadPublishList(baseInfo.userID)
      })
      .then(res => {  // 加载产品详情
        const data = res.data
        console.log(data)
        const record = new Set()
        const productsName = new Array()
        data.forEach((item) => {
          if(!record.has(item.product_name)) {
            record.add(item.product_name)
            productsName.push(item.product_name)
          }
        })
        this.setData({
          productDetails: data,
          productStr: productsName.join('，')
        })
        return this.data.baseInfo._id
      })
      .then(_id => {
        this.addViewCount(_id)
        wx.hideLoading()
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