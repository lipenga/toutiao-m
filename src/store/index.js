import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
Vue.use(Vuex)
// Vue.config.devtools = true
// const token = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: { user: getItem('token') },
  mutations: {
    setUser(state, data) {
      state.user = data
      // window.localStorage.setItem('token', JSON.stringify(state.user))
      setItem('token', JSON.stringify(state.user))
    }
  },
  actions: {},
  modules: {}
})
