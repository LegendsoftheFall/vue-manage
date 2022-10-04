import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'VisitorHome',
    component: () => import(/* webpackChunkName: "VisitorHome" */ '../views/home/VisitorHomeView.vue')
  },
  {
    path: '/home',
    name: 'UserHome',
    component: () => import(/* webpackChunkName: "UserHome" */ '../views/home/UserHomeView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/login/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "Signup" */ '../views/signup/SignupView.vue')
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
