import Vue from 'vue'
import Router from 'vue-router'
import Portal from '@/view/Portal'
import Manage from '@/view/Manage'
import Home from '@/components/portal/Home'
import Time from '@/components/portal/Time'
import Friend from '@/components/portal/Friend'
import About from '@/components/portal/About'


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
        },
        {
          path: '/portal/time',
          name: 'time',
          component: Time,
        },
        {
          path: '/portal/friend',
          name: 'friend',
          component: Friend,
        },
        {
          path: '/portal/about',
          name: 'about',
          component: About,
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
