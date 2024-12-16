// pages/publishpage/publishPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  NavigateToPages(e) {
    let isForbit = false
    if (isForbit) {
      wx.showToast({
        title: '你现在被管理员禁言了，请向管理员申请解禁',
        mask: true,
        duration: 2000,
        icon: 'error'
      })
      return
    }
    let userInfo = this.data.userInfo
    console.log('hello', userInfo)
    if (userInfo.type == null) {
      wx.showToast({
        title: '请先登录 ',
        mask: true,
        duration: 2000,
        icon: 'error'
      })
      return
    }
    let user_type = userInfo.type
    const FARMER = 0
    const SELLER = 1
    let url = e.currentTarget.dataset.url
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    let backgroundcolor = e.currentTarget.dataset.backgroundcolor
    if (user_type == FARMER && id == 'require') {
      wx.showToast({
        title: '只有销售商才能发布产品需求 ',
        mask: true,
        duration: 2000,
        icon: 'none'
      })
      return
    }
    console.log(user_type, id)
    if (user_type == SELLER && id == 'product') {
      wx.showToast({
        title: '只有种植户才能发布产品 ',
        mask: true,
        duration: 2000,
        icon: 'none'
      })
      return
    }
    console.log(e, url, id, title)
    wx.navigateTo({
      url: `${url}?id=${id}&title=${title}&backgroundcolor=${backgroundcolor}`,
      success: function (res) {
        console.log('res', res)
      },
      fail: function (err) {
        console.log('err', err)
      }
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
    let userInfo = wx.getStorageSync('userInfo')
    let isForbit = false
    if (userInfo['status'] == 2) {
      isForbit = true
    }
    this.setData({
      userInfo: userInfo,
      isForbit: isForbit
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