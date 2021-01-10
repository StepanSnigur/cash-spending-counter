import userExpensesApi from '../../api/userExpensesApi'

export default {
  state: {
    balance: 0,
    list: [],
    spent: 0,
    isLoading: false,
    error: false,
  },
  mutations: {
    setExpenses(state, userExpenses) {
      state.balance = userExpenses.balance
      state.list = userExpenses.expences
      state.spent = userExpenses.spent
    },
    addNewExpense(state, newExpense) {
      state.list.push(newExpense)
      state.isLoading = false
    },
    startLoading(state) {
      state.isLoading = true
    },
    setError(state, error) {
      state.error = error
    },
  },
  actions: {
    async addExpense({ commit, state, rootState }, { name, price, date }) {
      try {
        console.log(date, 'date')
        commit('startLoading')
        await userExpensesApi.addNewExpense(name, price, rootState.user.id, state.list)
        commit('addNewExpense', {
          name,
          price,
        })
      } catch (e) {
        commit('setError', true)
      }
    },
  },
  getters: {
    expenses(state) {
      return state
    },
  },
}
