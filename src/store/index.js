import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import expenses from './modules/expenses'
import loadingBar from './modules/loadingBar'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    expenses,
    loadingBar,
  },
})
