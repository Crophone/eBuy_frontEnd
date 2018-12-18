// pages/orders/orders.js
const app =getApp()
Page({
  data: {
    orders: []
  },

  onLoad: function(options) {

  },

  onShow: function() {
    var _that = this
    wx.showLoading({
      title: '请稍等',
    })
    _that.setOrder()
    wx.hideLoading();

  },
  setOrder: function() {
    var _that = this;
    wx.request({
      url: 'http://localhost:8000/order_lists/' + app.data.user_id,
      success: function(res) {
        console.log(res)
        var temp = res.data;
        var temp_list = [];
        for (var i = 0; i < temp.length; i++) {
          var id = temp[i].order_id;
          var index = -1;
          for (var j = 0; j < temp_list.length; j++) {
            if (temp_list[j].order_id == id) {
              index = j;
              break;
            }
          }
          if (index == -1) {
            index = temp_list.length;
            temp_list[index] = {
              goods: [],
              total_price: 0,
              order_id: temp[i].order_id,
              user_id: temp[i].user_id
            }
          }
          temp_list[index].goods.push({
            good_id: temp[i].good_id,
            good_price: temp[i].good_price,
            good_num: temp[i].good_num,
            name: temp[i].good_name,
          });
          temp_list[index].total_price += (temp[i].good_num * temp[i].good_price);
        }
        console.log(temp_list);
        _that.setData({
          orders: temp_list
        });
        wx.setStorageSync('temp_list', temp_list)
      }
    })
  }
})