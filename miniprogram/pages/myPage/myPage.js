// pages/myPage/myPage.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    UserLogin: false
  },
  NavigateToLogin(e) {
    wx.navigateTo({
      url: '../login/login',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    app.IsLogon()

    console.log(app.globalData)
    // 全局变量
    let globalData = app.globalData
    let userInfo = globalData.userInfo
    userInfo['phone'] = userInfo['phone'].replace(userInfo['phone'].substring(3, 7), "****")
    console.log('UserLogin', globalData.UserLogin)
    this.setData({
      UserLogin: globalData.UserLogin,
      userInfo: userInfo
    })
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