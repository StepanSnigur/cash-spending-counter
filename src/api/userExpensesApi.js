import app from 'firebase/app'

const userExpensesApi = {
  // async addNewExpense(userId, expenseId, newExpensesList) {
  //   await app.firestore().collection('users').doc(userId).update({
  //     expences: newExpensesList,
  //   })
  // },
  async updateExpenses(userId, newExpenseList, spent, currentBalance) {
    if (!spent || !currentBalance) throw new Error('Error in "updateExpenses", spent or current balance is not defined')
    await app.firestore().collection('users').doc(userId).update({
      expences: newExpenseList,
      balance: currentBalance,
      spent,
    })
  },
  async updateReplenishments(userId, newReplenishmentsList, currentBalance) {
    if (!currentBalance) throw new Error('Error in "updateReplenishments", current balance is not defined')
    await app.firestore().collection('users').doc(userId).update({
      replenishments: newReplenishmentsList,
      balance: currentBalance,
    })
  },
}

export default userExpensesApi
