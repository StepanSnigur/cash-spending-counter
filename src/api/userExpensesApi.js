import app from 'firebase/app'

const userExpensesApi = {
  async addNewExpense(name, price, userId, prevUserExpenses) {
    await app.firestore().collection('users').doc(userId).update({
      expences: [
        ...prevUserExpenses,
        { name, price },
      ],
    })
  },
}

export default userExpensesApi
