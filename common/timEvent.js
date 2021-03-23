// 引入TIM
import TIM from 'tim-js-sdk';
import TIMUploadPlugin from 'tim-upload-plugin';
import store from '../store/store.js'

let options = {
	SDKAppID: 1400498913
};

let tim = TIM.create(options); // SDK 实例通常用 tim 表示

tim.setLogLevel(0); // 普通级别，日志量较多，接入时建议使用
tim.registerPlugin({
	'tim-upload-plugin': TIMUploadPlugin
});

// 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
let onMessageReceived = function(event) {
	console.warn(event.data)
	console.log("新信息")
	store.commit('setNewMessage',event.data)
};

tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);

// 就绪时触发
let onSdkReady = function(event) {
  getUserProfile()
};
tim.on(TIM.EVENT.SDK_READY, onSdkReady);

// 获取用户信息
let getUserProfile = function () {
	let promise = tim.getMyProfile();
	promise.then((imResponse) => {
		console.log("个人信息",imResponse.data); // 个人资料 - Profile 实例
		store.commit('setUserProfile',imResponse.data)
	}).catch(function(imError) {
		console.warn('getMyProfile error:', imError); // 获取个人资料失败的相关信息
	});
}

export default tim