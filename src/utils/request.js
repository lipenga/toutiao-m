// 封装axios模块
import axios from 'axios'
import JSONBig from 'json-bigint'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  // 自定义后端返回的原始数据
  transformResponse: [
    function(data) {
      try {
        return JSONBig.parse(data)
      } catch (err) {
        return data
      }
    }
  ]
})
// 请求拦截器
// axios.interceptors.request.use(config => {
// config：本次请求的请求配置对象
//   config.headers.Authorization = window.sessionStorage.getItem('tokenx')
//   return config
// })
// 请求拦截器
request.interceptors.request.use(
  function(config) {
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)
export default request
