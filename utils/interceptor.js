
function hasPermission(url) {
	if(url.includes('?')){
		let index = url.indexOf("?")
		url = url.substring(0, index)
	}
	return true
	//请求路径在白名单中直接跳转，或者带有token直接跳转，
	
	// let islogin = JSON.parse(uni.getStorageSync('userInfo') || '{}').userStatus; //在这可以使用token、vuex
	// // 在白名单中或有登录判断条件可以直接跳转
	// if (islogin ==1 || islogin ==3 || whiteList.indexOf(url) !== -1) {
	// 	return true
	// }
	// uni.showModal({
	// 	title:"提示",
	// 	showCancel:false,
	// 	content:"您的账户已冻结，请联系客服"
	// })
	// return false
}

export function routerHasPermission() {
	let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
	let curRoute = routes[routes.length - 1].route // 获取当前页面路由，也就是最后一个打开的页面路由
	//请求路径在白名单中直接跳转，或者带有token直接跳转，
	let islogin = JSON.parse(uni.getStorageSync('userInfo') || '{}').userStatus; //在这可以使用token、vuex
	// 在白名单中或有登录判断条件可以直接跳转
	if (islogin ==1 || islogin ==3 || whiteList.indexOf(curRoute) !== -1) {
		return true
	}
	return false
}
uni.addInterceptor('navigateTo', {
	invoke(e) {
		if (!hasPermission(e.url)) {
			uni.navigateTo({
				url: '/pages/home/home'
			})
			return false
		}
		return true
	},
	success(e) {
		// console.log(e)
	},
	fail(e) {
		// console.log(e)
	}
})

// 页面拦截tabbar，非登录状态页首页跳转登录页登录
uni.addInterceptor('switchTab', {
	// tabbar页面跳转前进行拦截
	invoke(e) {
		if (!hasPermission(e.url)) {
			uni.navigateTo({
				url: '/pages/home/home'
			})
			return false
		}
		return true
	},
	success(e) {
		// console.log(e)
	}
})
