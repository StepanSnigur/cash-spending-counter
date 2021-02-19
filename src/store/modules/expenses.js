import { v4 as uuidv4 } from 'uuid'
import userExpensesApi from '../../api/userExpensesApi'

export default {
  state: {
    balance: 0,
    list: [],
    replenishmentList: [],
    isListLoading: false,
    expiresIn: null,
    spent: 0,
    isLoading: false,
    error: false,
  },
  mutations: {
    addNewExpense(state, newExpense) {
      state.list.push(newExpense)
      state.isLoading = false
    },
    updateList(
      state,
      {
        newExpensesList,
        newBalance,
        spent,
        listName = 'list',
      },
    ) {
      state[listName] = newExpensesList
      state.balance = newBalance
      state.spent = spent
    },
    updateExpirationDate(state, expirationDate) {
      state.expiresIn = expirationDate
    },
    updateReplenishmentList(state, newReplenishmentList) {
      state.replenishmentList = newReplenishmentList
    },
    setListLoading(state, isLoading) {
      state.isListLoading = isLoading
    },
    setLoading(state, isLoading) {
      state.isLoading = isLoading
    },
    setError(state, error) {
      state.error = error
      setTimeout(() => {
        state.error = false
      }, 1500)
    },
  },
  actions: {
    async addExpense({ commit, state, rootState }, { name, price, date }) {
      try {
        commit('setLoading', true)
        const expenseId = uuidv4()

        const newExpensesList = [
          ...state.list,
          {
            name,
            price,
            date: date.string,
            id: expenseId,
          },
        ]
        const spent = newExpensesList.reduce((acc, i) => acc + +i.price, 0)
        const newBalance = state.balance - price
        await userExpensesApi.updateExpenses(
          rootState.user.id,
          newExpensesList,
          spent,
          newBalance,
        )

        commit('updateList', {
          newExpensesList,
          newBalance,
          spent,
          listName: 'list',
        })
      } catch (e) {
        console.log(e)
        commit('setError', e.message)
      } finally {
        commit('setLoading', false)
      }
    },
    async deleteExpense({ commit, state, rootState }, { id }) {
      try {
        commit('setLoadingBarState', true)

        const newExpensesList = state.list.filter((el) => el.id !== id)
        const spent = newExpensesList.reduce((acc, i) => acc + +i.price, 0)
        const newBalance = +state.balance + +state.list.find((el) => el.id === id).price

        await userExpensesApi.updateExpenses(rootState.user.id, newExpensesList, spent, newBalance)
        commit('updateList', {
          newExpensesList,
          newBalance,
          spent,
          listName: 'list',
        })
      } catch (e) {
        console.log('error', e)
        commit('setError', e.message)
      } finally {
        commit('setLoadingBarState', false)
      }
    },
    async updateExpense({ commit, state, rootState }, { id, newName, newPrice }) {
      try {
        commit('setLoadingBarState', true)

        const newExpensesList = [...state.list]
        const expenseIndexToChange = newExpensesList.findIndex((expense) => expense.id === id)
        newExpensesList[expenseIndexToChange] = {
          ...newExpensesList[expenseIndexToChange],
          name: newName,
          price: newPrice,
        }
        const spent = newExpensesList.reduce((acc, i) => acc + +i.price, 0)
        const newBalance = +state.balance + (state.spent - spent)
        console.log(spent, newBalance, newExpensesList)

        await userExpensesApi.updateExpenses(rootState.user.id, newExpensesList, spent, newBalance)
        commit('updateList', {
          newExpensesList,
          newBalance,
          spent,
          listName: 'list',
        })
      } catch (e) {
        console.log('error', e)
        commit('setError', e.message)
      } finally {
        commit('setLoadingBarState', false)
      }
    },
    async addReplenishment({ commit, state, rootState }, { name, price, date }) {
      try {
        commit('setLoadingBarState', true)
        const replenishmentId = uuidv4()

        const newReplenishmentsList = [
          ...state.replenishmentList,
          {
            name,
            price,
            date: date.string,
            id: replenishmentId,
          },
        ]
        const newBalance = state.balance + +price
        await userExpensesApi.updateReplenishments(
          rootState.user.id,
          newReplenishmentsList,
          newBalance,
        )

        commit('updateList', {
          newExpensesList: newReplenishmentsList,
          newBalance,
          spent: state.spent, // spent not changing
          listName: 'replenishmentList',
        })
      } catch (e) {
        commit('setError', e.message)
      } finally {
        commit('setLoadingBarState', false)
      }
    },
    async deleteReplenishment({ commit, state, rootState }, { id }) {
      try {
        commit('setLoadingBarState', true)
        console.log(id)

        const newReplenishmentsList = state.replenishmentList.filter((rep) => rep.id !== id)
        const replenishmentToDelete = state.replenishmentList.find((rep) => rep.id === id)
        const newBalance = state.balance - replenishmentToDelete.price
        await userExpensesApi.updateReplenishments(
          rootState.user.id,
          newReplenishmentsList,
          newBalance,
        )

        commit('updateList', {
          newExpensesList: newReplenishmentsList,
          newBalance,
          spent: state.spent, // spent not changing
          listName: 'replenishmentList',
        })
      } catch (e) {
        commit('setError', e.message)
      } finally {
        commit('setLoadingBarState', false)
      }
    },
    async updateReplenishment({ commit, state, rootState }, { id, newName, newPrice }) {
      try {
        commit('setLoadingBarState', true)

        const newReplenishmentsList = [...state.replenishmentList]
        const replenishmentIdx = state.replenishmentList.findIndex((rep) => rep.id === id)
        newReplenishmentsList[replenishmentIdx] = {
          ...newReplenishmentsList[replenishmentIdx],
          name: newName,
          price: newPrice,
        }
        const oldReplenishmentsSum = state.replenishmentList.reduce((acc, i) => acc + +i.price, 0)
        const newReplenishmentsSum = newReplenishmentsList.reduce((acc, i) => acc + +i.price, 0)
        const newBalance = state.balance - oldReplenishmentsSum + newReplenishmentsSum

        await userExpensesApi.updateReplenishments(
          rootState.user.id,
          newReplenishmentsList,
          newBalance,
        )

        commit('updateList', {
          newExpensesList: newReplenishmentsList,
          newBalance,
          spent: state.spent, // spent not changing
          listName: 'replenishmentList',
        })
      } catch (e) {
        commit('setError', e.message)
      } finally {
        commit('setLoadingBarState', false)
      }
    },
  },
  getters: {
    expenses(state) {
      return state
    },
  },
}
