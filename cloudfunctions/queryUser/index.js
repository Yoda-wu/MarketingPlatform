// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
  traceUser: true
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  // const openId = wxContext.OPENID
  const account = event.account
  const password = event.password
  console.log(event)
  // console.log(wxContext)
  // console.log('cloud', openId)
  // 登录
  if (event.type === 'LOGIN') {
    const dbname = 'UserList'
    return await db.collection(dbname).where({
      'account': account,
      'password': password
    }).field({
      _id: true,
      _openid: true,
      name: true,
      phone: true,
      company_name: true,
      legal_name: true,
      type: true,
      avatarUrl: true,
      account: true,
      greenHouses: true,
      company_address: true,
      sale_scope: true,
      bussiness_scope: true,
      status: true,
      rating: true
    }).get()
  }
  // 普通查询
  if (event.type === 'NORMAL') {
    const dbname = 'UserList'
    return await db.collection(dbname).where({
      'account': account,
    }).field({
      _openid: true,
      name: true,
      phone: true,
      company_name: true,
      legal_name: true,
      type: true,
      avatarUrl: true,
      account: true,
      greenHouses: true,
      company_address: true,
      sale_scope: true,
      bussiness_scope: true,
      rating: true
    }).get()
  }

  // 查询是否为管理员
  if (event.type == 'ADMIN') {
    const dbname = 'AdminStator'
    return await db.collection(dbname).where({
      '_openid': openId
    }).count()
  }

}