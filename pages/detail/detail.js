const request = require('../../utils/request.js');
const api = require('../../utils/api.js');
const app = getApp()
import Notify from '../../dist/notify/notify';

// pages/detail/detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    good_price: '',
    image_url: '',
    good_name: '',
    good_description: '',
    good_id: '',
    good_num: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    var _that = this;
    _that.setData({
      good_id: options.good_id,
      good_price: options.good_price,
      good_description: options.good_description,
      good_name: options.good_name,
      image_url: options.image_url
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  // bindsubmit: function(e) {
  //   console.log(e);
  //   wx.request({
  //     url: 'http://localhost:8080/cart',
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     method: "POST",
  //     data: {
  //       description:e.detail.value.description,
  //       num: e.detail.value.num
  //     },
  //     success: function(e) {
  //       console.log(e.data);
  //       wx.showToast({
  //         title: '成功',
  //         icon: 'succes',
  //         duration: 1000,
  //         mask: true
  //       })
  //     }
  //   })

  // },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //单个商品加入购物车
  addToCart:function(){
  var _that = this;
    wx.request({
      // url: 'shopping_lists/'+app.data.user_id,
      url: 'http://localhost:8000/shopping_lists/one',
     header: {
       'content-type': 'application/json'
     },
     method: "POST",
      data: {
       user_id: app.data.user_id,
       good_id: _that.data.good_id,
       good_name: _that.data.good_name,
       good_price: _that.data.good_price,
       good_num: _that.data.good_num,
       image_url: _that.data.image_url
     },
     success: function (e) {
       console.log(e.data);
       wx.showToast({
         title: _that.data.good_num +  _that.data.good_name +'已加入购物车',
         icon: 'succes',
         duration: 1000,
         mask: true
       })
       _that.setData({
         good_num: 0
       })
     }
    })
  },
  onChange: function (e) {
    this.data.good_num = e.detail;
    console.log(this.data.good_num);
  },

  buyOneGood:function(){
    var _that = this
    if (_that.data.good_num>0){
      wx.navigateTo({
        url: '../fillOrder/fillOrder?' +
          'good_id=' + _that.data.good_id +
          '&good_price=' + _that.data.good_price +
          '&good_name=' + _that.data.good_name +
          '&good_num=' + _that.data.good_num +
          '&image_url=' + _that.data.image_url
      })
    }
    else{
      Notify('商品购买数量必须大于0!');
    }

  }
})