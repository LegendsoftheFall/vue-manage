import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: () => import(/* webpackChunkName: "Index" */ '../views/index/IndexView.vue')
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: () => import(/* webpackChunkName: "Recommend" */ '../views/recommend/RecommendView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { redirectIsLogin: true },
    component: () => import(/* webpackChunkName: "Login" */ '../views/login/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    meta: { redirectIsLogin: true },
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

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.redirectIsLogin && store.state.user.isLogin) {
    next('/home')
  } else {
    next()
  }
})

export default router
