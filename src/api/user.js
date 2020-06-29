import request from '@/utils/request'
// 登陆请求
export const login = (data) => {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data: data
  })
}
// 发送验证码请求
export const sendSms = (data) => {
  return request({
    method: 'get',
    url: `/app/v1_0/sms/codes/${data}`

  })
}
