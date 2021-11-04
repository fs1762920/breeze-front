import axios from 'axios';
import router from '../router/index'

var baseUrl = process.env.BASE_URL

axios.defaults.timeout = 30000
// 请求拦截器
axios.interceptors.request.use(
  config => {
    //发送请求前需要做什么，一般检查token
    // console.log("token:", localStorage.getItem('satoken'))
    if (localStorage.getItem('satoken')) {
      config.headers.satoken = "Bearer " + localStorage.getItem('satoken');
      // console.log("header:"+config.headers.satoken)
    }
    return config;
  },
 
  error => {
   // 对请求错误做些什么
    return Promise.reject(error);
  }
)
 
// 响应拦截器
axios.interceptors.response.use(
  response => {
    // 对响应数据做点什么,一般是判断状态码，进行一些逻辑处理
    if(response.data.code === 405) {
      router.replace('/login')
    }
    return response;
  },
  error => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
)
 
//GET请求
export const $get = function (url, params) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',//请求方式
      url: url,         //请求url
      params,      //请求参数
      baseURL: baseUrl //基础地址,将自动加在 `url` 前面
    }).then(res => {
      resolve(res.data)
    }).catch(error => {
      reject(error)
    })
  })
}
 
//POST请求
export const $post = function (url, param) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      data: param ? param : "", //数据体
      baseURL: baseUrl
    }).then(res => {
      resolve(res.data)
    }).catch(error => {
      reject(error)
    })
  })
}