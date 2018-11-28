//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  getPhoneNumber: function(e) {
    var session_key = wx.getStorageSync('session_key');
    var openid = wx.getStorageSync('openid');
    // console.log(session_key + ":" + openid);

    if (e.detail.errMsg == "getPhoneNumber:fail user deny" || e.detail.errMsg == "getPhoneNumber:fail:cancel to confirm login") {
      // 拒绝时候什么都不执行
    } else {

      wx.request({
        url: 'https://request.hejianzhiyang.com/Qd/getphone', //仅为示例，并非真实的接口地址
        method: "POST",
        data: {
          iv: e.detail.iv,
          encryptedData: e.detail.encryptedData,
          session_key: session_key,
          openid: openid
        },
        success: function (res) {
          // console.log(res);
          wx.request({
            url: 'https://request.hejianzhiyang.com/Qd/openid_if_exist',
            method:"POST",
            data:{
              openid: res.data.openid
            },
            success:function(goPage){
              console.log(goPage);
              if(goPage.data.times > 1){
                wx.redirectTo({
                  url: '/pages/repeat/repeat',
                });
              }else{
                wx.redirectTo({
                  url: '/pages/okpage/okpage',
                });
              }
              
            }
          })
         
          // wx.redirectTo({
          //   url: '/pages/okpage/okpage',
          // })
        }
      })
    }
  },

  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    var session_key = wx.getStorageSync('session_key');
    var openid = wx.getStorageSync('openid');
    // console.log(session_key+":"+openid);

    if (e.detail.errMsg == "getUserInfo:fail auth deny") {
      // 拒绝时候什么都不执行
    } else {
      wx.request({
        url: 'https://request.hejianzhiyang.com/Qd/getuserinfo',
        method: "POST",
        data: {
          iv: e.detail.iv,
          encryptedData: e.detail.encryptedData,
          session_key: session_key,
          openid: openid
        }
      })
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });
    }
  }
})