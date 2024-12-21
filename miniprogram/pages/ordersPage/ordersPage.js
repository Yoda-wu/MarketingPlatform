// pages/ordersPage/ordersPage.js
import dbBehavior from './db'
Page({
  behaviors: [dbBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    tabindex: 0,
    rateValue: 0,
    curOrderID: null,
    // 弹窗相关
    isCommentShow: false
  },
  onChangeTabs(event) {
    const {index} = event.detail
    this.setData({
      tabindex: index
    })
    this.setShownData();
  },
  onContact(event) {
    const {orderIndex} = event.target.dataset
    const phone = this.data.shownData[orderIndex].otherInfo.phone
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  async onComplete(event) {
    isFinite
    const {orderIndex} = event.target.dataset
    const targetOrder = this.data.shownData[orderIndex]
    // this.data.ordersCompleted;
    wx.showModal({
      title: '完成订单',
      content: '确认订单已完成？',
      complete: (res) => {
        if (res.confirm) {
          this.setData({
            isCommentShow: true
          })
          this.completeOrder(targetOrder._id)
          const len = this.data.ordersUnCompleted.length
          for(var i = orderIndex; i < len - 1; i ++) {
            this.data.ordersUnCompleted[i] = this.data.ordersUnCompleted[i + 1]
          }
          this.data.ordersUnCompleted.length = len - 1
          console.log(this.data.ordersUnCompleted)
          this.data.ordersCompleted.push(targetOrder)
          this.setData({
            curOrderID: targetOrder._id
          })
          this.setShownData();
        }
      },
    })
  },
  
  async onConfirmRating(event) {
    const rating = this.data.rateValue;
    const orderID = this.data.curOrderID
    this.ratingOrder(orderID, rating)
    for(var i = 0; i < this.data.ordersCompleted.length; i ++) {
      if(this.data.ordersCompleted[i]._id === orderID) {
        this.data.ordersCompleted[i].rating = rating
        break
      }
    }
    this.setData({
      rating: null
    })
  },
  onCancelRating(event) {
    console.log("取消评分！")
    this.setData({
      rating: null
    })
  },

  onCancleOrder(event) {
    // console.log(event)
    const {orderIndex} = event.target.dataset
    wx.showModal({
      title: '取消订单',
      content: '是否取消订单？',
      complete: (res) => {  
        if (res.confirm) {
          this.deleteOrder(orderIndex)
            .then(res => {
              console.log(res)
              wx.showToast({
                title: '删除成功',
                icon: 'success'
              })
              const len = this.data.ordersUnCompleted.length
              for(var i = orderIndex; i < len - 1; i ++) {
                this.data.ordersUnCompleted[i] = this.data.ordersUnCompleted[i + 1]
              }
              this.data.ordersUnCompleted.length = len - 1
              this.setData({
                ordersUnCompleted: this.data.ordersUnCompleted
              })
              this.setShownData()
            })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const app = getApp();
    const userInfo = app.globalData.userInfo;
    this.setData({
      userInfo: userInfo
    })
    this.getUserOrders()
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