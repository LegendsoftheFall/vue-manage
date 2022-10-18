import { Commit, createStore } from 'vuex'
import axios from 'axios'
import { testPostData } from '@/model/TestPostData'
import { GlobalErrorProps, GlobalDataProps, ImageProps, ArticleProps } from '@/model/model'

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
    tags: {},
    trend: [],
    user: { isLogin: false },
    articleInfo: [],
    imgUrl: {},
    article: { title: '', content: '', tags: [] },
    tagNumberList: [],
    tagNameList: []
  },
  getters: {
    getTagNameByID: (state) => (id: string) => {
      return state.trend.find(t => t.id === id)?.name
    },
    getTagIDByName: (state) => (name: string) => {
      return state.trend.find(t => t.name === name)?.id
    }
  },
  mutations: {
    // 同步操作
    setLoading (state, status) {
      state.loading = status
    },
    setAToken (state, newAToken: string) {
      state.aToken = newAToken
    },
    setError (state, e: GlobalErrorProps) {
      state.error = e
    },
    setErrorStatus (state, status) {
      state.error.status = status
    },
    setImgUrl (state, img: ImageProps) {
      state.imgUrl = img
      // console.log(state.imgUrl)
    },
    addTagNumberToList (state, id: string) {
      const index = state.tagNumberList.findIndex(item => item === id)
      if (index === -1) {
        // 若不在数组中添加进数组
        state.tagNumberList.push(id)
      }
      // console.log('num:', state.tagNumberList, 'name:', state.tagNameList)
    },
    addTagNameToList (state, name: string) {
      const index = state.tagNameList.findIndex(item => item === name)
      if (index === -1) {
        // 若不在数组中添加进数组
        state.tagNameList.push(name)
      }
    },
    removeTagNumberFromList (state, id: string) {
      const index = state.tagNumberList.findIndex(item => item === id)
      // 若存在则删除
      if (index > -1) {
        state.tagNumberList.splice(index, 1)
      }
    },
    removeTagNameFromList (state, name: string) {
      const index = state.tagNameList.findIndex(item => item === name)
      if (index > -1) {
        state.tagNameList.splice(index, 1)
      }
    },
    setArticle (state, article: ArticleProps) {
      state.article = article
    },
    setTitle (state, title: string) {
      state.article.title = title
      console.log('监听到title变化', state.article.title)
    },
    setContent (state, content: string) {
      state.article.content = content
      console.log('监听到content变化', state.article.content)
    },
    setArticleTags (state, tags: number[]) {
      state.article.tags = tags
      console.log('监听到tags变化', state.article.tags)
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
      state.aToken = ''
      state.rToken = ''
      state.user = { ...state.user, isLogin: false } // 设置用户登录为false，不触发fetchUserID
      axios.defaults.headers.common.Authorization = '' // 请求头认证置空
    },
    fetchTrendingTag (state, rawData) {
      state.trend = rawData.data
    },
    fetchAllTags (state, rawData) {
      state.trend = rawData.data
    },
    fetchUserInfo (state, rawData) {
      state.user = { isLogin: true, ...rawData.data }
    },
    fetchTagDetailByID (state, rawData) {
      state.tags = rawData.data.tag
    },
    fetchTagArticleByID (state, rawData) {
      state.articleInfo = rawData.data.list
    },
    createArticle (state, rawData) {
      console.log(rawData)
    }
  },
  actions: {
    // 异步操作
    // 发送请求 获取数据
    login (context, payload) {
      return postAndCommit('/login', 'login', context.commit, payload)
    },
    // 获取用户信息
    async fetchUserInfo (context) {
      return getAndCommit('/api/userInfo', 'fetchUserInfo', context.commit).catch(e => {
        console.log(e)
      })
    },
    // 登录并获取用户信息
    async loginAndFetch (context, loginData) {
      return context.dispatch('login', loginData).then(() => {
        return context.dispatch('fetchUserInfo')
      })
    },
    // 获取标签排行
    fetchTrendingTag (context) {
      return getAndCommit('/trendingTags', 'fetchTrendingTag', context.commit)
      // const resp = await axios.get('/explore/tags')
      // context.commit('fetchTrendingTag', resp.data)
      // axios.get('/explore/tags').then(resp => {
      //   context.commit('fetchTrendingTag', resp.data)
      // })
    },
    fetchAllTags (context) {
      return getAndCommit('/api/getAllTags', 'fetchAllTags', context.commit)
    },
    // 根据id获取标签详情
    fetchTagDetailByID (context, id) {
      return getAndCommit(`/tag/${id}`, 'fetchTagDetailByID', context.commit)
    },
    // 根据id获取标签文章
    fetchTagArticleByID (context, id) {
      return getAndCommit(`/n/${id}`, 'fetchTagArticleByID', context.commit)
    },
    // 新建文章
    createArticle (context, payload) {
      return postAndCommit('/api/createArticle', 'createArticle', context.commit, payload)
    }
  },
  modules: {
  }
})
