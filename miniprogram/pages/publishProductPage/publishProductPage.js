// pages/publishProductPage/publishProductPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    NavigationBarTitle: '发布产品',
    InputList: [{
      'id': 'company_name',
      'title': '合作社:',
      'placeholder': '请输入合作社名称',
      'type': 'text',
      'maxlength': 50,
      'value': '',
    },
    {
      'id': 'product_name',
      'title': '供应品种:',
      'placeholder': '如: 蘑菇',
      'type': 'text',
      'maxlength': 50
    },
    {
      'id': 'capacity',
      'title': '供应能力（箱）:',
      'placeholder': '请填写供应产品多少',
      'type': 'text',
      'maxlength': 50
    },
    {
      'id': 'prices',
      'title': '预期价格（单位:元/箱）:',
      'placeholder': '请填写产品的预期价格',
      'type': 'digit',
      'maxlength': 20
    },
    {
      'id': 'name',
      'title': '联系人姓名:',
      'placeholder': '请输入联系人姓名',
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
    productInfo: {}

  },
  InputData(e) {
    console.log(e, e.detail)
    let key = e.currentTarget.id
    let productInfo = this.data.productInfo
    productInfo[key] = e.detail.value

    this.setData({
      productInfo: productInfo
    })
  },

  Submit(e) {

    wx.showLoading({
      mask: true,
      title: '正在提交...',
    })
    let productInfo = this.data.productInfo
    console.log(productInfo)
    const dbName = 'Product'
    let user_id = productInfo['user_id']
    let product_id = `product_${user_id}_${Date.now()}`
    let company_name = productInfo['company_name']
    let product_name = productInfo['product_name']
    let capacity = productInfo['capacity']
    let prices = productInfo['prices']
    let picture = '../../images/mushroom.jpg'
    let date = new Date(Date.now())
    let publish_time = date.toLocaleString()
    let status = 0 // 0： 正常 1：联系中 2：已成交
    let db = wx.cloud.database()
    db.collection(dbName).add({
      data: {
        product_id: product_id,
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
    let userInfo = wx.getStorageSync('userInfo')
    let productInfo = {}
    productInfo['user_id'] = userInfo['id']
    productInfo['company_name'] = userInfo['company_name']
    productInfo['name'] = userInfo['name']
    productInfo['phone'] = userInfo['phone']
    let InputList = this.data.InputList
    InputList[0]['value'] = productInfo['company_name']
    InputList[4]['value'] = productInfo['name']
    InputList[5]['value'] = productInfo['phone']
    this.setData({
      userInfo: userInfo,
      productInfo: productInfo,
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