<template>
	<view class="content u-text-center">
		<!-- <view></view> -->
		<u-sticky bg-color="#254d7d" top="0" :offset-top="0" sticky-class="my-sticky-class" :zIndex="666">
			<u-tabs bg-color="rgb(25 46 69)" inactive-color="#fff" :list="headerTabs" :is-scroll="false"
				v-model="headerCurrent" item-width="60"></u-tabs>
		</u-sticky>
		<view v-show="!headerCurrent">
			<view class="index-list-box u-p-20">
				<view :class="['list u-p-20 u-p-t-40 u-p-b-40 u-text-left u-font-sm', !carIndex ? 'on' : '']"
				@tap="$u.throttle(handleChangeCarIndex(0), 500)">
					<view class="u-p-b-20  u-font-xl u-type-primary">200</view>
					<view><text>预计盈利：</text><text class="u-type-error">200</text></view>
				</view>
				<view :class="['list u-p-20 u-p-t-40 u-p-b-40 u-text-left u-font-sm', carIndex === 1 ? 'on' : '']"
				@tap="$u.throttle(handleChangeCarIndex(1), 500)">
					<view class="u-p-b-20  u-font-xl u-type-primary">200</view>
					<view><text>预计盈利：</text><text class="u-type-error">200</text></view>
				</view>
				<view :class="['list u-p-20 u-p-t-40 u-p-b-40 u-text-left u-font-sm', carIndex === 2 ? 'on' : '']"
				@tap="$u.throttle(handleChangeCarIndex(2), 500)">
					<view class="u-p-b-20  u-font-xl u-type-primary">200</view>
					<view><text>预计盈利：</text><text class="u-type-error">200</text></view>
				</view>
				<view :class="['list u-p-20 u-p-t-40 u-p-b-40 u-text-left u-font-sm', carIndex === 3 ? 'on' : '']"
					@tap="$u.throttle(handleChangeCarIndex(3), 500)">
					<view class="u-p-b-20  u-font-xl">自定义</view>
					<view>
						<u-input type="number" v-model="keyword" class="list-input" color="#fff"
							@change.native="handleInput" @input="handleInput" @focus="$u.throttle(handleChangeCarIndex(3), 500)" />
					</view>
				</view>
			</view>
			<view class="u-flex u-p-l-20 u-p-r-20 u-m-t-30 u-m-b-30">
				<u-button type="primary" class="u-flex-1 u-m-r-10"
					@tap="$u.throttle(handleJumpDetails(1), 500)">买单</u-button>
				<u-button type="warning" class="u-flex-1 u-m-l-10"
					@tap="$u.throttle(handleJumpDetails(2), 500)">买双</u-button>
			</view>
			<view class="u-p-t-30">
				<u-tabs bg-color="rgb(14 14 14 / 50%)" inactive-color="#fff" :list="list" :is-scroll="false"
					v-model="current" @change="handleChangeTab" item-width="60"></u-tabs>
				<view v-show="!current" class="u-p-20">
					<view class="list-header u-p-b-20 u-font-lg">
						<view class="u-flex-1 u-font-sm">营地ID</view>
						<view class="u-flex-1 u-font-sm">类型</view>
						<view class="u-flex-1 u-font-sm">投注积分</view>
					</view>
					<u-list @scrolltolower="scrolltolower">
						<u-list-item v-for="(item, index) in dataOne" :key="index">
							<view class="list-item">
								<view class="u-flex-1">{{item.id}}</view>
								<view class="u-flex-1">{{item.type === 1 ? '买单': '买双'}}</view>
								<view class="u-flex-1 u-type-primary text-special">{{item.bettingPoints}}</view>
							</view>

						</u-list-item>
						<u-empty class="u-m-t-60" v-show="!dataOne.length" mode="data"
							icon="http://cdn.uviewui.com/uview/empty/car.png">
						</u-empty>
					</u-list>
				</view>
				<view v-show="current" class="u-p-t-20">
					<view class="list-header u-p-b-20 u-font-lg">
						<view class="u-flex-2 u-font-sm">名称</view>
						<view class="u-flex-1 u-font-sm">营地ID</view>
						<view class="u-flex-1 u-font-sm">类型</view>
						<!-- <view class="u-flex-1 u-font-sm">评分</view> -->
						<view class="u-flex-1 u-font-sm">结果</view>
						<view class="u-flex-1 u-font-sm">投注积分</view>
						<view class="u-flex-1 u-font-sm">盈利</view>
					</view>
					<u-list @scrolltolower="scrolltolower">
						<u-list-item v-for="(item, index) in dataTwo" :key="index">
							<view class="list-item">
								<view class="u-flex-2 u-flex item-center u-p-l-15" style="box-sizing: border-box;">
									<u-avatar slot="icon" mode="square" size="60" :src="item.img"
										customStyle="margin: -3px 5px -3px 0"></u-avatar>
									<text class="u-p-l-10">{{item.name || '暂无昵称'}}</text>
								</view>
								<view class="u-flex-1">{{item.id}}</view>
								<view class="u-flex-1">{{item.type === 1 ? '买单': '买双'}}</view>
								<view class="u-flex-1">{{item.result === 1? '赢': '输'}}</view>
								<!-- <view class="u-flex-1 u-type-warning text-special">{{item.score}}</view> -->
								<view class="u-flex-1 u-type-primary text-special">{{item.bettingPoints}}</view>
								<view class="u-flex-1 u-type-error  text-special">{{item.bettingPoints}}</view>
							</view>
						</u-list-item>
						<u-empty class="u-m-t-60" v-show="!dataTwo.length" mode="data"
							icon="http://cdn.uviewui.com/uview/empty/car.png">
						</u-empty>
					</u-list>
				</view>
			</view>
		</view>

		<view v-show="headerCurrent == 1">
			<view class="u-light-color u-p-80">敬请期待</view>
		</view>
		<view v-show="headerCurrent == 2">
			<view class="u-light-color u-p-80">敬请期待</view>
		</view>
	</view>
