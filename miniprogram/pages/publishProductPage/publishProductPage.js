// pages/publishProductPage/publishProductPage.js
var app = getApp()
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
      'type': 'number',
      'maxlength': 50
    },
    {
      'id': 'prices',
      'title': '预期价格（单位:元/箱）:',
      'placeholder': '请填写产品的预期价格',
      'type': 'number',
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
    productInfo: {},
    pictures: []

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
    let pictures = that.data.pictures
    this.uploadImage(pictures[0]).then((res) => {
      console.log(res)
      let productInfo = that.data.productInfo
      const dbName = 'PublishList'
      let user_id = productInfo['user_id']
      let timestamp = Date.now()
      let product_id = `product_${user_id}_${timestamp}`
      let company_name = productInfo['company_name']
      let product_name = productInfo['product_name']
      let capacity = parseInt(productInfo['capacity'])
      let prices = parseFloat(productInfo['prices'])
      let picture = res.fileID
      let date = new Date(timestamp)
      let publish_time = date.toLocaleString()
      let status = 0 // 0： 正常 1：联系中 2：已成交
      let type = 0 // 0: 产品 1：需求
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
          publish_time: publish_time,
          timestamp: timestamp,
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