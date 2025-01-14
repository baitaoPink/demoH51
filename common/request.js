// 使用 uni.$u 封装请求
import API from './api.js';
const request = (url, data = {}, method = 'GET', isShowLoading = true) => {
	let token = uni.getStorageSync("token") || '';
  if (isShowLoading) {
    uni.showLoading({
      title: '加载中...',
    });
  }

  return uni.$u.http.request({
    url: `${API.BASE_URL}${url}`,
    data,
    method,
    header: {
      'Authorization': token,
    },
  }).then((res) => {
    if (isShowLoading) {
      uni.hideLoading();
    }


    if (res.code === 0) {
      return res;
    } else if(res.code === 62) {
		uni.removeStorage({
			key:'infos'
		}).finally(() => {
			uni.reLaunch({
				url:'/pages/login/login'
			})
		})
		
	}else {
      uni.$u.toast(res.message || '请求失败');
      return Promise.reject(res);
    }
  }).catch((err) => {
    if (isShowLoading) {
      uni.hideLoading();
    }
	uni.$u.toast(err.message || '网络请求失败');
    // uni.$u.toast('');
    return Promise.reject(err);
  });
};

export default request;
