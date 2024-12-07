// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: '',
    regions: [
      '北京市', '天津市', '河北省', '山西省', '内蒙古自治区', '辽宁省',
      '吉林省', '黑龙江省', '上海市', '江苏省', '浙江省', '安徽省',
      '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省',
      '广东省', '广西壮族自治区', '海南省', '重庆市', '四川省',
      '贵州省', '云南省', '西藏自治区', '陕西省', '甘肃省', '青海省',
      '宁夏回族自治区', '新疆维吾尔自治区', '香港特别行政区', '澳门特别行政区'
    ],
    isRegister: false
  },
  // 导航到注册界面
  NavigateToRegister(e){
    console.log('before',this.isRegister)
    this.setData({
      isRegister:true
    })
    console.log('after',this.isRegister)
  },
  // 提交注册账户信息
  SubmitRegister(e){
    // 保存
    wx.showLoading({
      mask: true,
      title: '正在保存...',
    })
    // 执行存储逻辑
    // 合作社注册逻辑——入库
    // 销售商注册逻辑——入库，状态设置为待审核
    setTimeout(function(){
      wx.hideLoading()
      wx.showToast({
        title: '恭喜,注册成功！',
        icon: 'none',
        duration: 1000
      })
    }, 300 )
    wx.switchTab({
      url: '../index/index',
    }) 
  },
  SubmitLogin(e){
    wx.showLoading({
      mask: true,
      title: '正在登录...',
    })
    // 执行读取逻辑
    // 验证账号密码是否正确
    setTimeout(function(){
      wx.hideLoading()
      wx.showToast({
        title: '恭喜,登录成功！',
        icon: 'none',
        duration: 800
      })
    }, 300 )
    wx.switchTab({
      url: '../index/index',
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