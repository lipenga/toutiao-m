import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 路由表
const routes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/login')
  },
  {
    name: 'layout',
    path: '/layout',
    component: () => import('@/views/layout/index')
  }
]

const router = new VueRouter({
  routes
})
// 路由导航卫士
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   const tokenstr = window.sessionStorage.getItem('tokenx')
//   if (!tokenstr) return next('/login')
//   next()
// })
export default router
