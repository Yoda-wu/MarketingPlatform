// pages/myInfoPage/myInfoPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    FarmerUserInfoList: [
      {
        'key': '公司名称',
        'id': 'company_name',
        'value': 'xxx'
      },
      {
        'key': '公司地址',
        'id': 'company_address',
        'value': 'xxx'
      },
      {
        'key': '法人代表',
        'id': 'legal_name',
        'value': 'xxx'
      },
      {
        'key': '联系方式',
        'id': 'phone',
        'value': 'xxx'
      },
      {
        'key': '大棚数量',
        'id': 'greenhouses',
        'value': 'xxx'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const FARMER = 'farmer'
    let userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo)
    if (userInfo.type == FARMER) {
      let title = '合作社信息'

      let FarmerUserInfoList = this.data.FarmerUserInfoList
      FarmerUserInfoList.forEach((item) => {
        item['value'] = userInfo[item['id']]
      })
      this.setData({
        title: title,
        userInfo: userInfo,
        FarmerUserInfoList: FarmerUserInfoList
      })
    }
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