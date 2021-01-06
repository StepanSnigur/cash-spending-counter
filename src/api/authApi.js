import app from 'firebase/app'

const authApi = {
  async registerNewUser(email, password) {
    const initialUserData = {
      spent: 0,
      balance: 0,
      expenses: [],
    }
    const data = await app.auth().createUserWithEmailAndPassword(email, password)
    const userId = data.user.uid
    const res = await app.firestore().collection('users').doc(userId).set(initialUserData)
    console.log('new user: ', data, userId, res)
    return {
      email,
      data: initialUserData,
      is: userId,
    }
  },

  async getUser(email, password) {
    const res = await app.auth().signInWithEmailAndPassword(email, password)
    const userId = res.user.uid
    const user = await app.firestore().collection('users').doc(userId).get()
    return {
      email,
      data: user.data(),
      id: userId,
    }
  },
}

export default authApi
