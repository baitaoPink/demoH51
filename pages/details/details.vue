<template>
	<view class="details-page">
		<view class="card-box u-flex u-p-30">
			<view class="u-flex-2">
				<view class="select-box" style="background-color: #fff; border-radius: 4rpx;">
					<uni-data-select v-model="params.serviceType" :localdata="serverList"
						@change="change"></uni-data-select>
				</view>
				<view class="uni-select u-m-t-20" style="background-color: #fff;">
					<u-input type="number" v-model="params.campId" placeholder="请湖人营地ID" ></u-input>
				</view>
			</view>
		</view>
		<view class="info-box">
			<view class="u-p-b-30"><text class="tips">投注积分</text><text class="u-p-l-20 u-type-warning">{{infos.points}}</text></view>
			<view v-show="infos.profit"><text class="tips">预计盈利积分</text><text class="u-p-l-20 u-type-error">{{infos.profit}}</text></view>
		</view>
		<view class="u-p-30 u-p-t-80">
			<u-button type="warning" class="u-m-t-80" :disabled="disbled" @tap="$u.throttle(submit(), 500)">立即竞猜</u-button>
		</view>

	</view>
</template>

<script>
	import api from '../../common/api';
	import request from '../../common/request';
	export default {
		data() {
			return {
				disbled: true,
				isDown: true,
				serverList: [{
						value: 1,
						text: 'QQ服务'
					},
					{
						value: 2,
						text: '微信服务'
					}
				],
				params: {
					points: 0,
					orderType: 1,
					serviceType: 1,
					memberId: 0,
					campId: '',
				},
				infos: {
					points:0,
					profit: 0
				}
			}
		},
		onLoad(options) {
			const titleType = {
				'1': '买单',
				'2': '买双'
			};
			uni.getStorage({
				key: 'infos',
				success: function(res) {
					if (res?.data) {
						_this.params = res?.data?.id;
						_this.getListData();
					} else {
						_this.handleLogin();
					}
			
				}
			});
			this.params.points = options.money || 0;
			this.params.orderType = options.type * 1;
			this.infos.points = options.money || 0;
			this.infos.profit = options.profit * 1 || 0;
			uni.setNavigationBarTitle({
				title: titleType[options.type]
			})

		},
		watch: {
			params: {
				handler(nVal,oVal){
					this.disbled = !nVal.serviceType || !nVal.points ||!nVal.campId;
				},
				deep: true
			}
		},
		methods: {
			submit() {
				request(api.appointOrderAdd, {
					...this.params
				}, 'post').then(res => {
					uni.switchTab({
						url: '/pages/index/index'
					})
				})
			}
		}
	}
</script>

<style scoped>
	.details-page {
		height: 100vh;
		background: #254d7d;
	}

	.select-box {
		position: relative;
	}

	.icon {
		position: absolute;
		top: 0;
		bottom: 0;
		right: 20rpx;
	}

	.uni-select {
		/* background-color: #fff; */
		font-size: 14px;
		border: 1px solid #e5e5e5;
		box-sizing: border-box;
		border-radius: 4px;
		padding: 0 5px;
		padding-left: 10px;
		position: relative;
		display: flex;
		-webkit-user-select: none;
		user-select: none;
		flex-direction: row;
		/* align-items: center; */
		text-align: left;
		border-bottom: solid 1px #e5e5e5;
		width: 100%;
		flex: 1;
		height: 35px;
		color: #fff !important;
	}

	.info-box {
		color: #fff;
		margin-top: 40rpx;
		padding: 60rpx 30rpx;
		border-top: 1px solid #ff9900;
		border-bottom: 1px solid #ff9900;
		background-color: rgb(14 14 14 / 50%);
		font-size: 60rpx;
	}

	.info-box .tips {
		display: inline-block;
		font-size: 32rpx;
		width: 200rpx;
		text-align: right;
	}
</style>