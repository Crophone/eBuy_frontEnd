// var API_HOST ='https://www.easy-mock.com';
var API_HOST = 'http://127.0.0.1:8000';

// var API_PREFIX = API_HOST +'/mock/5bffe0f6bfe3e5204cd3a9aa/YiBuy';
var API_PREFIX = API_HOST ;

export default{
  slider: API_PREFIX + '/sliders',
  goods: API_PREFIX + '/goods',

  shopping_lists: API_PREFIX + '/shopping_lists',
  orders:API_PREFIX +'/orders', 
}