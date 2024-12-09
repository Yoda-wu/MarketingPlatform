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

  // 提交注册账户信息
  SubmitFarmerRegister(e) {
    // 保存
    wx.showLoading({
      mask: true,
      title: '正在保存...',
    })
    // 执行存储逻辑
    // 合作社注册逻辑——入库
    let userInfo = this.data.userInfo
    let account = userInfo['account']
    let password = userInfo['password']
    let name = userInfo['name']
    let company_name = userInfo['company_name']
    let legal_name = userInfo['legal_name']
    let phone = userInfo['phone']
    let license = userInfo['license']
    let avatarUrl = userInfo['avatarUrl']
    let greenHouses = userInfo['greenHouses']
    let company_address = userInfo['company_address']
    let type = 'farmer'
    userInfo['type'] = type
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


  },
  SubmitSellerRegister(e) {
    // 保存
    wx.showLoading({
      mask: true,
      title: '正在保存...',
    })
    // 执行存储逻辑
    // 合作社注册逻辑——入库
    let userInfo = this.data.userInfo
    let account = userInfo['account']
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
    let type = 'seller'
    userInfo['type'] = type
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
          userInfo['password'] = ""
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