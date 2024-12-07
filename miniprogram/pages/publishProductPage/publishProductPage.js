// pages/publishProductPage/publishProductPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    NavigationBarTitle: '发布产品',
    InputList: [{
      'id': 'detailLocation',
      'title': '合作社:',
      'placeholder': '请输入合作社名称',
      'type': 'text',
      'maxlength': 50
  },
  {
      'id': 'location',
      'title': '供应品种:',
      'placeholder': '如:苹果，梨',
      'type': 'text',
      'maxlength': 50
  },
  {
      'id': 'furniture',
      'title': '供应能力（斤）:',
      'placeholder': '请填写供应产品多少',
      'type': 'text',
      'maxlength': 50
  },
  {
      'id': 'area',
      'title': '产品价格（元）:',
      'placeholder': '请填写产品的售价',
      'type': 'digit',
      'maxlength': 20
  },
  {
      'id': 'name',
      'title': '名称:',
      'placeholder': '请输入联系人姓名',
      'type': 'text',
      'maxlength': 8
  },
  {
      'id': 'phonenumber',
      'title': '联系电话:',
      'placeholder': '请输入您的联系电话',
      'type': 'number',
      'maxlength': 11
  }
  ],
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