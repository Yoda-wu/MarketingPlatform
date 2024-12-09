// pages/publishpage/publishPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  NavigateToPages(e){
    let url = e.currentTarget.dataset.url
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    let backgroundcolor = e.currentTarget.dataset.backgroundcolor

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