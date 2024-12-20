// const { default: backend } = require("XrFrame/kanata/lib/backend")

// pages/login/login.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: '',
    license: [],
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
  NavigateToRegister(e) {
    console.log('before', this.isRegister)
    this.setData({
      isRegister: true
    })
    console.log('after', this.isRegister)
  },
  changeRegion(e) {
    console.log(e)
    let sale_scope = e.detail.value[0]
    let id = 'sale_scope'
    let userInfo = this.data.userInfo
    userInfo[id] = sale_scope
    this.setData({
      userInfo: userInfo,
      region: sale_scope
    })
  },
  InputData(e) {
    console.log(e, e.currentTarget.id, e.detail.value)
    let userInfo = this.data.userInfo
    let id = e.currentTarget.id
    let value = e.detail.value
    userInfo[id] = value
    this.setData({
      userInfo
    })
  },
  ViewImage(e) {
    console.log(e.currentTarget.dataset.url)
    console.log(this.data.license)
    console.log
    wx.previewImage({
      urls: this.data.license,
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
          let license = []
          this.setData({
            license: license
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
    let userInfo = this.data.userInfo
    let file_extension = this.getFileExtension(image_path)
    return new Promise((resolve, reject) => {
      wx.cloud.uploadFile({
        cloudPath: `license/${Date.now()}.${file_extension}`, // 对象存储路径，根路径直接填文件名，文件夹例子 test/文件名，不要 / 开头
        filePath: image_path, // 微信本地文件，通过选择图片，聊天文件等接口获取
        config: {
          env: app.globalData.env // 需要替换成自己的微信云托管环境ID
        },
        success: res => {
          resolve(res)
          // console.log(res.fileID)
          // userInfo['license'] = res.fileID
          // console.log(userInfo)
          // that.setData({
          //   userInfo: userInfo
          // })
          // wx.showToast({
          //   title: '上传成功',
          //   duration: 500,
          // })
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
          license: [res.tempFiles[0].tempFilePath]
        })
        // that.uploadImage(res.tempFiles[0].tempFilePath)
      }
    })


  },
  // 提交注册账户信息
  SubmitFarmerRegister(e) {
    // 保存
    wx.showLoading({
      mask: true,
      title: '正在保存...',
    })
    let that = this
    let licenses = that.data.license
    this.uploadImage(licenses[0]).then((res) => {
      console.log(res)
      let userInfo = that.data.userInfo
      let account = userInfo['account']
      let id = `${account}_${Date.now()}`
      userInfo['id'] = id
      let password = userInfo['password']
      let name = userInfo['name']
      let company_name = userInfo['company_name']
      let legal_name = userInfo['legal_name']
      let phone = userInfo['phone']
      let license = res.fileID
      userInfo['license'] = license
      let avatarUrl = userInfo['avatarUrl']
      let greenHouses = parseInt(userInfo['greenHouses'])
      let company_address = userInfo['company_address']
      let type = 0 // 0：种植户 1：小说是 2：管理员
      let status = 0 // 0： 正常 1：被举报 2：禁言
      userInfo['type'] = type
      userInfo['status'] = status
      userInfo['rating'] = 5.0
      const dbName = 'UserList'
      wx.cloud.callFunction({
        name: 'queryUser',
        data: {
          account: account,
          password: '',
          type: 'NORMAL'
        },
        success: (res) => {
          console.log('res', res)
          let result = res.result.data

          if (result.length) {
            wx.showToast({
              title: '账号已存在，请去登录或者更换账户',
              icon: 'none',
              duration: 3000
            })
          } else {
            let db = wx.cloud.database()
            console.log('hello', license)
            db.collection(dbName).add({
              data: {
                id: id,
                account: account,
                password: password,
                name: name,
                company_name: company_name,
                legal_name: legal_name,
                phone: phone,
                license: license,
                type: type,
                avatarUrl: avatarUrl,
                greenHouses: greenHouses,
                company_address: company_address,
                status: status,
                rating: 5.0
              },
              success: (res) => {
                if (res.errMsg == 'collection.add:ok') {
                  wx.hideLoading()
                  wx.showToast({
                    title: '恭喜,注册成功！',
                    icon: 'none',
                    duration: 1000
                  })
                  wx.setStorageSync('userInfo', userInfo)
                  wx.switchTab({
                    url: '../index/index',
                  })
                } else {
                  wx.showToast({
                    title: '网络错误，注册失败，请检查网络后重试！',
                    icon: 'none',
                    duration: 1000
                  })
                }
              },
              fail: (res) => {
                wx.hideLoading()
                console.log('register farmer err', err)
              }
            })
          }
        }
      })

    })
  },
  SubmitSellerRegister(e) {
    // 保存
    wx.showLoading({
      mask: true,
      title: '正在保存...',
    })
    wx.showLoading({
      mask: true,
      title: '正在保存...',
    })
    let that = this
    let licenses = that.data.license
    this.uploadImage(licenses[0]).then(() => {
      // 执行存储逻辑
      // 合作社注册逻辑——入库
      let userInfo = this.data.userInfo
      let account = userInfo['account']
      let id = `${account}_${Date.now()}`
      userInfo['id'] = id
      let password = userInfo['password']
      let name = userInfo['name']
      let company_name = userInfo['company_name']
      let legal_name = userInfo['legal_name']
      let phone = userInfo['phone']
      let license = userInfo['license']
      let avatarUrl = userInfo['avatarUrl']
      let sale_scope = userInfo['sale_scope']
      let bussiness_scope = userInfo['bussiness_scope']
      let company_address = userInfo['company_address']
      let type = 1
      let status = 0 // 0： 正常 1：账户审核中 2：禁言
      userInfo['rating'] = 5.0
      userInfo['type'] = type
      userInfo['status'] = status
      const dbName = 'UserList'
      wx.cloud.callFunction({
        name: 'queryUser',
        data: {
          account: account,
          password: '',
          type: 'NORMAL'
        },
        success: (res) => {
          console.log('res', res)
          let result = res.result.data

          if (result.length) {
            wx.showToast({
              title: '账号已存在，请去登录或者更换账户',
              icon: 'none',
              duration: 3000
            })
          } else {
            let db = wx.cloud.database()
            db.collection(dbName).add({
              data: {
                id: id,
                account: account,
                password: password,
                name: name,
                company_name: company_name,
                legal_name: legal_name,
                phone: phone,
                license: license,
                type: type,
                avatarUrl: avatarUrl,
                sale_scope: sale_scope,
                company_address: company_address,
                bussiness_scope: bussiness_scope,
                status: status,
                rating: 5.0
              },
              success: (res) => {
                if (res.errMsg == 'collection.add:ok') {
                  wx.hideLoading()
                  wx.showToast({
                    title: '恭喜,注册成功！',
                    icon: 'none',
                    duration: 1000
                  })
                  wx.setStorageSync('userInfo', userInfo)
                  wx.switchTab({
                    url: '../index/index',
                  })
                } else {
                  wx.showToast({
                    title: '网络错误，注册失败，请检查网络后重试！',
                    icon: 'none',
                    duration: 1000
                  })
                }
              },
              fail: (res) => {
                wx.hideLoading()
                console.log('register farmer err', err)
              }
            })
          }
        }
      })
    })

  },


  SubmitLogin(e) {
    wx.showLoading({
      mask: true,
      title: '正在登录...',
    })
    let userInfo = this.data.userInfo
    // 执行读取逻辑
    let that = this
    wx.cloud.callFunction({
      name: 'queryUser',
      data: {
        account: userInfo.account,
        password: userInfo.password,
        type: 'LOGIN'
      },
      success: res => {
        wx.hideLoading()
        console.log('res', res)
        let result = res.result.data

        if (result.length) {
          userInfo['id'] = result[0].id
          userInfo['openId'] = result[0]._openid
          userInfo['name'] = result[0].name
          userInfo['phone'] = result[0].phone
          userInfo['company_name'] = result[0].company_name
          userInfo['legal_name'] = result[0].legal_name
          userInfo['type'] = result[0].type
          userInfo['avatarUrl'] = result[0].avatarUrl
          userInfo['company_address'] = result[0].company_address
          userInfo['greenHouses'] = result[0].greenHouses
          userInfo['rating'] = result[0].rating
          userInfo['bussiness_scope'] = result[0].bussiness_scope
          userInfo['sale_scope'] = result[0].sale_scope
          userInfo['license'] = result[0].license
          userInfo['status'] = result[0].status
          userInfo['password'] = ""
          app.globalData.UserLogin = true
          that.setData({
            userInfo
          })
          wx.hideLoading()
          wx.showToast({
            title: '恭喜,登录成功！',
            icon: 'none',
            duration: 800
          })
          wx.setStorageSync('userInfo', userInfo)
          wx.switchTab({
            url: '../index/index',
          })
        } else {
          wx.showToast({
            title: '账户密码错误！',
            icon: 'none',
            duration: 2500,
            mask: true,
          })
        }
      }

    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    wx.getUserInfo({
      success: (res) => {
        console.log(res)
        let userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        var userData = {
          'userInfo': userInfo,
          'nickName': nickName,
          'avatarUrl': avatarUrl,
          'gender': gender,
          'province': province,
          'city': city,
          'country': country,
        }
        that.setData({
          userInfo: userData
        })
      }
    }
    )
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