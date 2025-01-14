/*
	封装uni-app请求	
*/
import {BASE_URL} from "@/common/config.js";
import {aesDecrypt,aesEncrypt} from '@/common/encrypyUtil.js'
let count = 0

function request(params) {
	const isEncrypt = true
	let token = uni.getStorageSync("token") || '';
	const headers = {}
	
	//参数加密 =============strart===============
	// if(params.data && params.method == 'get' && isEncrypt == true){
	// 	for(let s in params.data){
	// 		params.data[s] = aesEncrypt(params.data[s])
	// 	}
	// }
	if(params.data && params.method == 'post' && isEncrypt == true){
		params.data = aesEncrypt(JSON.stringify(params.data))
	}
	
	//参数加密 =============end===============
	
	if(isEncrypt == false){
		headers.product = '000'
	}
	
	if(params.method == 'get'){
		headers.time = new Date().getMilliseconds()
	}
	
	if(token){
		headers.Authorization = "Bearer "+token
	}
	if(params.loading){
		count++
		uni.showLoading({
			mask:true
		})
	}
	
	return new Promise(function(resolve, reject) {
		uni.request({
			url: BASE_URL + params.url + "?lang="+lang,
			data: params.data,
			method: params.method,
			header: headers,
			timeout: 60*1000,
			success(res) {
				if (res.statusCode == 200) {
					// 加密
					if (res.data.code == "200" && res.data.data !=null && isEncrypt == true) {
						const r = aesDecrypt(res.data.data)
						const delNullStr = JSON.parse(r.slice(0,(r.lastIndexOf('}'))+1))
						if(delNullStr.code == '200'){
							resolve(delNullStr.data)
						}else if(delNullStr.code == '401'){
							uni.clearStorageSync()
							uni.reLaunch({
								url:'/pages/login/login'
							})
						}else{
							uni.showToast({
								icon:'none',
								title:delNullStr.msg
							})
							reject(delNullStr.msg)
						}
						//不加密
					} else if(res.data.code == '200' && isEncrypt == false){
						resolve(res.data.data)
					}else if(res.data.code == '401'){
						uni.clearStorageSync()
						uni.reLaunch({
							url:'/pages/login/login'
						})
					}else{
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
						reject(res.data.msg)
					}
					
				} else {
					// uni.showToast({
					// 	title: "客户端错误",
					// 	icon: "none"
					// })
				}
			},
			fail(e) {
				uni.hideLoading()
				let params = {
					code: 500,
					success: false
				}
				reject(params)
			},
			complete() {
				if(params.loading){
					count--
					if(count == 0){
						uni.hideLoading()
					}
				}
			}
		})
	})
};



export default request
