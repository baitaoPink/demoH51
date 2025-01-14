

export function navigateTo(path) {	// 保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面
	uni.navigateTo({
		url: path,
		success: res => {},
		fail: (e) => {
			console.log(e)
		},
		complete: () => {}
	});
	return;    
};

export function reLaunch(path) {	// 关闭所有页面，打开到应用内的某个页面
	uni.reLaunch({
		url: path,
		success: res => {},
		fail: (e) => {
			console.log(e)
		},
		complete: () => {}
	});
	return;    
};

export function redirectTo(path) {	// 关闭当前页面，跳转到应用内的某个页面
	uni.redirectTo({
		url: path,
		success: res => {},
		fail: (e) => {
			console.log(e)
		},
		complete: () => {}
	});
	return; 
};

export function switchTab(path) {	// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
	uni.switchTab({
		url: path,
		success: res => {},
		fail: (e) => {
			console.log(e)
		},
		complete: () => {}
	});
	return; 
};

export function navigateBack() {	// 关闭当前页面，返回上一页面或多级页面
	uni.navigateBack({
		delta: 1
	});
  
};
