import authApi from '../../api/authApi'
import router from '../../router'

export default {
  state: {
    email: null,
    id: null,
    isLoading: false,
    error: false,
    isTimeoutRunning: false,
  },
  mutations: {
    setUserData(state, data) {
      state.error = false
      state.email = data.email
      state.id = data.id
    },
    setError(state, error) {
      state.error = error.message
      if (!state.isTimeoutRunning) {
        state.isTimeoutRunning = true
        setTimeout(() => {
          state.error = false
          state.isTimeoutRunning = false
        }, 3000)
      }
    },
    setLoading(state, loading) {
      state.isLoading = loading
    },
  },
  actions: {
    async registerUser(context) {
      const result = await authApi.registerNewUser('testvue@mail.ru', 'testvue@mail.ru')
      console.log(result, context)
    },
    async setUser({ commit }, { email, password }) {
      try {
        commit('setLoading', true)
        const userData = await authApi.getUser(email, password)
        commit('setUserData', userData)
        router.push('/user')
      } catch (err) {
        commit('setError', err)
      } finally {
        commit('setLoading', false)
      }
    },
    async addNewUser({ commit }, { email, password }) {
      try {
        commit('setLoading', true)
        const userData = await authApi.registerNewUser(email, password)
        commit('setUserData', userData)
        router.push('/user')
      } catch (err) {
        commit('setError', err)
      } finally {
        commit('setLoading', false)
      }
    },
  },
  getters: {
    user(state) {
      return state
    },
  },
}
