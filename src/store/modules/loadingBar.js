export default {
  state: {
    isLoading: false,
  },
  mutations: {
    setLoadingBarState(state, isLoading) {
      state.isLoading = isLoading
    },
  },
  actions: {
    setLoadingBarLoading({ commit }, { isLoading }) {
      commit('setLoadingBarState', isLoading)
    },
  },
  getters: {
    loadingBarState(state) {
      return state
    },
  },
}
