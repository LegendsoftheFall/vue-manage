import { Commit, createStore } from 'vuex'
import axios from 'axios'
import { testPostData, PostProps, testTagsData, TagProps } from '@/model/TestPostData'
import { TrendingProps, UserProps, GlobalErrorProps } from '@/model/model'

export interface GlobalDataProps{
  error: GlobalErrorProps
  aToken: string,
  rToken: string,
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data
}

export default createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    aToken: localStorage.getItem('aToken') || '',
    rToken: localStorage.getItem('rToken') || '',
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
    setError (state, e: GlobalErrorProps) {
      state.error = e
    },
    setErrorStatus (state, status) {
      state.error.status = status
    },
    login (state, rawData) {
      if (rawData.data) {
        const { aToken, rToken } = rawData.data
        state.aToken = aToken // 取到aToken
        state.rToken = rToken
        localStorage.setItem('aToken', aToken)
        localStorage.setItem('rToken', rToken)
        axios.defaults.headers.common.Authorization = `Bearer ${aToken}`
      }
    },
    logout (state) {
      localStorage.clear() // 清空本地存储
      state.user = { ...state.user, isLogin: false } // 设置用户登录为false，不触发fetchUserID
      axios.defaults.headers.common.Authorization = '' // 请求头认证置空
    },
    fetchTrendingTag (state, rawData) {
      state.trend = rawData.data
    },
    fetchUserID (state, rawData) {
      state.user = { isLogin: true, ...rawData.data }
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
    },
    login (context, payload) {
      return postAndCommit('/login', 'login', context.commit, payload)
    },
    fetchUserID (context) {
      getAndCommit('/api/userInfo', 'fetchUserID', context.commit).catch(e => {
        console.log(e)
      })
    },
    async loginAndFetch (context, loginData) {
      return context.dispatch('login', loginData).then(() => {
        return context.dispatch('fetchUserID')
      })
    }
  },
  modules: {
  }
})
