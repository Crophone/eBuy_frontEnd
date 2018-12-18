// pages/fillOrder/fillOrder.js
const app = getApp()
import Notify from '../../dist/notify/notify';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopping_lists: [],
    isFromShopping_list: false,
    totalMoney: 0,
    name: '',
    phone: '',
    address: '',
  },

  onLoad: function(options) {
    var _that = this;
    console.log(options)
    //单个商品，在商品详情直接购买
    if (options.good_id) {
      console.log('单个商品页面跳转')
      _that.setData({
        shopping_lists: [{
          user_id: app.data.user_id,
          good_id: options.good_id,
          good_name: options.good_name,
          good_price: options.good_price,
          good_num: options.good_num,
          image_url: options.image_url,
        }],
        totalMoney: options.good_price * options.good_num
      })
    }

    //多个商品 从购物车页面过来
    else if (options.shopping_listsStr) {
      console.log('购物车页面跳转')
      var user_id = app.data.user_id
      var shopping_lists = JSON.parse(options.shopping_listsStr)
      var totalMoney = 0
      for (var i = 0; i < shopping_lists.length; i++) {
        shopping_lists[i].user_id = user_id
        totalMoney += shopping_lists[i].good_price * shopping_lists[i].good_num
      }
      _that.setData({
        isFromShopping_list: true,
        shopping_lists: shopping_lists,
        totalMoney: totalMoney
      })
    }
  },

  //从数据库获取用户联系信息
  setContactInfo: function() {
    var _that = this
    wx.request({
      url: 'http://localhost:8000/contact_infos/' + app.data.user_id,
      success: function(res) {
        console.log('/contact_infos/',res)
        if(res.data!=null){
          _that.setData({
            name: res.data.receiver_name,
            phone: res.data.phone_num,
            address: res.data.address
          })
        }
      }
    })
  },

  //修改联系信息按钮对应函数，跳转至填写联系信息页面
  changeInfo: function() {
    wx.navigateTo({
      url: '../fillInfo/fillInfo',
    })
  },

  //检查页面内用户联系信息是否填写完整
  checkContactInfo: function() {
    var _that = this
    var nameFlag = (_that.data.name != '')
    var phoneFlag = (_that.data.phone != '')
    var addressFlag = (_that.data.address != '')
    return nameFlag && phoneFlag && addressFlag
  },

  //提交订单函数
  postOrder: function() {
    var _that = this
    if (_that.checkContactInfo()) {
      //向后台请求orderid
      wx.request({
        url: 'http://127.0.0.1:8000/orders',
        method: "POST",
        data: {
          user_id: app.data.user_id,
          receiver_name: _that.data.name,
          phone_num: _that.data.phone,
          address: _that.data.address,
          cost: _that.data.totalMoney,
        },
        success: function(res) {
          console.log(res)
          var order_id = res.data
          //添加order_id列，便有生成数据库数据
          var shopping_lists = _that.data.shopping_lists
          for (var i = 0; i < shopping_lists.length; i++) {
            shopping_lists[i].order_id = order_id
          }
          _that.setData({
            shopping_lists: shopping_lists,
          })
          _that.PostOrderList()
        }
      })
    } else {
      Notify('请把联系信息填完哦!');
    }
  },

  //生成订单
  PostOrderList: function (order_id) {
    var _that = this;
    wx.request({
      url: 'http://127.0.0.1:8000/order_lists/create',
      method: "POST",
      data: {
        user_id: app.data.user_id,
        order_id: order_id,
        order_list: _that.data.shopping_lists
      },
      success: function(res) {
        if (_that.data.isFromShopping_list) {
          _that.cleanShoppingLists()
        }
        _that.jumpToOrder()
      }
    })
  },

  //完成订单后跳转到订单页面
  jumpToOrder: function() {
    wx.switchTab({
      url: '../orders/orders',
    })
  },

  //清空购物车
  cleanShoppingLists: function() {
    //上传空购物车数组
    var _that = this;
    wx.request({
      url: 'http://127.0.0.1:8000/shopping_lists/many',
      method: 'POST',
      data: {
        user_id: app.data.user_id,
        shopping_list: []
      },
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {}
    })
  },

  //每次打开填写订单页面都会调用
  onShow: function(options) {
    var _that = this;
    _that.setContactInfo()
  }
})