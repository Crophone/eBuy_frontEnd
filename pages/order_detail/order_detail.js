// pages/order_detail/order_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    phone: 0,
    address: "",
    goods: [],
    total_price: 0,
    status: "",
    order_time: "",
    pay_way: "",
    remark: "",
    id: 13456468
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '请稍等',
    })
    var _that = this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5bf552bb7774657914a1c8fa/order/detail?order_id='+options.id,
      success: function (res) {
        console.log(res.data);
        _that.setData({
          id:options.id,
          name:res.data.name,
          phone:res.data.phone,
          address:res.data.address,
          goods: res.data.goods,
          total_price: res.data.total_price,
          status: res.data.status,
          order_time: res.data.order_time,
          pay_way: res.data.pay_way,
          remark: res.data.remark,
        })
      }
    })
    wx.hideLoading();
  },

})