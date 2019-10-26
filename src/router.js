import Vue from 'vue'
import Router from 'vue-router'
import Goods from './pages/Goods'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'goods',
      component: Goods
    },
    {
      path: '/evaluate',
      name: 'evaluate',
      component: () => import('./pages/Evaluate.vue')
    },
    {
      path: '/seller',
      name: 'seller',
      component: () => import('./pages/Seller.vue')
    },
  ]
})
