import Vue from 'vue'
import Router from 'vue-router'
import Portal from '@/view/Portal'
import Manage from '@/view/Manage'
import Home from '@/components/Home'


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
      name: 'portal',
      component: Portal
    },
    {
      path: '/portal',
      name: 'portal',
      component: Portal,
      children: [
        {
          path: '/portal/home',
          name: 'home',
          component: Home,
        }
      ]
    },
    {
      path: '/manage',
      name: 'manage',
      component: Manage,
      children: []
    }
  ]
})
