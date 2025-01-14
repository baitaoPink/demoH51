<template>
	<view class="record-list-page">
		<u-sticky bg-color="rgb(25 46 69)" z-index="22">
			<view class="u-p-30 search-box">
				<u-search placeholder="请输入营地ID" color="#fff" v-model="keyword" bg-color="#1a2234"
					action-style="color:#fff" @search="handleSearch" @custom="handleSearch"></u-search>
			</view>
		</u-sticky>

		<view class="u-p-30">
			<u-list @scrolltolower="scrolltolower">
				<u-list-item v-for="(item, index) in data" :key="index">
					<view class="list-item u-flex">
						<view class="u-flex u-flex-3">
							<view class="u-flex-0 u-flex item-center" style="flex:none">
								<u-avatar slot="icon" mode="square" size="80" :src="item.img"
									customStyle="margin: -3px 5px -3px 0"></u-avatar>
								<text class="u-p-l-10">{{item.name}}</text>
							</view>

							<view :class="['u-flex-1', item.isWin ? 'u-type-primary': 'u-type-error']">
								{{item.isWin ? '胜利': '失败'}}</view>
							<view class="u-flex-1"><text class="u-type-warning text-special">{{item.score}}</text>分
							</view>
							<view class="u-flex-1 u-tips-color"><text
									class="u-type-primary text-special">{{item.num1}}</text>/<text
									class="u-type-error text-special">{{item.num2}}</text>/<text
									class="u-type-success text-special">{{item.num3}}</text></view>
						</view>

						<view class="u-flex-1 u-tips-color">{{item.time}}</view>
					</view>
				</u-list-item>
			</u-list>
			<u-empty class="u-m-t-60" v-show="!data.length" mode="data"
				icon="http://cdn.uviewui.com/uview/empty/car.png">
			</u-empty>
		</view>

	</view>
</template>

<script>
	import request from '../../common/request';
	import api from '../../common/api';
	export default {
		data() {
			return {
				infos: {},
				loading: false,
				keyword: '',
				data: []
			}
		},
		methods: {
			initData() {
				const _this = this;
				uni.getStorage({
					key: 'infos',
					success: function(res) {
						if (res?.data) {
							_this.infos = res?.data ?? {};
							_this.getListData();
						}

					}
				});
			},
			getListData() {
				this.loading = true;
				request(api.getPlayDetailList, {
					"friendUserId": this.keyword || `${this.infos.openid}`,
				}, 'post').then(res => {
					const list = res?.data?.list?.map(item => {
						return {
							img: item.heroPicUrl,
							name: item.heroName,
							isWin: item.gameResult === 1,
							score: item.gradeGame,
							num1: item.killCnt,
							num2: item.deadCnt,
							num3: item.assistCnt,
							time: item.dtEventTime
						}
					})
					this.data = list ?? [];
				}).finally(() => {
					this.loading = false;
				})
			},

			handleSearch() {
				this.getListData();
			},
		},
		onShow() {
			this.initData();
		}
	}
</script>

<style scoped>
	.record-list-page {
		background: #254d7d;
		height: 100vh;
	}

	.list-item {
		justify-content: space-between;
		text-align: center;
		color: #ffffffe3;
		padding: 30rpx 0;
		font-weight: 300;
		/* border: 1px solid; */
		border-bottom: 1px dashed #ffffff24;
	}
</style>