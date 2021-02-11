export default {
  state: {
    theme: '',
  },
  mutations: {
    setTheme(state, theme) {
      state.theme = theme
    },
  },
  actions: {
    changeTheme({ commit }, theme) {
      commit('setTheme', theme)
    },
  },
  getters: {
    theme(state) {
      return state
    },
  },
}
