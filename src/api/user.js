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
// 获取用户频道列表-
export const getuserlist = function(data) {
  return request({
    method: 'get',
    url: '/app/v1_0/user/channels'
  })
}
// - 获取全部用户频道列表
export const getalllist = function(data) {
  return request({
    method: 'get',
    url: '/app/v1_0/channels'
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
// 批量修改用户频道列表（部分覆盖）
export const editUserChannels = function(channel) {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}
// 删除用户频道列表（部分覆盖）
export const delUserChannels = function(channel) {
  return request({
    method: 'DELETE',
    url: '/app/v1_0/user/channels/' + channel
  })
}
// 获取联想建 议 自动补全

export const getsuggess = function(q) {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: { q }
  })
}
// 获取搜索结果

export const getresults = function(q) {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params: { q }
  })
}
// 获取新闻文章详情
export const getOneArticle = function(id) {
  return request({
    method: 'GET',
    url: '/app/v1_0/articles/' + id
  })
}
// 关注用户
export const addFollow = function(target) {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: { target }
  })
}
// 取消关注用户
export const delFollow = function(target) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${target}`
  })
}
// 收藏文章
export const collect = function(target) {
  return request({
    method: 'post',
    url: '/app/v1_0/article/collections',
    data: { target }
  })
}
// 取消收藏文章
export const Nocollect = function(target) {
  return request({
    method: 'delete',
    url: `/app/v1_0/article/collections/${target}`
  })
}
// 点赞文章
export const likeArt = function(target) {
  return request({
    method: 'post',
    url: '/app/v1_0/article/likings',
    data: { target }
  })
}
// 取消点赞文章
export const NolikeArt = function(target) {
  return request({
    method: 'delete',
    url: `/app/v1_0/article/likings/${target}`
  })
}
// 获取文章评论列表
export const getArticle = function(params) {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}

// 点赞评论
export const likeComment = function(target) {
  return request({
    method: 'post',
    url: '/app/v1_0/comment/likings',
    data: { target }
  })
}
// 取消点赞评论
export const NolikeComment = function(target) {
  return request({
    method: 'delete',
    url: `/app/v1_0/comment/likings/${target}`
  })
}
// 发布评论
export const postComment = function(data) {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
