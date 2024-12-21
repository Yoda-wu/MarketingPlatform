// pages/managePage/managePage.js
import Dialog from '@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adminUsers: [
      {_id: '1', name: '李一', phone: '12345678901', type: 2, avatarUrl: '/images/admin-icon.png'},
      {_id: '2', name: '陈二', phone: '12345678901', type: 2, avatarUrl: '/images/admin-icon.png'},
      {_id: '3', name: '张三', phone: '12345678901', type: 2, avatarUrl: '/images/admin-icon.png'},
    ],    
    normalUsers: [
      {_id: '4', name: 'GoGo', phone: '12345678901', type: 1, avatarUrl: '/images/admin-icon.png'},
      {_id: '5', name: 'Jeny', phone: '12345678901', type: 0, avatarUrl: '/images/admin-icon.png'},
      {_id: '6', name: 'Tony', phone: '12345678901', type: 1, avatarUrl: '/images/admin-icon.png'},
      {_id: '1', name: '李一', phone: '12345678901', type: 2, avatarUrl: '/images/admin-icon.png'},
      {_id: '2', name: '陈二', phone: '12345678901', type: 2, avatarUrl: '/images/admin-icon.png'},
      {_id: '3', name: '张三', phone: '12345678901', type: 2, avatarUrl: '/images/admin-icon.png'},
    ],
    roleMap: {0: '种植户', 1: '销售商', 2: '管理员'},
    tabindex: 0,
    searchValue: null,
    // 点击按钮之后的相关弹窗按钮
    isRemove: false,
    isSetAdmin: false,
    isSilent: false
  },
  onChangeTabs(event) {
    const {index} = event.detail
    const toShowData = index == 0 ? this.data.adminUsers : this.data.normalUsers
    this.setData({
      showData: toShowData,
      tabindex: index
    })
  },
  onSearch(event) {
    const value = this.data.searchValue
    if (value == null || value == '') {
      this.setData({
        showData: this.data.tabindex == 0 ? this.data.adminUsers : this.data.normalUsers
      })
      return
    }
    const curData = this.data.tabindex == 0 ? this.data.adminUsers : this.data.normalUsers
    const toShowData = [];
    for(var i = 0; i < curData.length; i ++) {
      if(curData[i].name == value) {
          toShowData.push(curData[i])
      }
    }
    this.setData({
      showData: toShowData,
      searchValue: null
    })
  },
  // 移除管理员
  removeAdmin(event) {
    const {removeAdminIndex} = event.target.dataset
    const adminToRemove = this.data.adminUsers[removeAdminIndex]
    console.log("remove " + adminToRemove._id + "-" + adminToRemove.name)
    Dialog.confirm({
      selector: "#remove-admin",
      title: '确认移除',
      message: `是否移除管理员: ${adminToRemove.name}`,
      width: '95%'
    })
      .then(() => {
        // confirm
        console.log('确认移除！')
      })
      .catch(() => {
        // cancel
        console.log('取消移除！')
      });
  
  },
  // 新增管理员
  setAdmin(event) {
    const {setAdminIndex} = event.target.dataset
    const adminToAdd = this.data.normalUsers[setAdminIndex]
    Dialog.confirm({
      selector: "#set-admin",
      title: '确认添加',
      message: `是否添加管理员: ${adminToAdd.name}？`,
      width: '95%'
    })
      .then(() => {
        // confirm
        console.log('确认添加！')
      })
      .catch(() => {
        // cancel
        console.log('取消添加！')
      });
  },
  // 禁言
  setSilent(event) {
    const {setSilentIndex} = event.target.dataset
    const userToSilent = this.data.normalUsers[setSilentIndex]

    Dialog.confirm({
      selector: "#set-silent",
      title: '确认禁言',
      message: `是否禁言用户: ${userToSilent.name}？`,
      width: '95%'
    })
      .then(() => {
        // confirm
        console.log('确认禁言！')
      })
      .catch(() => {
        // cancel
        console.log('取消禁言！')
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      showData: this.data.normalUsers
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