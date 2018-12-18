// pages/order_detail/order_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id: '',
    user_name: '',
    phone_num:"",
    address:"",
    cost:"",
    order_time: "",
    goods:[]
  },
  onLoad: function(options) {

    
  
    wx.showLoading({
      title: '请稍等',
    })
    var _that = this;
    _that.setOrderDetail(options)
    wx.hideLoading();
  },
  setOrderDetail: function (options){
    var orders_list = wx.getStorageSync('temp_list');
    var _that = this;
    wx.request({
      url: 'http://localhost:8000/orders/' + options.user_id + '/' + options.order_id,

      success: function (res) {
        console.log('订单详情', res)
        console.log(res)
        var temp_list = [];
        var order_id = options.order_id;
        for (var i = 0; i < orders_list.length; i++) {
          if (orders_list[i].order_id == order_id) {
            for (var j = 0; j < orders_list[i].goods.length; j++) {
              var temp2 = orders_list[i].goods[j];
              temp_list.push({
                name: temp2.good_name,
                price: temp2.good_price,
                number: temp2.good_num,
              })
            }
            break;
          }
        }
        _that.setData({
          order_id: res.data[0].order_id,
          user_name: res.data[0].receiver_name,
          phone_num: res.data[0].phone_num,
          address: res.data[0].address,
          cost: res.data[0].cost,
          order_time: res.data[0].created_at,
          goods: temp_list
        })
      }
    })
  }

})