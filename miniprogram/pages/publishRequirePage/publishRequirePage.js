// pages/publishRequirePage/publishRequirePage.js
var app = getApp()
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
      'type': 'digit',
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
    pictures: []
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
    console.log(e.currentTarget.dataset.url)
    console.log(this.data.pictures)
    console.log
    wx.previewImage({
      urls: this.data.pictures,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除这张照片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          let pictures = []
          this.setData({
            pictures: pictures
          })
        }
      }
    })
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
  uploadImage(image_path) {
    let that = this
    let pictures = this.data.pictures
    let file_extension = this.getFileExtension(image_path)
    return new Promise((resolve, reject) => {
      wx.cloud.uploadFile({
        cloudPath: `product/${Date.now()}.${file_extension}`, // 对象存储路径，根路径直接填文件名，文件夹例子 test/文件名，不要 / 开头
        filePath: image_path, // 微信本地文件，通过选择图片，聊天文件等接口获取
        config: {
          env: app.globalData.env // 需要替换成自己的微信云托管环境ID
        },
        success: res => {
          resolve(res)
        },
        fail: err => {
          reject(err)
        }
      })
    })

  },
  ChooseImage(e) {
    //TODO 
    let that = this
    console.log(e)
    return wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        console.log(res)
        that.setData({
          pictures: [res.tempFiles[0].tempFilePath]
        })
        // that.uploadImage(res.tempFiles[0].tempFilePath)
      }
    })


  },
  Submit(e) {
    wx.showLoading({
      mask: true,
      title: '正在提交...',
    })
    let that = this
    let requireInfo = this.data.requireInfo

    this.uploadImage(pictures[0]).then((res) => {
      console.log(requireInfo)
      const dbName = 'PublishList'
      let user_id = requireInfo['user_id']
      let require_id = `product_${user_id}_${Date.now()}`
      let company_name = requireInfo['company_name']
      let product_name = requireInfo['product_name']
      let capacity = parseInt(requireInfo['capacity'])
      let prices = parseFloat(requireInfo['prices'])
      let picture = res.fileID
      let date = new Date(Date.now())
      let publish_time = date.toLocaleString()
      let status = 0 // 0： 正常 1：联系中 2：已成交
      let type = 1 // 0: 产品 1：需求
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
          publish_time: publish_time,
          type: type
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
        },
        fail: (res) => {
          wx.hideLoading()
          wx.showToast({
            title: '网络不好',
            duration: 1000,
          })
        }

      })
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