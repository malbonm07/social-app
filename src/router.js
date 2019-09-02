import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store.js'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: ifNotAuthenticated,
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      beforeEnter: ifNotAuthenticated,
      component: () => import(/* webpackChunkName: "about" */ './views/Signup.vue')
    },
    {
      path: '/user/:handle',
      name: 'user',
      component: () => import(/* webpackChunkName: "about" */ './views/UsersProfile.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(route => route.meta.requiresAuth)) {
    if(store.getters.isAuthenticated) {
      next();
      return
    }
    next({name: 'home'})
  } else {
    next();
  }
})

export default router;
