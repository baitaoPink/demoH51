<template>
	<view class="home-page u-text-center">
		<u-image :src="homeImg" width="750px" height="100%" mode="widthFix"></u-image>
		<view class="btn">
			<u-button type="error" @click="$u.throttle(handleJumpIndex(), 500)">立即竞猜</u-button>
		</view>
	</view>
</template>

<script>
	import homeImg from '@/static/home.jpg'
	export default {
		data() {
			return {
				homeImg
			}
		},
		onLoad(){
			console.log(this.homeImg)
		},
		methods: {
			handleJumpIndex(){
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		},
		onShow() {
			uni.getStorage({
				key: 'infos',
				success: function(res) {
					if (!res || !res.data) {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					} 
				},
				fail() {
					uni.reLaunch({
						url:'/pages/login/login'
					})
				}
			});
		}
	}
</script>

<style scoped>
	page {
		background-color: #0f151f;
	}
.home-page {
	background: #180d0c;
	height: 100%;
	box-sizing: border-box;
	max-width: 750rpx;
	overflow: hidden;
	box-sizing: border-box;
	position: relative;
	display: flex;
	justify-content: center;
}
.btn {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 140rpx;
	padding: 0 120rpx;
}
</style>