</template>

<script>
	import request from '../../common/request';
	import api from '../../common/api';
	export default {
		data() {
			return {
				keyword: '50',
				headerTabs: [{
						name: '个投',
						value: 1
					},
					{
						name: '房投',
						value: 2
					},
					{
						name: '赛投',
						value: 3
					}
				],
				headerCurrent: 0,
				list: [{
					name: '当前竞猜',

				}, {
					name: '历史竞猜'
				}, ],
				current: 0,
				dataOne: [
				],
				dataTwo: [],
				infos: {},
				loading: false,
				carIndex: 0,

			}
		},
		methods: {
			handleChangeCarIndex(index) {
				this.carIndex = index;
			},
			handleJumpDetails(type) {
				const infosType = {
					0: {
						money: 100,
						profit: 200
					},
					1: {
						money: 100,
						profit: 200
					},
					2: {
						money: 500,
						profit: 0
					},
					3: {
						money: this.keyword,
						profit: 0
					},
				};
				uni.navigateTo({
					url: `/pages/details/details?type=${type}&money=${infosType[this.carIndex].money}&profit=${infosType[this.carIndex].profit}`,
				})
			},
			getListData() {
				this.loading = true;
				request(api.getAppointOrderList, {
					"gameMemberOpenid": `${this.infos.openid}`,
					"designatedStatus": this.current
				}, 'POST').then(res => {
					const list = res?.data?.list?.map(item => {
						
						return {
							img: item.heroPicUrl,
							name: item.heroName,
							id: item.campId,
							type:  item.orderType * 1,
							// score: 4.8,
							result: item.success * 1,
							bettingPoints: item.points,
							profit: item.actualAddedPoints ?? 0
						}
					});
					if (this.current) {
						this.dataTwo = list ?? [];
						console.log(list, this.dataTwo)
					} else {
						this.dataOne = list ?? [];
						console.log(this.dataOne, list)
					}
					console.log(res);
				}).finally(() => {
					this.loading = false;
				})
				
			},

			initData() {
				const _this = this;
				uni.getStorage({
					key: 'infos',
					success: function(res) {
						if (res?.data) {
							_this.infos = res?.data ?? {};
							_this.getListData();
						} else {
							uni.reLaunch({
								url: '/pages/login/login'
							})
						}
					},
					fail() {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				});
			},
			handleInput(e) {
				let value = e;
				// 转换为数字
				value = value.replace(/[^\d]/g, '');

				// 只允许输入正整数
				if (value > 0 && value % 50 === 0) {
					this.keyword = value;
				} else {
					// 如果不是50的倍数，将其调整为最接近的50的倍数
					if (value > 0) {
						this.$nextTick(() => {
							this.keyword = Math.floor(value / 50) * 50;
						})

					} else {
						this.$nextTick(() => {
							this.keyword = 50;
						})

					}
				}
			},
		},
		onShow() {
			this.initData();
		},
		watch: {
			current: {
				handler: function(val, oldVal) {
					console.log(val)
					if (val !== oldVal) {

						if (val === 0) {
							this.dataOne = [];
						} else {
							this.dataTwo = [];
						}
						
						this.getListData()
					}

				},
				deep: true,
				// immediate: true,
			},
		}
	}
</script>

<style scoped>
	page {
		background-color: #254d7d;
	}
	.content {
		height: 100%;
		
	}

	.index-list-box {

		display: grid;
		grid-template-columns: 1fr 1fr;
		/* 分为两列，每列宽度相等 */
		gap: 40rpx;
		/* 列之间的间距 */
		color: #fff;
	}

	.list {
		border: 1px solid rgb(14 14 14 / 50%);
		border-radius: 8rpx;

		background-color: rgb(14 14 14 / 50%);
	}
	.list.on {
		border-color: #ff9900;
	}

	.list-input {
		background: #fff;
		border-radius: 6rpx;
		height: 68rpx;
		line-height: 68rpx;
		padding-left: 20rpx !important;
		/* padding: 20rpx; */
		box-sizing: border-box;
		font-size: 20rpx !important;
		color: #fff;
		/* border: 1px solid #535a7e; */
	}

	.list-input:focus {
		border: 1px solid #fff !important;
	}

	.list-item {
		display: flex;
		justify-content: space-between;
		font-weight: 300;
		justify-content: center;
		align-items: center;
		color: #ffffffe3;
		padding: 30rpx 0;
		/* border: 1px solid; */
		border-bottom: 1px dashed #ffffff24;
	}

	.text-special {
		font-weight: 500;
	}

	.list-header {
		display: flex;
		color: #fff;
		justify-content: space-between;
		font-weight: 600;
	}

	.list-header>view:first-child {
		/* max-width: 160rpx; */
	}

	.list-input {
		color: #fff;
	}
</style>
<style>
	.u-sticky {
		top: 0 !important;
		/* 确保top为0 */
		z-index: 1000;
	}
</style>