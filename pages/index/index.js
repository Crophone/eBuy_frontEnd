const api = require('../../utils/api.js');
const request = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sliders: [],
    goods: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _that = this;
    _that.requestGoods()
  },
  requestGoods:function(){
    var _that = this;
    wx.showLoading({
      title: '加载中...',
    })
    request.request({
      url: api.default.slider,
      success: function (res) {
        console.log(res)
        var slider = res
        request.request({
          url: api.default.goods,
          success: function (res) {
            console.log(res.data)
            _that.setData({
              goods: res,
              sliders: slider
            }, function (e) {
              wx.hideLoading();
            })
          }
        })
      }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

})