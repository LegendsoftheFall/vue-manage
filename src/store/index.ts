import { createStore } from 'vuex'
import { testPostData, PostProps } from '@/model/TestPostData'
import { testTrendData, TrendingProps } from '@/model/TestTrendData'

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

export interface GlobalDataProps{
  posts: PostProps[],
  trend: TrendingProps[],
  user: UserProps
}

export default createStore<GlobalDataProps>({
  state: {
    posts: testPostData,
    trend: testTrendData,
    user: { isLogin: false }
  },
  getters: {
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: '发腮的汤姆猫' }
    },
    logout (state) {
      state.user = { ...state.user, isLogin: false }
    }
  },
  actions: {
  },
  modules: {
  }
})
