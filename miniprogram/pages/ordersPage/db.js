const db = wx.cloud.database()
const dbBehavior = Behavior({
  data: {
    userInfo: null,
    ordersUnCompleted: null,
    ordersCompleted: null
  },
  methods: {
    getOrders(typ_field, id) {
      const comlpetedOrders = [];
      const uncomlpetedOrders = [];
      wx.cloud.callFunction({
        name: "getUserOrders",
        data: {
          // localField: typ_field,
          // user_id: id
        }        
      })
      .then(res => {
        console.log(res.result.res)
        // const {list} = res.result
        // list.forEach((item) => {
        //   if(item.status === 0) {
        //     uncomlpetedOrders.push(item)
        //   } else {
        //     comlpetedOrders.push(item)
        //   }
        // })
      })
      this.setData({
        ordersUnCompleted: uncomlpetedOrders,
        ordersCompleted: comlpetedOrders
      })
    },
    getUserOrders() {
      const app = getApp();
      const userInfo = app.globalData.userInfo;
      console.log(userInfo)
      if(userInfo.type === 0) {
        this.getOrders("seller_id", userInfo.id)
      } else if(userInfo.type === 1) {
        this.getOrders("farmer_id", userInfo.id)
      }
    }
  }
})

export default dbBehavior