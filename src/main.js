import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入vant组件
import Vant from 'vant'
// 引入vant组件样式
import 'vant/lib/index.css'
// 加载全局样式
import './style/index.css'
// 注册vant组件库
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
