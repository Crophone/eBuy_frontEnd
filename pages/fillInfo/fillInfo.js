// pages/fillInfo/fillInfo.js
import Notify from '../../dist/notify/notify';
const area = require('../../utils/area.js')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phone: '',
    address_brief: '',
    address: '',
    show: false,    //弹出层显示标志
    areaList: area.default    //导入的地址信息（省市区）
  },

  //确认更改联系信息
  changeContactInfo: function() {
    var _that = this;
    //拼接两段地址信息（省市区+详细地址）
    _that.setData({
      address: _that.data.address_brief + _that.data.address
    })

    //判断信息是否填完
    if (_that.data.name == "" || _that.data.phone == "" || _that.data.address_brief == "" || _that.data.address == "") {
      Notify('请把联系信息填完哦!');
    } 
    else {
      _that.postContactInfo()
      console.log(_that.data)
    }
  },

  //将联系信息post到数据库
  postContactInfo: function(){
    var _that = this;
    wx.request({
      url: "http://127.0.0.1:8000/contact_infos",
      method: 'POST',
      data: {
        user_id: app.data.user_id,
        receiver_name: _that.data.name,
        phone_num: _that.data.phone,
        address: _that.data.address
      },
      success: function (res) {
        console.log('res',res)
        _that.jumpBackToFillOrder()
      }
    })
  },

  //回到填写订单页面
  jumpBackToFillOrder: function(){
    wx.navigateBack({
      url: "../fillOrder/fillOrder"
    })
  },

  //修改名字
  changeName: function(val) {
    var _that = this;
    _that.setData({
      name: val.detail
    })
  },

  //修改电话
  changePhone: function(val) {
    var _that = this;
    _that.setData({
      phone: val.detail
    })
  },

  //修改地址（详细）
  changeAddress: function(val) {
    var _that = this;
    _that.setData({
      address: val.detail
    })
  },

  //选择地址（省市区）
  selectAddress: function() {
    var _that = this;
    _that.setData({
      show: true,
    })
  },

  //关闭弹出层
  closePop: function() {
    var _that = this;
    _that.setData({
      show: false,
    })
  },

  //弹出层确认按钮
  popConfirm: function(val) {
    var _that = this;
    _that.setData({
      address_brief: val.detail.values[0].name + val.detail.values[1].name + val.detail.values[2].name,
      show: false,
    })
  },

  onLoad: function(options) {

  }
})