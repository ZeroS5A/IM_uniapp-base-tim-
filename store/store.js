import Vue from 'vue'
import Vuex from 'vuex'

import Request from '@/api/api.js'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
    state:{
			//存放的键值对就是所要管理的状态
			name:'helloVueX',
			isLogin: false,
			newMessage: [],
			userData:{
				userTimId:'',
				userName:'',
				userNickName:'',
				avatarUrl:'',
				email:'',
				role:''
			},
			userProfile: {
				userID:'',
				adminForbidType: "",
				allowType: "",
				avatar: "",
				birthday: 0,
				gender: "",
				language: 0,
				lastUpdatedTime: 0,
				level: 0,
				location: "",
				messageSettings: 0,
				nick: "",
			},
			userRelation: [],
    },
		mutations:{
			//es6语法，等同edit:funcion(){...}
			edit(state){
				state.name = 'jack'
			},
			changeLoginState(state, isLogin){
				state.isLogin = isLogin
			},
			setNewMessage(state, newMessage){
				state.newMessage = newMessage
			},
			// 获取用户信息（后台）
			setUserData(state, data){
				state.userData = data
			},
			// 更新用户信息（后台）
			updateUserData(state){
				Request.GetUserData(state.userProfile.userID)
				.then(res=>{
					if(res.data.code == 200){
						state.userData = {
							...state.userData,
							userTimId: res.data.data.userTimId,
							email: res.data.data.email,
							avatarUrl: res.data.data.avatarUrl
						}
					}
				})
			},
			// 重置用户信息
			resetUserData(state){
				state.userData = {
					userTimId:'',
					userName:'',
					userNickName:'',
					avatarUrl:'',
					email:'',
					role:''
				}
			},
			// 获取用户信息（tim端）
			setUserProfile(state, profile){
				state.userProfile = profile
			},
			// 获取好友
			getUserRelation(state){
				if (!state.isLogin){
					state.userRelation = []
					return
				}
				Request.GetUserRelation(state.userProfile.userID)
				.then((res)=>{
					// console.log(res.data.data.UserProfileItem)
					let relation = res.data.data.UserProfileItem
					if (!relation){
						state.userRelation = []
						return
					}
					
					let reaList = []
					relation.forEach(item=>{
						let rea = {
							userID: item.To_Account,
							userNick: '',
							userAvatar: ''
						}
						item.ProfileItem.forEach(i=>{
							if (i.Tag == "Tag_Profile_IM_Nick"){
								rea.userNick = i.Value
							}
							if (i.Tag == "Tag_Profile_IM_Image"){
								rea.userAvatar = i.Value
							}
						})
						reaList.push(rea)
					})
					console.log(reaList)
					state.userRelation = reaList
					
				})
			},
		}
})

export default store