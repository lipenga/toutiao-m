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
