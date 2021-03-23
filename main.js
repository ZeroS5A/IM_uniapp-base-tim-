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
import tim from 'common/timEvent.js'
Vue.prototype.Tim = tim


Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App,
	store,
})
app.$mount()
