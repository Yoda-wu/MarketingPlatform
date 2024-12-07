// pages/publishRequirePage/publishRequirePage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    NavigationBarTitle: '发布购买需求',
    // 渲染输入框
    InputList: [{
        'id': 'detailLocation',
        'title': '公司名称:',
        'placeholder': '请填写您的公司名称',
        'type': 'text',
        'maxlength': 50
    },
    {
        'id': 'location',
        'title': '需求产品:',
        'placeholder': '如:苹果，梨',
        'type': 'text',
        'maxlength': 50
    },
    {
        'id': 'furniture',
        'title': '需求大小（斤）:',
        'placeholder': '请填写您需要购买的数量',
        'type': 'text',
        'maxlength': 50
    },
    {
        'id': 'area',
        'title': '期望价格(单位:元):',
        'placeholder': '请填您期望的价格数目',
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