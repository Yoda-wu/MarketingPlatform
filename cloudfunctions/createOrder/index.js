// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const {targetOrder, userInfo, amount} = event
  if(targetOrder.type === userInfo.type) {
    Promise.reject(new Error("你目前的身份不允许该操作！"  ));
  }
  const farmer_id = userInfo.type === 0 ? userInfo.id : targetOrder.user_id;
  const seller_id = userInfo.type === 1 ? userInfo.id : targetOrder.user_id;
  // 农户不允许在农户处下单，需要检测userInfo和targetOrder的type
  const order = {
    farmer_id: farmer_id,
    seller_id: seller_id,
    prices: targetOrder.prices,
    product_name: targetOrder.product_name,
    trade_number: amount,
    status: 0,
    user_id: targetOrder.user_id // 在被下单方创建订单
  }
  return db.collection("OrderList").add({
    data: order
  })
}