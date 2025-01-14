<template>
	<view class="my-page u-p-30">
		<view class="card-box">
			<text class="tips">总资产：</text>
			<text class="u-type-error">{{infos.remainingPoints}}</text>
			<text class="u-tips-color"> 积分</text>
		</view>
		<!-- <view class="card-box">
			<text class="tips">总盈亏：</text>
			<text class="u-type-error">100</text>
			<text class="u-tips-color"> 积分</text>
		</view> -->
		<view class="card-box">
			<text class="tips">今日盈亏：</text>
			<text class="u-type-error">0</text>
			<text class="u-tips-color"> 积分</text>
		</view>
		<view class="u-flex u-p-30 u-m-t-80">
			<u-button type="warning" class="u-flex-1 u-m-r-10">充值</u-button>
			<u-button type="primary" class="u-flex-1 u-m-l-10">体现</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				infos: {
					remainingPoints: 0,
					
				}
			}
		},
		methods: {
			
		},
		onLoad() {
			const _this = this;
			uni.getStorage({
				key: 'infos',
				success: function(res) {
					_this.infos.remainingPoints = res.data?.remainingPoints ?? 0;
				}
			});
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
.my-page {
	height: 100vh;
	background: #254d7d;
}
.card-box {
	padding: 40rpx 50rpx;
	color: #fff;
	border: 1px solid #eddc90;
	border-radius: 10rpx;
}
.card-box +.card-box {
	margin-top: 30rpx;
}
.tips {
	font-size: 48rpx;
}
.u-type-error {
	font-size: 70rpx;
}
.u-tips-color {
	font-size: 22rpx;
}
</style>
