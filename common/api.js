export default {
  BASE_URL: process.env.NODE_ENV === 'development'?'http://192.168.2.9:8000/api/h5api/':'http://192.168.2.9:8000/api/h5api/', // 基础接口地址
  getAppointOrderList: 'appointOrder/list', // 当前/历史竞猜
  getPlayDetailList: 'playDetail/list', // 战绩
  login: 'login', // 登陆
  loginOut: 'logout',
  appointOrderAdd : 'appointOrder/add' //投注
  // 其他API接口地址...
};


