// pages/orders/orders.js
Page({
  data: {
    orders: [],
  },

  onLoad: function(options) {
    wx.showLoading({
      title: '请稍等',
    })
    var _that = this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5bf552bb7774657914a1c8fa/order/order_item',
      success:function(res){
        _that.setData({
          orders: res.data.orders
        })
      }
    })
    wx.hideLoading();
  },
})