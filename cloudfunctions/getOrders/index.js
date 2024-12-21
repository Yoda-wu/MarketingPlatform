// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
  traceUser: true
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var $ = db.command.aggregate
  // 聚合查询订单双方的信息
  return await db.collection('OrderList')
    .aggregate()
    .lookup({
      from: "UserList",
      localField: event.localField,
      foreignField: 'userID',
      as: 'otherList'
    })
    .match({
      "user_id": event.user_id
    })
    .project({
      _id: 1,
      product_name: 1,
      farmer_id: 1,
      prices: 1,
      trade_number: 1,
      status: 1,
      rating: 1,
      otherInfo: $.mergeObjects(
        [$.arrayElemAt(['$otherList', 0])]
      )
    })
    .end()
}