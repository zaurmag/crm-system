import { createRouter, createWebHistory } from 'vue-router'
import firebase from 'firebase/app'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta: {
      layout: 'empty'
    },
    component: () =>
      import('../views/Login.vue')
  },
  {
    path: '/categories',
    name: 'Categories',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () =>
      import('../views/Categories.vue')
  },
  {
    path: '/history',
    name: 'History',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () =>
      import('../views/History.vue')
  },
  {
    path: '/planning',
    name: 'Planning',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () =>
      import('../views/Planning.vue')
  },
  {
    path: '/record',
    name: 'Record',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () =>
      import('../views/Record.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      layout: 'empty'
    },
    component: () =>
      import('../views/Register.vue')
  },
  {
    path: '/detail-record',
    name: 'DetailRecord',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () =>
      import('../views/DetailRecord.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () =>
      import('../views/Profile.vue')
  },
  {
    path: '/:notFound(.*)',
    name: 'ErrorPage',
    meta: {
      layout: 'empty'
    },
    component: () => import('../views/ErrorPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (!currentUser && requireAuth) {
    next('/login?message=login')
  } else if (!requireAuth && currentUser) {
    next('/')
  } else {
    next()
  }
})

export default router
