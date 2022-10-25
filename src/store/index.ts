import { Commit, createStore } from 'vuex'
import axios, { AxiosRequestConfig } from 'axios'
import { testPostData } from '@/model/TestPostData'
import { GlobalErrorProps, GlobalDataProps, ImageProps } from '@/model/model'

// const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
//   const { data } = await axios.get(url)
//   commit(mutationName, data)
// }

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
//   const { data } = await axios.post(url, payload)
//   commit(mutationName, data)
//   return data
// }

const asyncAndCommit = async (url: string, mutationName: string, commit: Commit,
  config: AxiosRequestConfig = { method: 'get' }) => {
  const { data } = await axios(url, config)
  commit(mutationName, data)
  return data
}

export default createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    aToken: localStorage.getItem('aToken') || '',
    rToken: localStorage.getItem('rToken') || '',
    loading: false,
    editMode: false,
    total: 0,
    posts: testPostData,
    tags: {},
    trend: [],
    user: { isLogin: false },
    userInfo: {},
    articleInfo: [],
    homeArticleInfo: [],
    homePage: { total: 0, page: 1, size: 10 },
    scrollPage: { isReadyLoad: true, isRequest: true, total: 0, page: 1, size: 10 },
    articleDetail: {},
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
    setEditMode (state, status: boolean) {
      state.editMode = status
      console.log(state.editMode)
    },
    addHomePage (state) {
      state.homePage.page++
      console.log('下一页', state.homePage.page)
    },
    addScrollPage (state) {
      state.scrollPage.page++
      console.log('下一页', state.scrollPage.page)
    },
    setLoadMode (state, status: boolean) {
      state.scrollPage.isReadyLoad = status
    },
    setRequestMode (state, status: boolean) {
      state.scrollPage.isRequest = status
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
      console.log('监听到img变化', state.imgUrl)
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
    setTitle (state, title: string) {
      state.article.title = title
      console.log('监听到title变化', state.article.title)
    },
    setSubTitle (state, subtitle: string) {
      state.article.subtitle = subtitle
      console.log('监听到subtitle变化', state.article.subtitle)
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
      state.articleInfo = state.articleInfo.concat(rawData.data.list)
      state.scrollPage.total = rawData.data.total
      console.log('当前页:', state.scrollPage.page,
        '总页数:', Math.ceil(state.scrollPage.total / state.scrollPage.size),
        '加载状态', state.scrollPage.isReadyLoad,
        '发送状态', state.scrollPage.isRequest)
      state.scrollPage.page++
    },
    createArticle (state, rawData) {
      console.log(rawData)
    },
    fetchArticleDetailByID (state, rawData) {
      state.articleDetail = rawData.data
      state.userInfo = rawData.data.userInfo
      console.log(state.articleDetail.tags)
    },
    fetchUserHomeByID (state, rawData) {
      // state.homeArticleInfo = { ...state.homeArticleInfo, ...rawData.data.articleInfo }
      state.homeArticleInfo = state.homeArticleInfo.concat(rawData.data.articleInfo)
      state.userInfo = rawData.data.userInfo
      state.total = rawData.data.total
      console.log('article', state.homeArticleInfo, 'user', state.userInfo, 'total', state.total)
    },
    editArticle (state, rawData) {
      console.log(rawData.data)
    },
    deleteArticle (state, rawData) {
      console.log(rawData.data)
    }
  },
  actions: {
    // 异步操作
    // 发送请求 获取数据
    login (context, payload) {
      return asyncAndCommit('/login', 'login', context.commit, {
        method: 'post',
        data: payload
      })
    },
    // 获取用户信息
    async fetchUserInfo (context) {
      return asyncAndCommit('/api/userInfo', 'fetchUserInfo', context.commit).catch(e => {
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
      return asyncAndCommit('/trendingTags', 'fetchTrendingTag', context.commit)
    },
    fetchAllTags (context) {
      return asyncAndCommit('/api/getAllTags', 'fetchAllTags', context.commit)
    },
    // 根据id获取标签详情
    fetchTagDetailByID (context, id) {
      return asyncAndCommit(`/tag/${id}`, 'fetchTagDetailByID', context.commit)
    },
    // 根据id获取标签文章
    fetchTagArticleByID (context, id) {
      const { page, size } = context.state.scrollPage
      return asyncAndCommit(`/n/${id}?page=${page}&size=${size}`, 'fetchTagArticleByID', context.commit)
    },
    // 新建文章
    createArticle (context, payload) {
      return asyncAndCommit('/api/createArticle', 'createArticle', context.commit, {
        method: 'post',
        data: payload
      })
    },
    // 获取文章详情
    fetchArticleDetailByID (context, id) {
      return asyncAndCommit(`/article/${id}`, 'fetchArticleDetailByID', context.commit)
    },
    // 根据ID获取用户主页
    fetchUserHomeByID (context, id) {
      const { page, size } = context.state.homePage
      console.log(page)
      return asyncAndCommit(`/user/${id}?page=${page}&size=${size}`, 'fetchUserHomeByID', context.commit)
    },
    // 编辑文章
    editArticle (context, payload) {
      return asyncAndCommit('/api/editArticle', 'editArticle', context.commit, {
        method: 'patch',
        data: payload
      })
    },
    // 删除文章
    deleteArticle (context, id) {
      return asyncAndCommit(`/api/deleteArticle/${id}`, 'deleteArticle', context.commit, {
        method: 'delete'
      })
    }
  },
  modules: {
  }
})
