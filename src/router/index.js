import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'
import Manage from '@/view/Manage'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: []
    },
    {
      path: '/manage',
      name: 'manage',
      component: Manage,
      children: []
    }
  ]
})
