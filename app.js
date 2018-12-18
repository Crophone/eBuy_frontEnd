App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  data: {
    open_id: '"sdasf"',
    user_name:'nickname',
    user_id:1,
  },


  onLaunch: function () {
    var _that = this;

    wx.login({
      success: function (res) {
   
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session', //官方获取openid接口  
          data: {
            // appid: 'wx4c8eb58f12c212c7',
            // secret: '86ef6481847af51ac458919b7305c80a',
            appid: 'wx2308c03b34341497',
            secret: 'dbf62d0412be214d28ead9c7f95d9381',
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          method: 'GET',
          success: function (res) {
              console.log(res)
            _that.data.open_id = res.data.openid
            _that.data.user_name = 'nickname'
            //需要获得user_name
  
            _that.setUserId(res)
    
          }
        })
      }
    })
  },
  //根据
  setUserId: function (res){
    var _that = this
    wx.request({
      url: 'http://127.0.0.1:8000/users/getid',
      method: 'POST',
      data: {
        open_id: res.data.openid,
        user_name: _that.data.user_name
      },
      success: function (res) {
        _that.data.user_id = res.data;

      }
    })
  },
  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  }
,
  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
