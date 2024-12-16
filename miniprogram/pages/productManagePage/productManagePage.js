// pages/productManagePage/productManagePage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    supplyData: [],
    products: [

    ]
  },

  EditSupply(e) {
    console.log(e)
    let supplyData = this.data.supplyData
    let index = e.currentTarget.id
    let supplyProduct = supplyData[index]
    console.log(supplyProduct)
  },
  getProductList() {
    let userInfo = this.data.userInfo
    let prodcutDBName = 'PublishList'

    const db = wx.cloud.database();

    return db.collection(prodcutDBName).where({
      type: 0,
      user_id: userInfo.id
    }).orderBy('timestamp', 'desc').get();
  },
  getOrderList() {
    let userInfo = this.data.userInfo
    let prodcutDBName = 'OrderList'
    const db = wx.cloud.database();
    return db.collection(prodcutDBName).where({
      type: 0,
      farmer_id: userInfo.id
    }).get();
  },
  getProductTotalInfo() {
    let that = this
    this.getProductList().then(res => {
      console.log(res)
      that.setData({
        supplyData: res.data
      })
      let products = []
      let supplyData = that.data.supplyData
      let product_dict = {}
      let today_timestamp = Date.now()
      let today_date = new Date(today_timestamp)
      let today_month = today_date.getMonth() + 1
      let today_year = today_date.getFullYear()
      let today_day = today_date.getDate()
      for (let i = 0; i < supplyData.length; i++) {
        let product_name = supplyData[i].product_name
        let product_icon = supplyData[i].icon
        let capacity = supplyData[i].capacity
        let timestamp = supplyData[i].timestamp
        let date = new Date(timestamp)
        let year = date.getFullYear(); // 年份
        let month = date.getMonth() + 1; // 月份（0-11）
        let day = date.getDate(); // 日（1-31） 
        if (product_dict[product_name] == null) {
          product_dict[product_name] = {
            'name': product_name
          }
          product_dict[product_name]['stock'] = 0
          product_dict[product_name]['todayProduction'] = 0
          product_dict[product_name]['todaySales'] = 0
          product_dict[product_name]['totalSales'] = 0
          product_dict[product_name]['icon'] = product_icon
        }
        console.log(product_name, capacity)
        product_dict[product_name]['stock'] += capacity
        console.log(year, today_year, month, today_month, day, today_day)
        if (year == today_year && month == today_month && day == today_day) {
          product_dict[product_name]['todayProduction'] += capacity
        }
      }
      console.log(product_dict)
      for (let key in product_dict) {
        products.push(product_dict[key]);
      }
      that.setData({
        products: products
      })
    }
    )
    console.log('hello')

  },
  getRequireTotalInfo() {
    let requireDBName = 'PublishList'
    let that = this
    let userInfo = that.data.userInfo
    const db = wx.cloud.database();
    const _ = db.command
    db.collection(requireDBName).where({
      type: 1,
      user_id: userInfo.id
    }).orderBy('timestamp', 'desc').get({
      success: res => {

        this.setData({
          requireData: res.data
        })

      }

    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // wx.showLoading({
    //   title: '加载中..',
    // })
    let userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: userInfo
    })
    if (userInfo.type == 0) {
      this.getProductTotalInfo()
    } else {
      this.getRequireTotalInfo()
    }

    // wx.hideLoading()
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