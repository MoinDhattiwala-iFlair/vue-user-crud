import AppAbout from '@/components/AppAbout'
import AppContact from '@/components/AppContact'
import AppHome from '@/components/AppHome'
import AppLogin from '@/components/AppLogin'
import AppDashboard from '@/components/AppDashboard'
import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'AppHome',
      component: AppHome
    },
    {
      path: '/login',
      name: 'AppLogin',
      component: AppLogin
    },
    {
      path: '/contact',
      name: 'AppContact',
      component: AppContact
    },
    {
      path: '/about',
      name: 'AppAbout',
      component: AppAbout
    },
    {
      path: '/dashboard',
      name: 'AppDashboard',
      component: AppDashboard
    },
  ]
})
