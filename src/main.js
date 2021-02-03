import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'product' ? 'https://demo-server.christsao.me/personalweb' : 'http://localhost:39876/personalweb'
})

Vue.prototype.$api = api
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
