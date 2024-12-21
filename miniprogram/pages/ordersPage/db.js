const db = wx.cloud.database();
const dbBehavior = Behavior({
  data: {
    userInfo: null,
    shownData: [],
    ordersUnCompleted: [],
    ordersCompleted: []
  },
  methods: {
    setShownData(){
      this.setData({
        shownData: this.data.tabindex === 0 ? this.data.ordersUnCompleted : this.data.ordersCompleted
      })
      
      console.log(this.data.ordersUnCompleted)
      console.log(this.data.ordersCompleted)
    },
    getOrders(typ_field, id) {
      wx.showLoading({
        title: '数据加载中',
      })
      wx.cloud.callFunction({
        name: "getOrders",
        data: {
          localField: typ_field,
          user_id: id
        },
        success: res => {
          const {list} = res.result;
          const comlpetedOrders = [];
          const uncomlpetedOrders = [];
          list.forEach((item) => {
            if(item.status === 0) {
              uncomlpetedOrders.push(item)
            } else {
              comlpetedOrders.push(item)
            }
          })
          
          this.setData({
            ordersUnCompleted: uncomlpetedOrders,
            ordersCompleted: comlpetedOrders
          })
          this.setShownData()
          wx.hideLoading()
        }
      })
  
    },
    getUserOrders() {
      const userInfo = this.data.userInfo
      console.log(userInfo)
      if(userInfo.type === 0) {
        this.getOrders("seller_id", userInfo.id)
      } else if(userInfo.type === 1) {
        this.getOrders("farmer_id", userInfo.id)
      }
    },
    async completeOrder(order_id) {
      console.log(order_id)
      await db.collection("OrderList").doc(order_id).update({
        data: {
          status: 1
        },
        success: res => {
          console.log(res)
        }
      })
    },
    async ratingOrder(orderID, rating) {
      await db.collection("OrderList").doc(orderID).update({
        data: {
          rating: rating
        },
        success: res => {
          console.log(res)
        }
      })
    },
    async deleteOrder(orderIndex) {
      const _id = this.data.ordersUnCompleted[orderIndex]._id
      return await db.collection("OrderList")
        .doc(_id)
        .remove()
    }
  }

})

export default dbBehavior