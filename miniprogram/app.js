// app.js
App({
  onLaunch: function () {
    
    wx.setStorageSync('userInfo', {id: 'abc5', type: 0, name: 'user5', phone: '6357145234'})
    // wx.setStorageSync('userInfo', {id: 'abc12', type: 1, name: 'user12', phone: 'a9368350202'})

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        //   env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        
        // env: 'market-platform-2gcqegvr3a79fd6b',
        env: 'house-3gl07xnh583e52a1',
        traceUser: true,
      });
    }

    this.globalData = {
      env: 'market-platform-2gcqegvr3a79fd6b'
      // env: 'house-3gl07xnh583e52a1',
    };
    this.IsLogon()
  },

  //检测是否登录函数
  // 为登录则提示登录
  IsLogon() {
    // 获取缓存的登录信息
    var userInfo = wx.getStorageSync('userInfo')
    console.log('app.js', userInfo)
    if (userInfo.name && userInfo.phone) {
      this.globalData.UserLogin = true
      this.globalData.userInfo = userInfo
    } else {
      this.globalData.UserLogin = false
    }
  },
});
