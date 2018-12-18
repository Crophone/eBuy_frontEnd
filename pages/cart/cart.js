// pages/cart/cart.js
const app = getApp()
const request = require('../../utils/request.js');
const api = require('../../utils/api.js');
import Notify from '../../dist/notify/notify';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shopping_lists: [],
    totalMoney: 0,
  },
  onLoad: function(options) {

  },

  //从数据库获取购物车内容
  setShoppingList: function() {
    var _that = this
    wx.request({
      url: 'http://127.0.0.1:8000/shopping_lists/' + app.data.user_id,
      success: function(res) {
        _that.setData({
          shopping_lists: res.data
        })
        _that.setTotalMoney()
      }
    })
  },

  //计算购物车内商品总价格
  setTotalMoney: function() {
    var _that = this
    var totalMoney = 0
    var shopping_lists = _that.data.shopping_lists
    for (var i = 0; i < shopping_lists.length; i++) {
      totalMoney += shopping_lists[i].good_num * shopping_lists[i].good_price
    }
    _that.setData({
      totalMoney: totalMoney
    })
  },

  //改变商品数量按钮对应函数
  changeGoodNum: function(e) {
    var _that = this;
    var i = e.target.id;
    var temp = _that.data.shopping_lists;
    temp[i].good_num = e.detail;
    var temp1 = [];
    for (var i = 0; i < temp.length; i++) {
      //数量不为0的保留，否则从购物车中清出
      if (temp[i].good_num != 0) {
        temp1.push(temp[i])
      }
    }
    _that.setData({
      shopping_lists: temp1,
    })
    _that.setTotalMoney()
  },

  //去支付按钮对应函数，将购物车内容传参至填写订单页面
  jumpToFillOrder: function(option) {

    var _that = this;
  
      var shopping_listsStr = JSON.stringify(_that.data.shopping_lists)
    if (shopping_listsStr != "[]") {
      wx.navigateTo({
        url: '../fillOrder/fillOrder?shopping_listsStr=' + shopping_listsStr
      })
    }
    else{
      Notify('购物车为空!');
    }

  },

  //每次打开购物车页面都会调用
  onShow: function() {
    var _that = this;
    _that.setShoppingList()
 
  },

  //一旦跳出购物车页面，就向数据库post购物车信息
  onHide: function () {
    var _that = this;
    _that.postShoppingList();
  },

  //购物车信息post函数
  postShoppingList: function() {
    var _that = this;
    wx.request({
      url: 'http://127.0.0.1:8000/shopping_lists/many',
      method: 'POST',
      data: {
        user_id: app.data.user_id,
        shopping_list: _that.data.shopping_lists
      },
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {}
    })
  }
})