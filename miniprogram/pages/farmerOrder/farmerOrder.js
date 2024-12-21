// pages/farmerOrder/farmerOrder.js
const db = wx.cloud.database()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    unit: '箱',
    showDialog: false,  // 展示下单弹窗
    orderamount: null,  // 下单数量
    targetOrder: null,  // 下单的产品
    totalcost: null,  // 总花费
    confirmOrder: false, // 是否已经确定下单
  },
  // 联系商家按钮
  callPhone(event) {
    wx.makePhoneCall({
      phoneNumber: this.data.baseInfo.phone,
    })
  },
  // 重置下单的相关数据
  resetOrderData() {
    this.setData({
      showDialog: false,
      orderamount: null,
      targetOrder: null,
      totalcost: null,
      confirmOrder: false
    })
  },
  // 点击产品的下单按钮
  takeOrder(event) {
    const { orderindex } = event.target.dataset
    const orderItem = this.data.productDetails[orderindex]
    console.log(orderItem)
    this.setData({
      showDialog: true,
      targetOrder: orderItem
    })
  },
  // 输入下单数字后，确定下单
  confirmOrder(event) {
    const amount = Number.parseInt(this.data.orderamount)
    if(isNaN(amount)) {  // 无效数字

      wx.showToast({
        title: '请输入有效数字',
        icon: "error",
      })
      this.resetOrderData()
      return
    } 
    if (amount > this.data.targetOrder.capcacity) {
      wx.showToast({
        title: '产品数量不足',
        icon: "error"
      })
      this.resetOrderData()
      return
    }

    const totalcost = amount * this.data.targetOrder.prices
    this.setData({
      orderamount: amount,
      confirmOrder: true,
      totalcost: totalcost.toFixed(2),
      showDialog: false,
    })
  },
  // 确如完成，点击确认，二次确认后创建订单
  executeOrder() {
    console.log("执行订单！")
    
    const app = getApp()
    const userInfo = app.globalData.userInfo;
    console.log(userInfo)
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
        user_id: userID
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
    // const {userID} = options  TODO
    const _id = "0e839fa467668e2701a7edd23b103254"
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
      .then(_id => {  // 浏览量+1
        this.addViewCount(_id)
        wx.hideLoading()
      })
    // 
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