import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: () => import(/* webpackChunkName: "Index" */ '../views/index/IndexView.vue')
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: () => import(/* webpackChunkName: "Recommend" */ '../views/recommend/RecommendView.vue'),
    children: [
      {
        path: '',
        name: 'Rank',
        component: () => import(/* webpackChunkName: "Selected" */ '../components/recommend/RankArticle.vue')
      },
      // {
      //   path: 'selected',
      //   name: 'Selected',
      //   component: () => import(/* webpackChunkName: "Selected" */ '../components/recommend/SelectedArticle.vue')
      // },
      {
        path: 'new',
        name: 'New',
        component: () => import(/* webpackChunkName: "Selected" */ '../components/recommend/NewArticle.vue')
      }
    ]
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "Recommend" */ '../views/search/SearchView.vue'),
    children: [
      {
        path: '',
        name: 'HotSearch',
        component: () => import(/* webpackChunkName: "Selected" */ '../components/search/SearchHotArticle.vue')
      },
      {
        path: 'latest',
        name: 'LatestSearch',
        component: () => import(/* webpackChunkName: "Selected" */ '../components/search/SearchLatestArticle.vue')
      },
      {
        path: 'tag',
        name: 'TagSearch',
        component: () => import(/* webpackChunkName: "Selected" */ '../components/search/SearchTag.vue')
      },
      {
        path: 'user',
        name: 'UserSearch',
        component: () => import(/* webpackChunkName: "Selected" */ '../components/search/SearchUser.vue')
      }
    ]
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
  },
  {
    path: '/n/:id',
    name: 'n',
    component: () => import(/* webpackChunkName: "n" */ '../views/tag/TagView.vue'),
    children: [
      {
        path: '',
        name: 'nRank',
        component: () => import(/* webpackChunkName: "n" */ '../components/tag/TagArticle.vue')
      },
      {
        path: 'recent',
        name: 'nRecent',
        component: () => import(/* webpackChunkName: "n" */ '../components/tag/TagRecentArticle.vue')
      }
    ]
  },
  {
    path: '/create/draft',
    name: 'NewDraft',
    meta: { requireLogin: true },
    component: () => import(/* webpackChunkName: "NewDraft" */ '../views/editor/NewDraftView.vue')
  },
  {
    path: '/draft/:did',
    name: 'Draft',
    meta: { requireLogin: true },
    component: () => import(/* webpackChunkName: "Draft" */ '../views/editor/DraftView.vue')
  },
  {
    path: '/drafts',
    name: 'Drafts',
    meta: { requireLogin: true },
    component: () => import(/* webpackChunkName: "Draft" */ '../views/draft/DraftsView.vue')
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    meta: { requireLogin: true },
    component: () => import(/* webpackChunkName: "Edit" */ '../views/editor/DraftView.vue')
  },
  {
    path: '/user/:id',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/home/HomeView.vue')
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: () => import(/* webpackChunkName: "Article" */ '../views/article/ArticleView.vue')
  },
  {
    path: '/dashboard',
    name: 'DashBoard',
    meta: { requireLogin: true },
    component: () => import(/* webpackChunkName: "DashBoard" */ '../views/dashboard/DashBoard.vue'),
    children: [
      {
        path: '',
        name: 'ProfileSetting',
        meta: { requireLogin: true },
        component: () => import(/* webpackChunkName: "ProfileSetting" */ '../components/dashbord/ProfileSetting.vue')
      },
      {
        path: 'account',
        name: 'AccountSetting',
        meta: { requireLogin: true },
        component: () => import(/* webpackChunkName: "AccountSetting" */ '../components/dashbord/AccountSetting.vue')
      },
      {
        path: 'articles',
        name: 'ArticleSetting',
        meta: { requireLogin: true },
        component: () => import(/* webpackChunkName: "ArticleSetting" */ '../components/dashbord/ArticleSetting.vue')
      },
      {
        path: 'drafts',
        name: 'DraftSetting',
        meta: { requireLogin: true },
        component: () => import(/* webpackChunkName: "DraftSetting" */ '../components/dashbord/DraftSetting.vue')
      },
      {
        path: 'series',
        name: 'SerieSetting',
        meta: { requireLogin: true },
        component: () => import(/* webpackChunkName: "ProfileSetting" */ '../components/dashbord/SerieSetting.vue')
      }
    ]
  },
  {
    path: '/bookmarks',
    name: 'BookMark',
    meta: { requireLogin: true },
    component: () => import(/* webpackChunkName: "DashBoard" */ '../views/bookmark/BookMarkView.vue')
  },
  {
    path: '/@:id',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "Profile" */ '../views/profile/ProfileView.vue')
  },
  {
    path: '/explore',
    name: 'Explore',
    component: () => import(/* webpackChunkName: "Explore" */ '../views/explore/ExploreView.vue'),
    children: [
      {
        path: 'tags',
        name: 'Tags',
        component: () => import(/* webpackChunkName: "Tags" */ '../components/explore/AllTags.vue')
      },
      {
        path: 'tags-following',
        name: 'FollowingTags',
        component: () => import(/* webpackChunkName: "FollowingTags" */ '../components/explore/FollowingTags.vue')
      },
      {
        path: 'blogers-following',
        name: 'FollowingBlogers',
        component: () => import(/* webpackChunkName: "FollowingBlogers" */ '../components/explore/FollowingBlogers.vue')
      }
    ]
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
  // console.log(store.state.aToken)
  // console.log(localStorage.getItem('aToken'))
  if (to.meta.redirectIsLogin && localStorage.getItem('aToken')) {
    next('/recommend')
  } else if (to.meta.requireLogin && !localStorage.getItem('aToken')) {
    next('/login')
  } else {
    next()
  }
})

export default router
