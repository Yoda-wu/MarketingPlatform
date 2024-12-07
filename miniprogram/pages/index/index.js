const { init } = require('@cloudbase/wx-cloud-client-sdk')
const client = init(wx.cloud)
const models = client.models
Page({
  data: {
    menuPosition: wx.getMenuButtonBoundingClientRect(),
    notice:'欢迎使用 农产品产销平台 这里您可以发布您的农产品，也可以发布您的农产品需求~',

    selectedItemIndex: 1,
    tipShow:false,
    title:"",
    desc:"",
    url:"",
    isPreview:false,
    storeList:[],
    storeTotal:0,
    productList:[],
    productTotal:0,
    sellData: 200,
    produceData: 300,
    sellerData: [
      { seller: '合作社A', product: '蘑菇', price: '8.00元/斤', amount: '100斤' },
      { seller: '合作社B', product: '蘑菇', price: '8.10元/斤', amount: '60斤' },
      { seller: '合作社C', product: '蘑菇', price: '8.20元/斤', amount: '50斤' },
      { seller: '合作社D', product: '蘑菇', price: '7.90元/斤', amount: '110斤' },
      { seller: '合作社E', product: '蘑菇', price: '7.80元/斤', amount: '120斤' },
      { seller: '合作社F', product: '蘑菇', price: '7.80元/斤', amount: '120斤' },
      { seller: '合作社G', product: '蘑菇', price: '7.80元/斤', amount: '120斤' },
      { seller: '合作社H', product: '蘑菇', price: '7.80元/斤', amount: '120斤' },
      { seller: '合作社I', product: '蘑菇', price: '7.80元/斤', amount: '120斤' },
    ],
    buyerData: [
      { seller: '公司A', product: '蘑菇', price: '8.00元/斤', amount: '10斤' },
      { seller: '公司B', product: '蘑菇', price: '8.10元/斤', amount: '6斤' },
      { seller: '公司C', product: '蘑菇', price: '8.20元/斤', amount: '5斤' },
      { seller: '公司D', product: '蘑菇', price: '7.90元/斤', amount: '10斤' },
      { seller: '公司E', product: '蘑菇', price: '7.80元/斤', amount: '20斤' },
      { seller: '公司F', product: '蘑菇', price: '7.80元/斤', amount: '10斤' },
      { seller: '公司G', product: '蘑菇', price: '7.80元/斤', amount: '10斤' },
      { seller: '公司H', product: '蘑菇', price: '7.80元/斤', amount: '10斤' },
      { seller: '公司I', product: '蘑菇', price: '7.80元/斤', amount: '20斤' },
    ]
  },
  async onLoad(){
    try{
      wx.showLoading({
        title: '',
      })
      // 查询店铺首页了列表
      const {data:{records:storeList,total:storeTotal}}  = await models.store_home_3bzb1t4.list({
        filter: {
          where: {}
        },
        pageSize: 10, // 分页大小，建议指定，如需设置为其它值，需要和 pageNumber 配合使用，两者同时指定才会生效
        pageNumber: 1, // 第几页
        getCount: true, // 开启用来获取总数
      });
      // 查询商品列表
      const {data:{records:productList,total:productTotal}}  = await models.store_product_zh57lp5.list({
        filter: {
          where: {}
        },
        pageSize: 10, // 分页大小，建议指定，如需设置为其它值，需要和 pageNumber 配合使用，两者同时指定才会生效
        pageNumber: 1, // 第几页
        getCount: true, // 开启用来获取总数
      });
      wx.hideLoading()
      this.setData({
        storeList,
        storeTotal,
        productList,
        productTotal,
        isPreview:false,
        title:"使用云模板管理微信小店",
        desc:"您已成功配置后台数据，可以打开下方地址对微信小店及商品进行增删改查等数据管理，配置后的数据将同步到该模板",
        url:"https://tcb.cloud.tencent.com/cloud-admin?_jump_source=wxide_mp2store#/management/content-mgr/index"
      })
    }catch(e){
      wx.hideLoading()
      this.setData({
        isPreview:true,
        title:"使用云模板快速接入微信小店",
        desc:"当前为体验数据，切换为真实数据请复制下方链接并在浏览器中打开，帮您快速接入微信小店，管理小店及商品数据",
        url:"https://tcb.cloud.tencent.com/cloud-template/detail?appName=wx_shop&from=wxide_mp2store"
      })
    }
  },
  onChangeTab(e) {
    const {key}=e.target.dataset
    this.setData({
      selectedItemIndex:key
    })
  },
  onOpenTipsModal(){
    this.setData({
      tipShow:true
    })
  }
});
