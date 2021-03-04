import app from 'firebase/app'

const api = {
  searchUser(userId) {
    return app.firestore().collection('users').doc(userId)
  },
}

export default api
