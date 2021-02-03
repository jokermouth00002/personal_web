/* eslint-disable indent */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/CountMsg',
    name: 'CountMsg',
    component: () => import('../components/CountMsg.vue')

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
