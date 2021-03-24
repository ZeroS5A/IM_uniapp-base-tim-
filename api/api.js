import axios from 'axios';
// import { Message } from 'view-design';
// import router from '../router'

const instance = axios.create({
  // baseURL: 'https://lczeros.cn/MyBlog',
  baseURL: 'http://192.168.31.181:8085/IM',
  timeout: 10000,
  headers: {
    'Content-Type': "application/json;charset=UTF-8",
  },
  withCredentials: true,
});
// 请求拦截器,检测是否有token并携带
// instance.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem('token')
//     if (token !== null & token !== '') {
//       config.headers.Authorization = token
//     }
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )
// // 响应拦截器
// instance.interceptors.response.use(
//   response => {
//     //拦截失效token
//     if(response.data.code == 4107){
//       router.push("/login")
//       // 清除过期信息
//       localStorage.removeItem("token")
//       localStorage.removeItem("UserData")
//       Message.info('登录已过期,请重新登陆');
//       // 使用windows跳转无法保存状态
//       // window.location.href='/login?type=4107'
//     }
//     return response
//   },
//   error => {
//     console.log(error)
//     return Promise.reject(error)
//   }
// )
export default {
  UserLogin(data){
    return instance.post("/user/userLogin",data)
  },
	GetUserRelation(userID){
		return instance.post(`/user/getUserRelation?userID=${userID}`)
	},
	AddUserRelation(postData){
		return instance.post("/user/addUserRelation",postData)
	},
	DeleteUserRelation(postData){
		return instance.post("/user/deleteUserRelation",postData)
	},
	GetMailCode(data){
		return instance.post("/user/getMailCode",data)
	},
	UserRegister(data){
		return instance.post("/user/userRegister",data)
	},
	Test(){
	  return instance.post("/hello")
	}
}
