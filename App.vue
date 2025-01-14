<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "./uni_modules/vk-uview-ui/index.scss";
	@import "common/css/demo.scss";
</style>
<style>
	page {
		max-width: 750rpx;
		margin: 0 auto;
	}
	.u-sticky {
	  top: 0 !important; /* 确保top为0 */
	   z-index: 99999;
	}
</style>
