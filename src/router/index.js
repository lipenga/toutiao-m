import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 路由表
const routes = [
  {
    path: '/',
    component: () => import('@/views/login')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/layout',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '/home',

        component: () => import('@/views/home/home.vue')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/qa.vue')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/video.vue')
      },
      {
        path: '',
        name: 'my',
        component: () => import('@/views/my/my.vue')
      }
    ]
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
