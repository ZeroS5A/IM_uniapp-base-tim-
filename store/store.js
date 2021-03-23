import Vue from 'vue'
import Vuex from 'vuex'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
    state:{
			//存放的键值对就是所要管理的状态
			name:'helloVueX',
			isLogin: false,
			newMessage: [],
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
			setUserProfile(state, profile){
				state.userProfile = profile
			}
		}
})

export default store