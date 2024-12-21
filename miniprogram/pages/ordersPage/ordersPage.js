// pages/ordersPage/ordersPage.js
import dbBehavior from './db'
const db = wx.cloud.database()

Page({
  behaviors: [dbBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    shownData: null,
    tabindex: 0,
    rateValue: 0,
    // 弹窗相关
    isCommentShow: false
  },
  onChangeTabs(event) {
    const {index} = event.detail
    var showData = null
    this.setData({
      tabindex: index
    })
    this.setShownData();
  },
  onConcat(event) {
    const {orderIndex} = event.target.dataset
    const phone = this.data.shownData[orderIndex].offerPhone
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  onComplete(event) {
    wx.showModal({
      title: '完成订单',
      content: '确认订单已完成？',
      complete: (res) => {
        if (res.confirm) {
          this.setData({
            isCommentShow: true
          })
        }
      },
    })
  },
  
  onDeletOrder(event) {
    wx.showModal({
      title: '删除订单',
      content: '是否删除订单？',
      complete: (res) => {
        if (res.cancel) {
          
        }
    
        if (res.confirm) {
          
        }
      }
    })
  },
  onConfirmRating(event) {
    console.log(this.data.rateValue)

  },
  onCancelRating(event) {
    console.log("取消评分！")
  },

  onCancleOrder(event) {
    wx.showModal({
      title: '取消订单',
      content: '是否取消订单？',
      complete: (res) => {
        if (res.cancel) {
          
        }
    
        if (res.confirm) {
          
        }
      }
    })
  },
  setShownData(){
    this.setData({
      shownData: this.data.tabindex === 0 ? this.data.ordersUnCompleted : this.data.ordersCompleted
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getUserOrders()
    this.setShownData();
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