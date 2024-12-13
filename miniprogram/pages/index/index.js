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
    }).skip((page - 1) * pageSize).limit(pageSize).get({
      success: res => {
        this.setData({
          sellerData: [...that.data.sellerData, ...res.data] // 合并新旧数据
        });
      }
    });
  },
  onReachBottom(e) {
    console.log(e, 'hello')
    let page = this.data.page
    let pageSize = this.data.pageSize
    console.log(page + 1, pageSize)
    this.getProductList(page + 1, 10)
    console.log(page, pageSize)
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
        page: 0,
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
    })
    this.getProductList(0, 10)
    wx.hideLoading()

  }
});
