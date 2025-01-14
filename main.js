import App from './App'
// import '@/utils/interceptor.js'

// 引入 uView UI
import uView from './uni_modules/vk-uview-ui';



// #ifdef VUE2

import Vue from 'vue'
// 使用 uView UI
Vue.use(uView);

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})

   console.log(this.$request)
app.$mount()

// #endif



// #ifdef VUE3

import { createSSRApp } from 'vue'
export function createApp() {
	const app = createSSRApp(App)

	// 使用 uView UI
	app.use(uView)

	return {
		app
	}
}

// #endif