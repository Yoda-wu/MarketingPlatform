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
  Navigate(e) {
    console.log(e, e.currentTarget.dataset.url,)
    let url = e.currentTarget.dataset.url
    let userLogin = this.data.UserLogin
    let userInfo = this.data.userInfo
    console.log(userInfo)
    if (userLogin) {
      wx.navigateTo({
        url: url,
      })
    } else {
      // 提示登录
      wx.showToast({
        title: '你还未登录，请先登录！',
        icon: 'none',
        duration: 2500,
        mask: true,
      })
    }
  },
  getFileExtension(filename) {
    // 查找最后一个点的位置
    const lastIndex = filename.lastIndexOf('.');
    // 如果没有找到点或者点是文件名的最后一个字符，则没有后缀名
    if (lastIndex === -1 || lastIndex === filename.length - 1) {
      return '';
    }
    // 截取并返回后缀名
    return filename.substring(lastIndex + 1);
  },
  async uploadAvatar(path) {
    let that = this
    let userInfo = this.data.userInfo
    let file_extension = this.getFileExtension(path)
    wx.cloud.uploadFile({
      cloudPath: `avatar/${Date.now()}.${file_extension}`, // 对象存储路径，根路径直接填文件名，文件夹例子 test/文件名，不要 / 开头
      filePath: path, // 微信本地文件，通过选择图片，聊天文件等接口获取
      config: {
        env: 'schoolmap-7gbh91vx48c69c86' // 需要替换成自己的微信云托管环境ID
      },
      success: res => {
        console.log(res.fileID)
        userInfo['avatarUrl'] = res.fileID
        console.log(userInfo)
        that.setData({
          userInfo: userInfo
        })
        wx.setStorageSync('userInfo', userInfo)
        wx.showToast({
          title: '上传成功',
          duration: 500,
        })
      },
      fail: err => {
        console.error(err)
      }
    })
  },
  ChooseAvatar(e) {
    console.log(e)
    let avatarTempPath = e.detail.avatarUrl
    this.uploadAvatar(avatarTempPath)
  },
  SwitchAccount() {
    this.setData({
      UserLogin: false,
      userInfo: {}
    })
    app.globalData.UserLogin = false
    wx.clearStorage()
    wx.navigateTo({
      url: '../login/login',
    })
  },
  Logout() {
    this.setData({
      UserLogin: false,
      userInfo: {}
    })
    app.globalData.UserLogin = false
    wx.clearStorage()
    wx.showToast({
      title: '您已退出账号',
      duration: 1500,
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