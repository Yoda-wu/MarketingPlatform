// pages/publishRequirePage/publishRequirePage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    NavigationBarTitle: '发布购买需求',
    // 渲染输入框
    InputList: [{
      'id': 'company_name',
      'title': '公司名称:',
      'placeholder': '请填写您的公司名称',
      'type': 'text',
      'maxlength': 50
    },
    {
      'id': 'product_name',
      'title': '需求产品:',
      'placeholder': '如:苹果，梨',
      'type': 'text',
      'maxlength': 50
    },
    {
      'id': 'capacity',
      'title': '需求大小（箱）:',
      'placeholder': '请填写您需要购买的数量',
      'type': 'text',
      'maxlength': 50
    },
    {
      'id': 'prices',
      'title': '产品价格（单位:元/箱）:',
      'placeholder': '请填写产品价格',
      'type': 'digit',
      'maxlength': 20
    },
    {
      'id': 'name',
      'title': '您的称呼:',
      'placeholder': '请问如何称呼您',
      'type': 'text',
      'maxlength': 8
    },
    {
      'id': 'phone',
      'title': '联系电话:',
      'placeholder': '请输入您的联系电话',
      'type': 'number',
      'maxlength': 11
    }
    ],
  },
  InputData(e) {
    console.log(e, e.detail)
    let key = e.currentTarget.id
    let requireInfo = this.data.requireInfo
    requireInfo[key] = e.detail.value

    this.setData({
      requireInfo: requireInfo
    })
  },
  ViewImage(e) {
    //TODO 
  },
  ChooseImage(e) {
    //TODO 
  },
  Submit(e) {
    wx.showLoading({
      mask: true,
      title: '正在提交...',
    })
    let requireInfo = this.data.requireInfo
    console.log(requireInfo)
    const dbName = 'Require'
    let user_id = requireInfo['user_id']
    let require_id = `product_${user_id}_${Date.now()}`
    let company_name = requireInfo['company_name']
    let product_name = requireInfo['product_name']
    let capacity = requireInfo['capacity']
    let prices = requireInfo['prices']
    let picture = '../../images/mushroom.jpg'
    let date = new Date(Date.now())
    let publish_time = date.toLocaleString()
    let status = 0 // 0： 正常 1：联系中 2：已成交
    let db = wx.cloud.database()
    db.collection(dbName).add({
      data: {
        require_id: require_id,
        user_id: user_id,
        company_name: company_name,
        product_name: product_name,
        capacity: capacity,
        status: status,
        prices: prices,
        picture: picture,
        publish_time: publish_time
      },
      success: (res) => {
        wx.hideLoading()
        wx.showToast({
          title: '发布成功',
          duration: 1000
        })
        wx.switchTab({
          url: '../index/index',
        })
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    let userInfo = wx.getStorageSync('userInfo')
    let requireInfo = {}
    requireInfo['user_id'] = userInfo['id']
    requireInfo['company_name'] = userInfo['company_name']
    requireInfo['name'] = userInfo['name']
    requireInfo['phone'] = userInfo['phone']
    let InputList = this.data.InputList
    InputList[0]['value'] = requireInfo['company_name']
    InputList[4]['value'] = requireInfo['name']
    InputList[5]['value'] = requireInfo['phone']
    this.setData({
      userInfo: userInfo,
      requireInfo: requireInfo,
      InputList: InputList
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