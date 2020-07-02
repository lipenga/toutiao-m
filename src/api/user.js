import request from '@/utils/request'
// import store from '@/store/index'
// 登陆请求
export const login = data => {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data: data
  })
}
// 发送验证码请求
export const sendSms = data => {
  return request({
    method: 'get',
    url: `/app/v1_0/sms/codes/${data}`
  })
}
// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
// 获取用户频道列表
export const getuserlist = function(data) {
  return request({
    method: 'get',
    url: '/app/v1_0/user/channels'
  })
}
// 获取文章列表
export const getnewslist = function(params) {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
