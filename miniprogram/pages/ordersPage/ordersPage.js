// pages/ordersPage/ordersPage.js
import Dialog from '@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [
              {_id: '1', offerName: '销售商1', offerPhone: '12842945822', productName: 'a菇', amount: 10, price: 10.2},
              {_id: '2', offerName: '销售商1', offerPhone: '12842945822',productName: 'b菇', amount: 8, price: 8.3},
              {_id: '3', offerName: '销售商2', offerPhone: '12834945865',productName: 'a菇', amount: 7, price: 10.2},
              {_id: '4', offerName: '销售商1', offerPhone: '12842945822',productName: 'c菇', amount: 20, price: 11.2},
            ],
    orderCompleted: [
      {_id: '1', offerName: '销售商3', offerPhone: '12842945822', productName: 'd菇', credits: 4.6, amount: 10, price: 10.2},
      {_id: '2', offerName: '销售商4', offerPhone: '12842945823',productName: 'a菇', credits: 4.7,  amount: 8, price: 8.3},
      {_id: '3', offerName: '销售商3', offerPhone: '12834846754',productName: 'd菇', credits: 4.8,  amount: 7, price: 10.2},
      {_id: '4', offerName: '销售商5', offerPhone: '12842945824',productName: 'c菇', credits: 4.9,  amount: 20, price: 11.2},
            ],
    shownData: null,
    tabindex: 0,
    rateValue: 0,
    // 弹窗相关
    isCommentShow: false
  },
  onChangeTabs(event) {
    const {index} = event.detail
    console.log(index)
    var showData = null
    if(index === 0) {
      showData = this.data.orders
    } else {
      showData = this.data.orderCompleted
    }
    this.setData({
      shownData: showData,
      tabindex: index
    })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      shownData: this.data.orders
    })
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