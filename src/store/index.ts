import { Commit, createStore } from 'vuex'
import axios from 'axios'
import { testPostData, PostProps, testTagsData, TagProps } from '@/model/TestPostData'
import { TrendingProps } from '@/model/model'

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

export interface GlobalDataProps{
  loading: boolean,
  posts: PostProps[],
  tags: TagProps[],
  trend: TrendingProps[],
  user: UserProps
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}

export default createStore<GlobalDataProps>({
  state: {
    loading: false,
    posts: testPostData,
    tags: testTagsData,
    trend: [],
    user: { isLogin: false }
  },
  getters: {
  },
  mutations: {
    // 同步操作
    setLoading (state, status) {
      state.loading = status
    },
    login (state) {
      state.user = { ...state.user, isLogin: true, name: '发腮的汤姆猫' }
    },
    logout (state) {
      state.user = { ...state.user, isLogin: false }
    },
    fetchTrendingTag (state, rawData) {
      state.trend = rawData.data
    }
  },
  actions: {
    // 异步操作
    // 发送请求 获取数据
    fetchTrendingTag (context) {
      getAndCommit('/explore/tags', 'fetchTrendingTag', context.commit)
      // const resp = await axios.get('/explore/tags')
      // context.commit('fetchTrendingTag', resp.data)
      // axios.get('/explore/tags').then(resp => {
      //   context.commit('fetchTrendingTag', resp.data)
      // })
    }
  },
  modules: {
  }
})
