const { init } = require('@cloudbase/wx-cloud-client-sdk')
const client = init(wx.cloud)
const models = client.models
Page({
  data: {
    menuPosition: wx.getMenuButtonBoundingClientRect(),
    notice: '欢迎使用 农产品产销平台 这里您可以发布您的农产品，也可以发布您的农产品需求~',

    selectedItemIndex: 1,
    farmerData: [

    ],
    sellerData: [

    ]
  },
  getProductDetail(e) {
    console.log(e)
  },

  getProductList(page, pageSize) {
    let prodcutDBName = 'Product'
    this.getTotalCount(prodcutDBName)
    console.log('getProductList', page, pageSize)
    let that = this
    const db = wx.cloud.database();
    const _ = db.command
    db.collection(prodcutDBName).where({
      status: _.lt(2)
    }).skip((page) * pageSize).limit(pageSize).get({
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
    let requireDBName = 'Require'
    this.getTotalCount(requireDBName)
    let that = this
    const db = wx.cloud.database();
    const _ = db.command
    db.collection(requireDBName).where({
      status: _.lt(2)
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
    wx.showToast({
      title: '',
      duration: 500,
    })
    this.getProductList(0, 10)
    this.getRequireList(0, 10)

  }
});
