<template>
	<view>
		<!-- <image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view> -->
		<uni-list-item
			v-if="isLogin"
			title="ZeroS" 
			note="列表描述信息" 
			showArrow thumb="https://lczeros.cn/blogData/images/b2ac992080e7ad69a4797ef82ccfc87a.jpeg" 
			thumb-size="lg" 
			rightText="大图"
			style=";"
			link
			@click="logout()"
		/>
		<Login v-if="!isLogin"></Login>
		

	</view>
</template>

<script>
	// 引入组件
	import Login from "@/components/login.nvue"
	export default {
		components: {
			Login
		},
		data() {
			return {
				
			}
		},
		onLoad() {
			// this.getStorage('isLogin')
			uni.showModal({
				title: 'test',
				content: this.$store.state.isLogin,
				showCancel:false
			})

		},
		computed: {
			isLogin(){
				return this.$store.state.isLogin;
			}
		},
		methods: {
			logout: function () {
				let promise = this.Tim.logout();
				promise.then((imResponse)=> {
					this.$store.commit('changeLoginState',false)
				  console.log(imResponse.data); // 登出成功
				}).catch((imError)=> {
					this.$store.commit('changeLoginState',false)
				  console.warn('logout error:', imError);
				});
			},
			getStorage: function (key) {
				if (key.length === 0) {
					uni.showModal({
						title: '读取数据失败',
						content: "key 不能为空",
						showCancel:false
					})
				} else {
					uni.getStorage({
						key: key,
						success: (res) => {
							uni.showModal({
								title: '读取数据成功',
								content: "data: '" + res.data + "'",
								showCancel:false
							})
						},
						fail: () => {
							uni.showModal({
								title: '读取数据失败',
								content: "找不到 key 对应的数据",
								showCancel:false
							})
						}
					})
				}
			},
			setStorage: function () {
				var key = this.key
				var data = this.data
				if (key.length === 0) {
					uni.showModal({
						title: '保存数据失败',
						content: 'key 不能为空',
						showCancel:false
					})
				} else {
					uni.setStorage({
						key: key,
						data: data,
						success: (res) => {
							uni.showModal({
								title: '存储数据成功',
								content: JSON.stringify(res.errMsg),
								showCancel:false
							})
						},
						fail: () => {
							uni.showModal({
								title: '储存数据失败!',
								showCancel:false
							})
						}
					})
				}
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
