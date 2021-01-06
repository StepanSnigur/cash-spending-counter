import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginPage from '../views/LoginPage.vue'
import UserPage from '../views/UserPage.vue'
import UserInfo from '../views/UserInfo.vue'
import RegistrationPage from '../views/RegistrationPage.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/user',
    name: 'UserPage',
    component: UserPage,
  },
  {
    path: '/user/info',
    name: 'UserInfo',
    component: UserInfo,
  },
  {
    path: '/registration',
    name: 'RegistrationPage',
    component: RegistrationPage,
  },
]

const router = new VueRouter({
  routes,
})

export default router
