import i18n from '@/locale/index.js'
import STORE from '@/store/index.js'
import {
	getConfigByKey
} from "@/api/common.api.js"
import {
	BASE_URL
} from '@/common/config.js'
export const setLanuage = () => {
	uni.showActionSheet({
		itemList: [
			i18n.global.t('locale.en'),
			i18n.global.t('locale.zh'),
			i18n.global.t('locale.ja'),
			i18n.global.t('locale.de'),
			i18n.global.t('locale.vn')
		],
		success: (res) => {
			let lang = "zh-Hans"
			switch (res.tapIndex) {
				case 0:
					lang = "en"
					break;
				case 1:
					lang = "zh-Hans"
					break;
				case 2:
					lang = "ja"
					break;
				case 3:
					lang = "de"
					break;
				case 4:
					lang = "vn"
					break;
				default:
					lang = "zh-Hans"
					break;
			}
			// #ifdef APP-PLUS
			if (uni.getSystemInfoSync().platform.toLowerCase() === 'android' && lang != uni
				.getStorageSync('lanuage')) {
				uni.showModal({
					title: "",
					content: i18n.global.t('重启'),
					success: (res) => {
						if (res.confirm) {
							uni.setLocale(lang);
							STORE.commit('setLanuage', lang)
						}
					}
				})
			} else {
				uni.setLocale(lang);
				STORE.commit('setLanuage', lang)
			}
			// #endif
			// #ifndef APP-PLUS
			uni.setLocale(lang);
			STORE.commit('setLanuage', lang)
			i18n.global.locale.value = lang
			// #endif

		},
		fail: function(res) {
			console.log(res.errMsg);
		}
	});
}

export const copyStr = (str) => {
	//#ifndef H5
	uni.setClipboardData({
		data: String(str), // 必须字符串
		success: function() {
			uni.showToast({
				title: i18n.global.t('home.015'),
				icon: "none"
			})
		}
	});
	//#endif

	// #ifdef H5
	if (!document.queryCommandSupported('copy')) { // 兼容某些浏览器的判断
		console.log('该浏览器不支持')
	}
	let textarea = document.createElement("textarea")
	textarea.value = str
	textarea.readOnly = "readOnly"
	document.body.appendChild(textarea)
	textarea.select() // 选择对象
	textarea.setSelectionRange(0, str.length) // 核心
	let result = document.execCommand("copy") // 执行浏览器复制命令
	if (result) {
		uni.showToast({
			title: i18n.global.t('home.015'),
			icon: "none",
			duration: 2000
		});
	}
	textarea.remove()
	// #endif
}

//钱千分位使用逗号分隔并保留两位小数
export const formatMoney = (money) => {
	if (money == null || money == undefined || money == '') {
		return '0.00'
	}
	let num = Number(money)
	let str = num.toFixed(2).toString()
	let intSum = str.substring(0, str.indexOf(".")).replace(/\B(?=(?:\d{3})+$)/g, ','); //取到整数部分
	let dot = str.substring(str.length, str.indexOf(".")) //取到小数部分搜索
	let ret = intSum + dot;
	return ret;
}

//钱千分位使用逗号分隔并保留两位小数
export const formatDate = (dateStr) => {
	const date = new Date(dateStr);
	const options = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: true,
		hourCycle: 'h12',
	};

	const formatter = new Intl.DateTimeFormat('en-US', options);
	const formattedDate = formatter.format(date);
	return formattedDate;
}

export const toService = async () => {
	// 1美洽  2自己
	const isNewKefu = (await getConfigByKey('sys.kefu.flag')).value
	if (isNewKefu == 1) {
		const groupid = (await getConfigByKey('sys.kefu.group.id')).value
		const entId = (await getConfigByKey('sys.kefu.ent.id')).value
		var timestamp = new Date().getTime()
		let lang = STORE.state.lanuage
		if (lang === 'zh-Hans') {
			lang = 'tw'
		}
		if (STORE.state.userInfo.id) {
			const u = 'groupid=' + groupid + '&entId=' + entId + '&visiter_id=' + STORE.state.userInfo.id +
				'&visiter_name=' + STORE.state.userInfo.userLogin + '--' + STORE.state.userInfo.trueName +
				'&language=' + lang
			uni.navigateTo({
				url: '/pages/mqkefu/mqkefu?' + u
			})
		} else {
			const u = 'groupid=' + groupid + '&entId=' + entId + '&visiter_id=' + timestamp +
				'&visiter_name=游客&language=' + lang
			uni.navigateTo({
				url: '/pages/mqkefu/mqkefu?' + u
			})
		}
	} else {
		let kefuUrl
		if (uni.getStorageSync('token')) {
			console.log('有登录获取')
			kefuUrl = (await getConfigApi('sys.kefu.url')).value
		} else {
			console.log('无登录')
			kefuUrl = (await getConfigByKey('sys.kefu.url')).value

		}

		const ensBaseUrlList = kefuUrl.split('?t=')

		if (kefuUrl.indexOf('http') == 0) {
			uni.navigateTo({
				url: '/pages/webview/webview?url=' + encodeURIComponent(kefuUrl)
			})
		} else {
			if (uni.getStorageSync('token')) {
				uni.navigateTo({
					url: `/pages/testkf/testkf?baseURL=${ensBaseUrlList[0]}&ens=${ensBaseUrlList[1]}&from=tab`
				})
			} else {
				uni.navigateTo({
					url: `/pages/testkf/testkf?baseURL=${ensBaseUrlList[0]}&ens=${ensBaseUrlList[1]}`
				})
			}

		}
	}
}


//文件上传
export const uploadFile = (file) => {
	if (file.size > 3145728) {
		uni.showToast({
			title: "上传的图片大小不超过3M",
			icon: 'none',
			duration: 2000,
			mask: true
		});
		return
	}
	let token = uni.getStorageSync("token") || '';
	uni.showLoading({
		title: "上传中...",
		mask: true
	})
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: BASE_URL + '/common/upload',
			header: {
				Authorization: "Bearer " + token
			},
			filePath: file.path,
			name: 'file',
			success: function(res) {
				uni.hideLoading()
				if (res.statusCode === 200) {
					resolve(JSON.parse(res.data))
				} else {
					reject(res.data)
				}
			},
			fail: function(err) {
				uni.hideLoading()
				console.log(err)
				reject(err)
			},
		})
	})
}

//银行卡脱敏
export const hideBankCard = (cardNumber) => {
	if (cardNumber && cardNumber.length > 8) {
		// 取出前四位
		const firstTwo = cardNumber.substring(0, 4);
		// 取出后四位
		const lastFour = cardNumber.substring(cardNumber.length - 4);

		// 组合成脱敏后的银行卡号
		const desensitizedCardNumber = firstTwo + ' **** **** ' + lastFour;

		return desensitizedCardNumber;
	} else {
		return value;
	}
}


// 版本号
export const generateVersion = (num) => {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = String(currentDate.getMonth() + 1).padStart(2, '0');
	const day = String(currentDate.getDate()).padStart(2, '0');
	const dateString = `${year}${month}${day}`;
	const version = `${dateString}.${num}`;

	return version;
}