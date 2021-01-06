import authApi from '../../api/authApi'
import router from '../../router'

export default {
  state: {
    email: null,
    id: null,
    isLoading: false,
    error: false,
    isTimeoutRunning: false,
    icon: '',
    isIconLoading: false,
    isEmailLoading: false,
  },
  mutations: {
    setUserData(state, user) {
      state.error = false
      state.email = user.email
      state.id = user.id
      state.icon = user.data.icon
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
    clearUserData(state) {
      state.email = null
      state.id = null
      state.isLoading = false
      state.error = false
      state.isTimeoutRunning = false
    },

    setProfileIconLoading(state, isLoading) {
      state.isIconLoading = isLoading
    },
    changeProfileIcon(state, newIcon) {
      state.icon = newIcon
    },
    setUserEmailLoading(state, isLoading) {
      state.isEmailLoading = isLoading
    },
    changeEmail(state, newEmail) {
      state.email = newEmail
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
        commit('setExpenses', userData.data)
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
    async logOut({ commit }) {
      try {
        commit('setLoading', true)
        await authApi.logOut()
        router.push('/login')
        commit('clearUserData')
      } catch (err) {
        commit('setError', 'Ошибка выхода')
      } finally {
        commit('setLoading', false)
      }
    },
    async changeUserIcon({ commit }, { userId, icon }) {
      try {
        commit('setProfileIconLoading', true)
        const newProfileIcon = await authApi.changeProfileIcon(userId, icon)
        commit('changeProfileIcon', newProfileIcon)
      } catch (err) {
        commit('setError', 'Ошибка загрузки фото')
      } finally {
        commit('setProfileIconLoading', false)
      }
    },
    async changeUserEmail({ commit }, email) {
      try {
        commit('setUserEmailLoading', true)
        await authApi.changeEmail(email)
        commit('changeEmail', email)
      } catch (err) {
        commit('setError', 'Ошибка при изменении email, возможно такой аккаунт уже существует')
      } finally {
        commit('setUserEmailLoading', false)
      }
    },
  },
  getters: {
    user(state) {
      return state
    },
  },
}
