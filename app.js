//app.js
App({
  onLaunch: function () {
    wx.login({
      success: function (res) {
        wx.request({
          url: 'https://request.hejianzhiyang.com/Qd/getsession', //仅为示例，并非真实的接口地址
          method: "POST",
          data: {
            code: res.code
          },
          success: function (resIn) {
            // console.log(resIn.data.session_key);
            // console.log(resIn.data.openid);
            wx.setStorageSync('session_key', resIn.data.session_key);
            wx.setStorageSync('openid', resIn.data.openid);
          }
        });
      }
    })

  },

  wxOnlogin:function(){
    var _this = this;
    wx.checkSession({
      success: function (e) {
        // console.log("未过期");
      },
      fail: function () {
        // console.log("过期");
        wx.login({
          success: function (res) {
            wx.request({
              url: 'https://request.hejianzhiyang.com/Qd/getsession', //仅为示例，并非真实的接口地址
              method: "POST",
              data: {
                code: res.code
              },
              success: function (resIn) {
                // console.log(resIn.data.session_key);
                // console.log(resIn.data.openid);
                wx.setStorageSync('session_key', resIn.data.session_key);
                wx.setStorageSync('openid', resIn.data.openid);
              }
            });
          }
        })
      }
    })
  },

  onShow:function(){
    this.wxOnlogin();
  },

  globalData: {
    userInfo: null,
    code:''
  }
})