function request(obj){
  let url=obj.url;
  let data=obj.data || {};
  let success=obj.success;
  let method=obj.method || 'GET';
  console.log(obj);
  wx.request({
    url: url,
    data: data,
    header: {},
    method: method,
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      if(res.statusCode==200){
        success(res.data);
      }
     },
    fail: function (res) { },
    complete: function (res) {
      console.log("请求完成")
     },
  })
}

module.exports.request=request;