import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store/index'
// 引入vant组件
import Vant from 'vant'
// 引入vant组件样式
import 'vant/lib/index.css'
// 加载全局样式
import './style/index.css'
// 加载动态设置 rem 基准值
import 'amfe-flexible'
// 注册vant组件库
Vue.use(Vant)

Vue.config.productionTip = false
// 请求拦截器
// axios.interceptors.request.use(config => {
//   config.headers.Authorization = window.sessionStorage.getItem('tokenx')
//   return config
// })

// 路由导航卫士
// router.beforeEach((to, from, next) => {
//   if (to.path === '/') return next()
//   const tokenstr = window.sessionStorage.getItem('tokenx')
//   if (!tokenstr) return next('/')
//   next()
// })
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
