import * as VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.use(VueFire)
const firebaseConfig = {
  apiKey: 'AIzaSyCY0dxUxnT3Wqof6va6JEmrBMIh9y6qn5s',
  authDomain: 'cash-spending-counter.firebaseapp.com',
  databaseURL: 'https://cash-spending-counter.firebaseio.com',
  projectId: 'cash-spending-counter',
  storageBucket: 'cash-spending-counter.appspot.com',
  messagingSenderId: '640918480149',
  appId: '1:640918480149:web:7b02f20317fee3d585351c',
}
firebase.initializeApp(firebaseConfig)
firebase.firestore()

Vue.config.productionTip = false
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
