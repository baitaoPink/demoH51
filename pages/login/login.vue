<template>
	<view class="content u-text-center u-m-t-80">
		<view class="u-page">
			<view class="u-m-t-20 u-font-40">微信一键登陆</view>
			<view class="u-m-t-20 u-font-28 u-tips-color">关注后自动登陆</view>
			<!-- <image class="logo" src="/static/login.jpeg"></image> -->
			<view class="u-p-r-80 u-p-l-80">
				<u-image mode="widthFix" src="/static/login.jpeg" class=""></u-image>
			</view>
			<view class="text-area">
				<text class="title u-tips-color">[扫码登陆]代表同意<text class="u-type-primary">《用户协议》</text> <text
						class="u-type-primary">《隐私政策》</text></text>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../common/request';
	import api from '../../common/api';
	export default {
		data() {
			return {

			}
		},
		methods: {
			handleLogin() {
				const _this = this;
				request(api.login, {
					"name": "test001",
					"uid": "u00001"
				}, 'post').then(infos => {
					_this.infos = infos?.data || {};
					uni.setStorageSync('token', `${infos.data.type} ${infos.data.token}`)
					uni.setStorage({
						key: 'infos',
						data: infos.data,
						success: function() {
							uni.switchTab({
								url: '/pages/home/home'
							})
						}
					});
				})

			},
		},
		onShow() {
			const _this = this;
			uni.getStorage({
				key: 'infos',
				success: function(res) {
					if (res?.data) {
						_this.infos = res?.data ?? {};
						uni.switchTab({
							url: '/pages/home/home'
						})
					} else {
						_this.handleLogin();
					}
				},
				fail() {
					_this.handleLogin()
				}
			});
		}

	}
</script>

<style>

</style>