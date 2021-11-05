import Vue from 'vue'
import Router from 'vue-router'
import Portal from '@/view/Portal'
import Manage from '@/view/Manage'

import Home from '@/components/portal/Home'
import Time from '@/components/portal/Time'
import Friend from '@/components/portal/Friend'
import About from '@/components/portal/About'

import Photo from '@/components/manage/Photo'
import Classify from '@/components/manage/Classify'
import Comment from '@/components/manage/Comment'
import Compose from '@/components/manage/Compose'
import Essay from '@/components/manage/Essay'
import Label from '@/components/manage/Label'
import Page from '@/components/manage/Page'
import Statistics from '@/components/manage/Statistics'
import Tool from '@/components/manage/Tool'
import Webmaster from '@/components/manage/Webmaster'
import Website from '@/components/manage/Website'


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
      children: [
        {
          path: '/manage/photo',
          name: 'photo',
          component: Photo,
        },
        {
          path: '/manage/classify',
          name: 'classify',
          component: Classify,
        },
        {
          path: '/manage/comment',
          name: 'comment',
          component: Comment,
        },
        {
          path: '/manage/compose',
          name: 'compose',
          component: Compose,
        },
        {
          path: '/manage/essay',
          name: 'essay',
          component: Essay,
        },
        {
          path: '/manage/label',
          name: 'label',
          component: Label,
        },
        {
          path: '/manage/page',
          name: 'page',
          component: Page,
        },
        {
          path: '/manage/statistics',
          name: 'statistics',
          component: Statistics,
        },
        {
          path: '/manage/tool',
          name: 'tool',
          component: Tool,
        },
        {
          path: '/manage/webmaster',
          name: 'webmaster',
          component: Webmaster,
        },
        {
          path: '/manage/website',
          name: 'website',
          component: Website,
        }
      ]
    }
  ]
})
