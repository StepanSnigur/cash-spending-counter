import api from './apiManager'

const userExpensesApi = {
  async checkIsExpensesExpired(userId) {
    const dateNow = new Date().getTime()
    const expensesExpirationTime = await (await api.searchUser(userId).get()).data().expiresIn
    if (!expensesExpirationTime) {
      await this.setNewExpirationTime()
    } else if (dateNow >= expensesExpirationTime) {
      console.log('expenses expired')
      await this.updateListsAfterExpiration(userId)
    }
  },
  async setNewExpirationTime(userId) {
    const expirationDate = new Date()
    expirationDate.setMonth(expirationDate.getMonth() + 1)
    await api.searchUser(userId).update({
      expiresIn: expirationDate.getTime(),
    })
  },
  async updateListsAfterExpiration(userId) {
    const oldExpenses = await api.searchUser(userId).get()
    const prevSpent = await oldExpenses.data()

    const expireDate = new Date(prevSpent.expiresIn)
    const prevMonth = new Date(prevSpent.expiresIn)
    prevMonth.setMonth(expireDate.getMonth() - 1)
    const prevExpenseData = {
      spent: prevSpent.spent,
      date: prevMonth.toLocaleString('default', { month: 'long' }),
    }
    const updatedPrevExpenses = [...prevSpent.prevExpenses, prevExpenseData]
    expireDate.setMonth(expireDate.getMonth() + 1)

    await this.clearExpensesData(userId, updatedPrevExpenses, expireDate)
  },
  async updateExpenses(userId, newExpenseList, spent, currentBalance) {
    if (!spent || !currentBalance) throw new Error('Error in "updateExpenses", spent or current balance is not defined')
    console.log(api)
    await api.searchUser(userId).update({
      expences: newExpenseList,
      balance: currentBalance,
      spent,
    })
  },
  async updateReplenishments(userId, newReplenishmentsList, currentBalance) {
    if (!currentBalance) throw new Error('Error in "updateReplenishments", current balance is not defined')
    await api.searchUser(userId).update({
      replenishments: newReplenishmentsList,
      balance: currentBalance,
    })
  },
  async clearExpensesData(userId, updatedPrevExpenses, newExpireDate) {
    await api.searchUser(userId).update({
      replenishments: [],
      expences: [],
      balance: 0,
      spent: 0,
      prevExpenses: updatedPrevExpenses,
      expiresIn: newExpireDate.getTime(),
    })
  },
}

export default userExpensesApi
