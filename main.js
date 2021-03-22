import Vue from 'vue'
import App from './App'
// 引入VueX
import store from './store/store.js'

// 引入请求
import Request from './api/api.js'
Vue.prototype.Request = Request

// 引入uview
import uView from "uview-ui";
Vue.use(uView);




// 引入TIM
import TIM from 'tim-js-sdk';
import TIMUploadPlugin from 'tim-upload-plugin';

let options = {
	SDKAppID: 1400498913
};

let tim = TIM.create(options); // SDK 实例通常用 tim 表示

tim.setLogLevel(0); // 普通级别，日志量较多，接入时建议使用
tim.registerPlugin({
	'tim-upload-plugin': TIMUploadPlugin
});

// 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
let onMessageReceived = (event) => {
	console.warn(event.data)
	console.log("新信息")
	store.commit('setNewMessage',event.data)
};
tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);

Vue.prototype.Tim = tim



Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App,
	store,
})
app.$mount()
