const { init } = require('@cloudbase/wx-cloud-client-sdk')
const client = init(wx.cloud)
const models = client.models
Page({
  data: {
    menuPosition: wx.getMenuButtonBoundingClientRect(),
    notice: '欢迎使用 农产品产销平台 这里您可以发布您的农产品，也可以发布您的农产品需求~',
    produceData: 0,
    sellData: 0,
    selectedItemIndex: 1,
    farmerData: [

    ],
    sellerData: [

    ]
  },
  getProductDetail(e) {
    console.log(e)
    let data = e.currentTarget.dataset.id
    let productStr = JSON.stringify(data)
    wx.navigateTo({
      url: `../farmerOrder/farmerOrder?id=${productStr}`,
    })
  },

  getProductList(page, pageSize) {
    let prodcutDBName = 'PublishList'
    // this.getTotalCount(prodcutDBName)
    console.log('getProductList', page, pageSize)
    let that = this
    const db = wx.cloud.database();
    const _ = db.command
    db.collection(prodcutDBName).where({
      type: 0
    }).skip((page) * pageSize).limit(pageSize).orderBy('timestamp', 'desc').get({
      success: res => {
        console.log(res)
        if (page == 0) {
          this.setData({
            farmerData: res.data
          })
        } else {
          this.setData({
            farmerData: [...that.data.farmerData, ...res.data] // 合并新旧数据
          });
        }

      }
    });
  },
  getRequireList(page, pageSize) {
    let requireDBName = 'PublishList'
    // this.getTotalCount(requireDBName)
    let that = this
    const db = wx.cloud.database();
    const _ = db.command
    db.collection(requireDBName).where({
      type: 1
    }).skip((page) * pageSize).limit(pageSize).get({
      success: res => {
        if (page == 0) {
          this.setData({
            sellerData: res.data
          })
        } else {
          this.setData({
            sellerData: [...that.data.sellerData, ...res.data] // 合并新旧数据
          });
        }
      }
    });
  },
  onReachProductBottom(e) {
    console.log(e, 'hello')
    let product_page = this.data.page + 1
    let pageSize = this.data.pageSize
    console.log(product_page, pageSize)
    this.getProductList(product_page, 10)
    this.setData({
      product_page: product_page
    })
  },
  onReachRequireBottom(e) {
    console.log(e, 'hello')
    let require_page = this.data.page + 1
    let pageSize = this.data.pageSize
    console.log(require_page, pageSize)
    this.getProductList(require_page, 10)
    this.setData({
      require_page: require_page
    })
  },
  getTotalCount(dbName) {
    const db = wx.cloud.database()
    let that = this
    const _ = db.command
    db.collection(dbName).where({
      status: _.lt(2)
    }).count({
      success: res => {
        if (dbName == 'Product') {
          that.setData({
            productTotal: res.total
          })
        }
        if (dbName == 'Require') {
          that.setData({
            requireTotal: res.total
          })
        }
      }
    })
  },
  getProduceData() {
    // 获取当前时间
    const now = new Date();
    // 获取过去一天的时间
    const yesterday = new Date(now - 24 * 60 * 60 * 1000);
    // 转换为小程序数据库需要的时间格式（毫秒）
    const yesterdayTimestamp = yesterday.getTime();
    let produceData = 0
    let dbName = 'PublishList'
    const db = wx.cloud.database()
    let that = this
    const _ = db.command
    db.collection(dbName).where({
      status: _.lt(2),
      timestamp: _.gte(yesterdayTimestamp)
    }).get({
      success: res => {
        console.log(res, yesterdayTimestamp)
        let data = res.data
        for (let i = 0; i < data.length; i++) {
          produceData = produceData + data[i].capacity
        }
        that.setData({
          produceData: produceData
        })
      }
    })
  },
  getSellData() {

  },
  onLoad() {
    let that = this
    try {
      console.log('on load')

      that.setData({
        product_page: 0,
        require_page: 0,
        pageSize: 10,
        page_show_time: page_show_time
      })
    } catch (e) {
      wx.hideLoading()
    }
  },

  onShow() {
    this.getProductList(0, 10)
    this.getRequireList(0, 10)
    this.getProduceData()
  }
});
