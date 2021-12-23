// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import Portal from '@/view/Portal'
// import Manage from '@/view/Manage'
// import Init from '@/view/Init'
// import Login from '@/view/Login'

// import Home from '@/components/portal/Home'
// import Time from '@/components/portal/Time'
// import Friend from '@/components/portal/Friend'
// import Picture from '@/components/portal/Picture'
// import About from '@/components/portal/About'
// import View from '@/components/portal/View'

// import Photo from '@/components/manage/Photo'
// import Classify from '@/components/manage/Classify'
// import Comment from '@/components/manage/Comment'
// import Compose from '@/components/manage/Compose'
// import Essay from '@/components/manage/Essay'
// import Label from '@/components/manage/Label'
// import Page from '@/components/manage/Page'
// import Statistics from '@/components/manage/Statistics'
// import Tool from '@/components/manage/Tool'
// import Webmaster from '@/components/manage/Webmaster'
// import Website from '@/components/manage/Website'
// import Link from '@/components/manage/Link'
// import Music from '@/components/manage/Music'


Vue.use(VueRouter)

const router = new VueRouter({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'portal',
      component: resolve => require(['@/view/portal'], resolve)
    },
    {
      path: '/portal',
      name: 'portal',
      component: resolve => require(['@/view/portal'], resolve),
      children: [
        {
          path: '/portal/home',
          name: 'home',
          component: resolve => require(['@/components/portal/Home'], resolve)
        },
        {
          path: '/portal/time',
          name: 'time',
          component: resolve => require(['@/components/portal/Time'], resolve)
        },
        {
          path: '/portal/friend',
          name: 'friend',
          component: resolve => require(['@/components/portal/Friend'], resolve)
        },
        {
          path: '/portal/picture',
          name: 'picture',
          component: resolve => require(['@/components/portal/Picture'], resolve)
        },
        {
          path: '/portal/about',
          name: 'about',
          component: resolve => require(['@/components/portal/About'], resolve)
        },
        {
          path: '/portal/view',
          name: 'view',
          component: resolve => require(['@/components/portal/View'], resolve)
        },
        {
          path: '/portal/shorthand',
          name: 'shorthand',
          component: resolve => require(['@/components/portal/Shorthand'], resolve)
        }
      ]
    },
    {
      path: '/init',
      name: 'init',
      component: resolve => require(['@/view/Init'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/view/Login'], resolve)
    },
    {
      path: '/manage',
      name: 'manage',
      component: resolve => require(['@/view/Manage'], resolve),
      children: [
        {
          path: '/manage/photo',
          name: 'photo',
          component: resolve => require(['@/components/manage/Photo'], resolve)
        },
        {
          path: '/manage/classify',
          name: 'classify',
          component: resolve => require(['@/components/manage/Classify'], resolve)
        },
        {
          path: '/manage/comment',
          name: 'comment',
          component: resolve => require(['@/components/manage/Comment'], resolve)
        },
        {
          path: '/manage/compose',
          name: 'compose',
          component: resolve => require(['@/components/manage/Compose'], resolve)
        },
        {
          path: '/manage/essay',
          name: 'essay',
          component: resolve => require(['@/components/manage/Essay'], resolve)
        },
        {
          path: '/manage/label',
          name: 'label',
          component: resolve => require(['@/components/manage/Label'], resolve)
        },
        {
          path: '/manage/page',
          name: 'page',
          component: resolve => require(['@/components/manage/Page'], resolve)
        },
        {
          path: '/manage/statistics',
          name: 'statistics',
          component: resolve => require(['@/components/manage/Statistics'], resolve)
        },
        {
          path: '/manage/tool',
          name: 'tool',
          component: resolve => require(['@/components/manage/Tool'], resolve)
        },
        {
          path: '/manage/webmaster',
          name: 'webmaster',
          component: resolve => require(['@/components/manage/Webmaster'], resolve)
        },
        {
          path: '/manage/website',
          name: 'website',
          component: resolve => require(['@/components/manage/Website'], resolve)
        },
        {
          path: '/manage/link',
          name: 'link',
          component: resolve => require(['@/components/manage/Link'], resolve)
        },
        {
          path: '/manage/music',
          name: 'music',
          component: resolve => require(['@/components/manage/Music'], resolve)
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)  
  next()
});

export default router;