import { v4 as uuidv4 } from 'uuid'
import userExpensesApi from '../../api/userExpensesApi'
import sorter from '../../utils/sorter'

export default {
  state: {
    balance: 0,
    expenseList: [],
    replenishmentList: [],
    sortingData: {
      expenseList: {
        field: 'date',
        term: '',
      },
      replenishmentList: {
        field: 'date',
        term: '',
      },
    },
    isListLoading: false,
    expiresIn: null,
    spent: 0,
    isLoading: false,
    error: false,
  },
  mutations: {
    addNewExpense(state, newExpense) {
      state.expenseList.push(newExpense)
      state.isLoading = false
    },
    setNewListOrder(state, { listName, sortField }) {
      state.sortingData[listName].field = sortField
    },
    setNewSortTerm(state, { listName, newSortTerm }) {
      state.sortingData[listName].term = newSortTerm
    },
    updateList(
      state,
      {
        newExpensesList,
        newBalance,
        spent,
        listName = 'expenseList',
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
          ...state.expenseList,
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
          listName: 'expenseList',
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

        const newExpensesList = state.expenseList.filter((el) => el.id !== id)
        const spent = newExpensesList.reduce((acc, i) => acc + +i.price, 0)
        const newBalance = +state.balance + +state.expenseList.find((el) => el.id === id).price

        await userExpensesApi.updateExpenses(rootState.user.id, newExpensesList, spent, newBalance)
        commit('updateList', {
          newExpensesList,
          newBalance,
          spent,
          listName: 'expenseList',
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

        const newExpensesList = [...state.expenseList]
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
          listName: 'expenseList',
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
    sortList({ commit }, { listName, sortField }) {
      commit('setNewListOrder', {
        listName,
        sortField,
      })
    },
    changeSortTerm({ commit }, { listName, newSortTerm }) {
      commit('setNewSortTerm', {
        listName,
        newSortTerm,
      })
    },
  },
  getters: {
    expenses(state) {
      return state
    },
    getSortedList: (state) => (listName) => {
      const listToSort = [...state[listName]]
      const { field, term } = state.sortingData[listName]

      let sortedList = listToSort
      if (field === 'name') sortedList = listToSort.sort((a, b) => sorter.sortByAlphabet(a.name, b.name))
      else if (field === 'date') sortedList = listToSort.sort((a, b) => sorter.sortByDate(a.date, b.date))
      else if (field === 'price') sortedList = listToSort.sort((a, b) => sorter.sortByPrice(a.price, b.price))

      return sortedList.filter((el) => el.name.includes(term))
    },
    searchData: (state) => state.sortingData,
    getSearchTerm: (state) => (listName) => state.sortingData[listName]?.term,
  },
}
