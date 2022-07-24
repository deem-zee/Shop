import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'
import VueRouter from 'vue-router'
import Routes from './routes'
import './assets/tailwind.css'

Vue.use(VueRouter)
Vue.config.productionTip = false
const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

new Vue({
  store: store,
  router: router,
  render: h => h(App),
}).$mount('#app')
