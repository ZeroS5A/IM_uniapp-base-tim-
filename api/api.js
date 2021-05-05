import axios from 'axios';
// import { Message } from 'view-design';
// import router from '../router'

const instance = axios.create({
  // baseURL: 'http://im.lczeros.cn/IM',
  // baseURL: 'http://192.168.31.181:8085/IM',
	baseURL: 'http://127.0.0.1:8085/IM',
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
// 响应拦截器
instance.interceptors.response.use(
  response => {
    //拦截失效token
    // if(response.data.code == 4107){
    //   router.push("/login")
    //   // 清除过期信息
    //   localStorage.removeItem("token")
    //   localStorage.removeItem("UserData")
    //   Message.info('登录已过期,请重新登陆');
    //   // 使用windows跳转无法保存状态
    //   // window.location.href='/login?type=4107'
    // }
    return response
  },
  error => {
    console.log(error)
		alert("网络错误")
    return Promise.reject(error)
  }
)
export default {
  UserLogin(data){
    return instance.post("/user/userLogin",data)
  },
	GetUserRelation(userID){
		return instance.post(`/user/getUserRelation?userID=${userID}`)
	},
	GetUserData(userID){
		return instance.post(`/user/getUserData?userID=${userID}`)
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
	UpdateEmail(data){
		return instance.post("/user/updateEmail",data)
	},
	UpdatePassWd(data){
		return instance.post("/user/updatePassWd",data)
	},
	UserRegister(data){
		return instance.post("/user/userRegister",data)
	},
	
	//上传接口
	UploadImage(data){
		return instance.post("/upload/image",data)
	},
	Test(){
	  return instance.post("/hello")
	},
	
	//帖子接口
	GetBlogList(userName){
		return instance.get(`/blog/getBlogList?userName=${userName}`)
	},
	GetBlogListById(userName){
		return instance.get(`/blog/getBlogListById?userName=${userName}`)
	},
	InsertBlog(data){
		return instance.post("/blog/insertBlog",data)
	},
	GetCommentList(blogId){
		return instance.get(`/blog/getCommentList?blogId=${blogId}`)
	},
	InsertComment(data){
		return instance.post("/blog/insertComment",data)
	},
	DeleteComment(commentId){
		return instance.delete(`/blog/deleteComment?commentId=${commentId}`)
	},
	DeleteBlog(blogId){
		return instance.delete(`/blog/deleteBlog?blogId=${blogId}`)
	},
	InsertLike(data){
		return instance.post("/blog/insertLike",data)
	},
	DeleteLike(data){
		return instance.post("/blog/deleteLike",data)
	},
}
