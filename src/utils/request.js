// 封装axios模块
import axios from 'axios'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
// 请求拦截器
// axios.interceptors.request.use(config => {
//   config.headers.Authorization = window.sessionStorage.getItem('tokenx')
//   return config
// })
export default request
