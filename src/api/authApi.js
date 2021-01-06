import app from 'firebase/app'

const authApi = {
  async registerNewUser(email, password) {
    const initialUserData = {
      spent: 0,
      balance: 0,
      expenses: [],
      icon: '',
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

  async logOut() {
    const res = await app.auth().signOut()
    return res
  },

  async changeProfileIcon(userId, icon) {
    const storageRef = app.storage().ref(`users-icons/${icon.name}`)
    const iconRef = await storageRef.put(icon)
    const iconDownloadUrl = await iconRef.ref.getDownloadURL()

    await app
      .firestore()
      .collection('users')
      .doc(userId)
      .update({ icon: iconDownloadUrl })
    return iconDownloadUrl
  },
  async changeEmail(newEmail) {
    const currentUser = await app.auth().currentUser
    if (!currentUser) throw new Error('Вы не зарегистрированы.')

    const res = currentUser.updateEmail(newEmail)
    return res
  },
}

export default authApi
