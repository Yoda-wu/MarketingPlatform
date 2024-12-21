const { init } = require('@cloudbase/wx-cloud-client-sdk')
const client = init(wx.cloud)
const models = client.models
Component({
  data: {
    produceData: 400,
    sellData: 200,
    selectedItemIndex: 1,
    farmerData: [

    ],
    sellerData: [

    ]
  },
  methods: {
 
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
      this.getProduceData()
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
  }}
});
