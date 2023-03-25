import { createStore } from 'vuex'
import axios from 'axios'
import { testPostData } from '@/model/TestPostData'
import { GlobalErrorProps, GlobalDataProps, ImageProps, ContentProps, SaveStatus } from '@/model/model'
import asyncAndCommit from '@/hooks/axios'

export default createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    aToken: localStorage.getItem('aToken') || '',
    rToken: localStorage.getItem('rToken') || '',
    loading: false,
    saving: 'ready',
    editMode: false,
    createDraftMode: false,
    saveDraftMode: false,
    notFound: false,
    key: '',
    total: 0,
    bookmarkTotal: 0,
    posts: testPostData,
    tags: { isFollow: false, articleNum: 0, followerNum: 0 },
    trend: [],
    tagInfo: [],
    FollowTagInfo: [],
    user: { isLogin: false, id: '' },
    userInfo: { isFollow: false, follower: 0, following: 0 },
    userInfos: [],
    rankUserInfos: [],
    userProfile: { username: '', avatar: '', location: '', company: '', position: '', introduction: '', homePage: '', github: '' },
    profile: { userID: '', username: '', avatar: '', email: '', location: '', company: '', position: '', introduction: '', homePage: '', github: '', format: '', follower: 0, following: 0, isFollow: false },
    articleInfo: [],
    collectedBar: [],
    draftInfo: [],
    draftBar: [],
    homeArticleInfo: [],
    userArticleInfo: [],
    scrollPage: { isReadyLoad: true, isRequest: true },
    articleDetail: { article: { likes: 0, comments: 0, viewCount: 0, id: '', authorID: '', title: '', content: '', markdown: '', createTime: '', format: '' }, isLiked: false, isCollected: false },
    draftDetail: { id: '', authorID: '', title: '', content: '', markdown: '', createTime: '', format: '' },
    imgUrl: {},
    article: { title: '', content: '', tags: [] },
    tagNumberList: [],
    tagNameList: [],
    commentList: []
  },
  getters: {
    getTagNameByID: (state) => (id: string) => {
      return state.tagInfo.find(t => t.id === id)?.name
    },
    getTagIDByName: (state) => (name: string) => {
      return state.tagInfo.find(t => t.name === name)?.id
    }
  },
  mutations: {
    // 同步操作
    setLoading (state, status) {
      state.loading = status
    },
    setEditMode (state, status: boolean) {
      state.editMode = status
      console.log('编辑文章模式', state.editMode)
    },
    setCreateMode (state, status: boolean) {
      state.createDraftMode = status
      console.log('创建草稿模式', state.createDraftMode)
    },
    setSaveMode (state, status: boolean) {
      state.saveDraftMode = status
      console.log('保存草稿模式', state.saveDraftMode)
    },
    setSaveStatus (state, status: SaveStatus) {
      state.saving = status
    },
    setLoadMode (state, status: boolean) {
      state.scrollPage.isReadyLoad = status
    },
    setRequestMode (state, status: boolean) {
      state.scrollPage.isRequest = status
    },
    setNotFound (state, status: boolean) {
      state.notFound = status
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
    setProfileAvatar (state, url: string) {
      state.userProfile.avatar = url
      console.log('监听到img变化', state.userProfile.avatar)
    },
    setKey (state, keyword: string) {
      state.key = keyword
      console.log('监听到key变化', state.key)
    },
    setLikeMode (state) {
      if (state.articleDetail.isLiked) {
        state.articleDetail.article.likes--
      } else {
        state.articleDetail.article.likes++
      }
      state.articleDetail.isLiked = !state.articleDetail.isLiked
    },
    setCollectMode (state) {
      state.articleDetail.isCollected = !state.articleDetail.isCollected
    },
    changeCollectMode (state, aid: string) {
      // 根据aid遍历数组,将收藏取反
      state.articleInfo = state.articleInfo.map(article => {
        if (article.articleInfo.id === aid) {
          article.articleInfo.isCollected = !article.articleInfo.isCollected
        }
        return article
      })
    },
    setTagFollowMode (state) {
      if (state.tags.isFollow) {
        state.tags.followerNum--
      } else {
        state.tags.followerNum++
      }
      state.tags.isFollow = !state.tags.isFollow
    },
    changeTagFollow (state, tid: string) {
      // 根据tid遍历数组,将关注取反
      state.tagInfo = state.tagInfo.map(tag => {
        if (tag.id === tid) {
          tag.isFollow = !tag.isFollow
        }
        return tag
      })
    },
    changeFollowingTag (state, tid: string) {
      // 根据tid遍历数组,将关注取反
      state.FollowTagInfo = state.FollowTagInfo.map(tag => {
        if (tag.id === tid) {
          tag.isFollow = !tag.isFollow
        }
        return tag
      })
    },
    setUserFollowMode (state) {
      if (state.userInfo.isFollow) {
        state.userInfo.follower--
      } else {
        state.userInfo.follower++
      }
      state.userInfo.isFollow = !state.userInfo.isFollow
    },
    setProfileFollow (state) {
      state.profile.isFollow = !state.profile.isFollow
    },
    changeUsersFollow (state, fid: string) {
      state.userInfos = state.userInfos.map(userInfo => {
        if (userInfo.userID === fid) {
          userInfo.isFollow = !userInfo.isFollow
        }
        return userInfo
      })
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
    // setTitle (state, title: string) {
    //   state.article.title = title
    //   console.log('监听到title变化', state.article.title)
    // },
    setSubTitle (state, subtitle: string) {
      state.article.subtitle = subtitle
      console.log('监听到subtitle变化', state.article.subtitle)
    },
    // setContent (state, content: string) {
    //   state.article.content = content
    //   console.log('监听到content变化', state.article.content)
    // },
    setArticle (state, article: ContentProps) {
      state.article.title = article.title
      state.article.subtitle = article.subtitle
      state.article.content = article.content
      console.log('监听到article变化', state.article.title, state.article.subtitle, state.article.content)
    },
    setArticleTags (state, tags: number[]) {
      state.article.tags = tags
      console.log('监听到tags变化', state.article.tags)
    },
    setDropDownComment (state, id: string) {
      state.commentList = state.commentList.map(comment => {
        if (comment.comment_info.comment_id === id) {
          comment.comment_info.is_click = !comment.comment_info.is_click
        } else {
          comment.comment_info.is_click = false
        }
        // 全部置为false
        comment.reply_infos.forEach(reply => {
          if (reply.reply_id === id) {
            reply.reply_info.is_click = !reply.reply_info.is_click
          } else {
            reply.reply_info.is_click = false
          }
        })
        return comment
      })
    },
    login (state, rawData) {
      if (rawData.data) {
        const { aToken, rToken, userID } = rawData.data
        state.aToken = aToken // 取到aToken
        state.rToken = rToken
        localStorage.setItem('aToken', aToken)
        localStorage.setItem('rToken', rToken)
        localStorage.setItem('userID', userID)
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
    fetchSelectTags (state, rawData) {
      state.tagInfo = rawData.data
    },
    fetchUserInfo (state, rawData) {
      state.user = { isLogin: true, ...rawData.data }
      localStorage.setItem('userID', rawData.data.id)
    },
    fetchTagDetailByID (state, rawData) {
      state.tags = rawData.data.tag
    },
    fetchTagArticleByID (state, rawData) {
      if (rawData.data) {
        state.articleInfo = state.articleInfo.concat(rawData.data.list)
        console.log(state.articleInfo)
        state.total = rawData.data.total
        console.log(
          '加载状态', state.scrollPage.isReadyLoad,
          '发送状态', state.scrollPage.isRequest)
      }
    },
    fetchTagArticleByIDOnce (state, rawData) {
      if (rawData.data) {
        state.articleInfo = rawData.data.list
        console.log(state.articleInfo)
        state.total = rawData.data.total
        console.log(
          '加载状态', state.scrollPage.isReadyLoad,
          '发送状态', state.scrollPage.isRequest)
      }
    },
    fetchArticleList (state, rawData) {
      if (rawData.data) {
        state.articleInfo = state.articleInfo.concat(rawData.data.list)
        console.log(state.articleInfo)
        state.total = rawData.data.total
        console.log(
          '加载状态', state.scrollPage.isReadyLoad,
          '发送状态', state.scrollPage.isRequest)
      }
    },
    fetchArticleListOnce (state, rawData) {
      if (rawData.data) {
        state.articleInfo = rawData.data.list
        console.log(state.articleInfo)
        state.total = rawData.data.total
        console.log(
          '加载状态', state.scrollPage.isReadyLoad,
          '发送状态', state.scrollPage.isRequest)
      }
    },
    createArticle (state, rawData) {
      console.log(rawData)
    },
    fetchArticleDetailByID (state, rawData) {
      state.articleDetail = rawData.data
      state.userInfo = rawData.data.userInfo
      console.log(state.articleDetail.tags, state.articleDetail)
    },
    fetchUserHomeByID (state, rawData) {
      state.userInfo = rawData.data.userInfo
      state.homeArticleInfo = state.homeArticleInfo.concat(rawData.data.articleInfo)
      state.total = rawData.data.total
      console.log('article', state.homeArticleInfo, 'user', state.userInfo, 'total', state.total)
    },
    fetchAllUserArticle (state, rawData) {
      if (rawData.data) {
        state.userArticleInfo = rawData.data.articleInfo
        state.total = rawData.data.total
      }
    },
    editArticle (state, rawData) {
      console.log(rawData.data)
    },
    deleteArticle (state, rawData) {
      console.log(rawData.data)
    },
    likeArticle (state, rawData) {
      console.log(rawData.data)
    },
    collectArticle (state, rawData) {
      console.log(rawData.data)
    },
    fetchCollectedArticle (state, rawData) {
      if (rawData.data) {
        state.articleInfo = state.articleInfo.concat(rawData.data.list)
        state.total = rawData.data.total
      }
    },
    fetchCollectedBar (state, rawData) {
      if (rawData.data) {
        state.collectedBar = rawData.data.list
        state.bookmarkTotal = rawData.data.total
      }
    },
    fetchHotTags (state, rawData) {
      state.tagInfo = rawData.data.list
      state.total = rawData.data.total
    },
    fetchAllTags (state, rawData) {
      state.tagInfo = state.tagInfo.concat(rawData.data.list)
      state.total = rawData.data.total
    },
    fetchTagsOnce (state, rawData) {
      state.tagInfo = rawData.data.list
      state.total = rawData.data.total
    },
    fetchFollowTags (state, rawData) {
      state.FollowTagInfo = state.tagInfo.concat(rawData.data.list)
      state.total = rawData.data.total
    },
    fetchFollowTagsOnce (state, rawData) {
      if (rawData.data) {
        state.FollowTagInfo = rawData.data.list
        state.total = rawData.data.total
      }
    },
    followTag (state, rawData) {
      console.log(rawData.data)
    },
    followTagCancel (state, rawData) {
      console.log(rawData.data)
    },
    fetchFollowUsers (state, rawData) {
      if (rawData.data) {
        state.userInfos = state.userInfos.concat(rawData.data.list)
        state.total = rawData.data.total
      }
    },
    fetchFollowUsersOnce (state, rawData) {
      if (rawData.data) {
        state.userInfos = rawData.data.list
        state.total = rawData.data.total
      }
    },
    followUser (state, rawData) {
      console.log(rawData.data)
    },
    followUserCancel (state, rawData) {
      console.log(rawData.data)
    },
    createDraft (state, rawData) {
      console.log(rawData.data)
    },
    fetchDraftDetail (state, rawData) {
      state.draftDetail = rawData.data.draft
      console.log(rawData.data)
    },
    saveDraft (state, rawData) {
      console.log(rawData.data)
    },
    fetchDraftInfo (state, rawData) {
      state.draftInfo = rawData.data.list
      console.log(state.draftInfo)
    },
    fetchDraftBar (state, rawData) {
      if (rawData.data) {
        state.draftBar = rawData.data.list
      }
    },
    deleteDraft (state, rawData) {
      console.log(rawData.data)
    },
    fetchUserProfile (state, rawData) {
      state.userProfile = rawData.data.profile
      console.log(state.userProfile)
    },
    updateUserProfile (state, rawData) {
      console.log(rawData.data)
    },
    fetchProfile (state, rawData) {
      state.profile = rawData.data.profile
    },
    publishComment (state, rawData) {
      console.log(rawData.data.id)
    },
    fetchCommentList (state, rawData) {
      if (rawData.data) {
        state.commentList = rawData.data.list
        state.total = rawData.data.total
        console.log(state.commentList)
      }
    },
    searchArticleList (state, rawData) {
      if (rawData.data) {
        state.articleInfo = state.articleInfo.concat(rawData.data.list)
        console.log(state.articleInfo)
        state.total = rawData.data.total
        console.log(
          '加载状态', state.scrollPage.isReadyLoad,
          '发送状态', state.scrollPage.isRequest)
      }
    },
    searchArticleListOnce (state, rawData) {
      if (rawData.data) {
        state.articleInfo = rawData.data.list
        console.log(state.articleInfo)
        state.total = rawData.data.total
        console.log(
          '加载状态', state.scrollPage.isReadyLoad,
          '发送状态', state.scrollPage.isRequest)
        console.log('文章列表', state.articleInfo)
      }
    },
    searchTagList (state, rawData) {
      state.tagInfo = state.tagInfo.concat(rawData.data.list)
      state.total = rawData.data.total
    },
    searchTagListOnce (state, rawData) {
      if (rawData.data) {
        state.tagInfo = rawData.data.list
        console.log(state.tagInfo)
        state.total = rawData.data.total
      }
    },
    searchUser (state, rawData) {
      if (rawData.data) {
        state.userInfos = state.userInfos.concat(rawData.data.list)
        state.total = rawData.data.total
      }
    },
    searchUserOnce (state, rawData) {
      if (rawData.data) {
        state.userInfos = rawData.data.list
        state.total = rawData.data.total
        if (!state.userInfos) {
          state.userInfos = []
        }
        console.log('searchUser', state.userInfos)
      }
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
    // 获取标签选项
    fetchSelectTags (context) {
      return asyncAndCommit('/api/selectTags', 'fetchSelectTags', context.commit)
    },
    // 根据id获取标签详情
    fetchTagDetailByID (context, id) {
      const uid = localStorage.getItem('userID') || 0
      return asyncAndCommit(`/tag?tid=${id}&uid=${uid}`, 'fetchTagDetailByID', context.commit)
    },
    // 根据id获取标签文章按排名或发布时间
    fetchTagArticleByID (context, param = {}) {
      const { page = 2, size = 10, id = 0, order = 'score' } = param
      const uid = localStorage.getItem('userID') || 0
      console.log(uid)
      return asyncAndCommit(`/n/${id}?page=${page}&size=${size}&uid=${uid}&order=${order}`, 'fetchTagArticleByID', context.commit)
    },
    fetchTagArticleByIDOnce (context, param = {}) {
      const { page = 1, size = 10, id = 0, order = 'score' } = param
      const uid = localStorage.getItem('userID') || 0
      console.log(uid)
      return asyncAndCommit(`/n/${id}?page=${page}&size=${size}&uid=${uid}&order=${order}`, 'fetchTagArticleByIDOnce', context.commit)
    },
    // 获取文章按排名或发布时间
    fetchArticleList (context, param = {}) {
      const { page = 2, size = 10, order = 'score' } = param
      const uid = localStorage.getItem('userID') || 0
      console.log(uid)
      return asyncAndCommit(`/recommend/list?page=${page}&size=${size}&uid=${uid}&order=${order}`, 'fetchArticleList', context.commit)
    },
    fetchArticleListOnce (context, param = {}) {
      const { page = 1, size = 10, order = 'score' } = param
      const uid = localStorage.getItem('userID') || 0
      console.log(uid)
      return asyncAndCommit(`/recommend/list?page=${page}&size=${size}&uid=${uid}&order=${order}`, 'fetchArticleListOnce', context.commit)
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
      const uid = localStorage.getItem('userID') || 0
      console.log(uid)
      return asyncAndCommit(`/article/${id}?uid=${uid}`, 'fetchArticleDetailByID', context.commit)
    },
    // 根据ID获取用户主页
    fetchUserHomeByID (context, param = {}) {
      // const uid = localStorage.getItem('userID') || 0
      const { page = 1, size = 10, id = '' } = param
      return asyncAndCommit(`/user/${id}?page=${page}&size=${size}&uid=${id}`, 'fetchUserHomeByID', context.commit)
    },
    fetchAllUserArticle (context, param = {}) {
      const uid = localStorage.getItem('userID') || 0
      return asyncAndCommit(`/user/articles?uid=${uid}`, 'fetchAllUserArticle', context.commit)
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
    },
    // 点赞文章
    likeArticle (context, aid) {
      const uid = localStorage.getItem('userID') || 0
      return asyncAndCommit(`/api/like?aid=${aid}&uid=${uid}`, 'likeArticle', context.commit, {
        method: 'post'
      })
    },
    // 收藏文章
    collectArticle (context, aid) {
      const uid = localStorage.getItem('userID') || 0
      return asyncAndCommit(`/api/collect?aid=${aid}&uid=${uid}`, 'collectArticle', context.commit, {
        method: 'post'
      })
    },
    // 获取收藏文章
    fetchCollectedArticle (context, param = {}) {
      const { page = 1, size = 10 } = param
      return asyncAndCommit(`/api/bookmark?page=${page}&size=${size}`, 'fetchCollectedArticle', context.commit)
    },
    fetchCollectedBar (context) {
      return asyncAndCommit('/api/bookmark?page=1&size=1', 'fetchCollectedBar', context.commit)
    },
    // 获取所有标签, 分为第一次获取和滑动分页获取
    fetchHotTags (context) {
      const uid = localStorage.getItem('userID') || 0
      return asyncAndCommit(`/explore/hotTags?uid=${uid}`, 'fetchHotTags', context.commit)
    },
    // 获取所有标签, 分为第一次获取和滑动分页获取
    fetchAllTags (context, param = {}) {
      const { page = 1, size = 10 } = param
      const uid = localStorage.getItem('userID') || 0
      console.log(uid, page, size)
      return asyncAndCommit(`/explore/tags?page=${page}&size=${size}&uid=${uid}`, 'fetchAllTags', context.commit)
    },
    fetchTagsOnce (context, param = {}) {
      const { page = 1, size = 10 } = param
      const uid = localStorage.getItem('userID') || 0
      console.log(uid, page, size)
      return asyncAndCommit(`/explore/tags?page=${page}&size=${size}&uid=${uid}`, 'fetchTagsOnce', context.commit)
    },
    // 获取已关注标签, 分为第一次获取和滑动分页获取
    fetchFollowTags (context, param = {}) {
      const { page = 2, size = 10 } = param
      const uid = localStorage.getItem('userID') || 0
      console.log(uid, page, size)
      return asyncAndCommit(`/explore/followTags?page=${page}&size=${size}&uid=${uid}`, 'fetchFollowTags', context.commit)
    },
    fetchFollowTagsOnce (context, param = {}) {
      const { page = 1, size = 10 } = param
      const uid = localStorage.getItem('userID') || 0
      console.log(uid, page, size)
      return asyncAndCommit(`/explore/followingTags?page=${page}&size=${size}&uid=${uid}`, 'fetchFollowTagsOnce', context.commit)
    },
    // 关注标签
    followTag (context, tid) {
      const uid = localStorage.getItem('userID') || 0
      return asyncAndCommit(`/api/tag/follow/do?tid=${tid}&uid=${uid}`, 'followTag', context.commit, {
        method: 'post'
      })
    },
    // 取消关注标签
    followTagCancel (context, tid) {
      const uid = localStorage.getItem('userID') || 0
      return asyncAndCommit(`/api/tag/follow/undo?tid=${tid}&uid=${uid}`, 'followTagCancel', context.commit, {
        method: 'post'
      })
    },
    // 获取已关注用户, 分为第一次获取和滑动分页获取
    fetchFollowUsers (context, param = {}) {
      const { page = 2, size = 10 } = param
      const uid = localStorage.getItem('userID') || 0
      console.log(uid, page, size)
      return asyncAndCommit(`/explore/followUsers?page=${page}&size=${size}&uid=${uid}`, 'fetchFollowUsers', context.commit)
    },
    fetchFollowUsersOnce (context, param = {}) {
      const { page = 1, size = 10 } = param
      const uid = localStorage.getItem('userID') || 0
      console.log(uid, page, size)
      return asyncAndCommit(`/explore/followingUsers?page=${page}&size=${size}&uid=${uid}`, 'fetchFollowUsersOnce', context.commit)
    },
    // 关注用户
    followUser (context, fid) {
      const uid = localStorage.getItem('userID') || 0
      return asyncAndCommit(`/api/user/follow/do?fid=${fid}&uid=${uid}`, 'followUser', context.commit, {
        method: 'post'
      })
    },
    // 取消关注用户
    followUserCancel (context, fid) {
      const uid = localStorage.getItem('userID') || 0
      return asyncAndCommit(`/api/user/follow/undo?fid=${fid}&uid=${uid}`, 'followUserCancel', context.commit, {
        method: 'post'
      })
    },
    // 创建草稿
    createDraft (context, payload) {
      return asyncAndCommit('/api/createDraft', 'createDraft', context.commit, {
        method: 'post',
        data: payload
      })
    },
    // 获取草稿详情
    fetchDraftDetail (context, id) {
      return asyncAndCommit(`/api/draft/${id}`, 'fetchDraftDetail', context.commit)
    },
    // 保存草稿
    saveDraft (context, payload) {
      return asyncAndCommit('/api/saveDraft', 'saveDraft', context.commit, {
        method: 'post',
        data: payload
      })
    },
    // 获取草稿列表
    fetchDraftInfo (context) {
      return asyncAndCommit('/api/drafts', 'fetchDraftInfo', context.commit)
    },
    fetchDraftBar (context) {
      return asyncAndCommit('/api/drafts', 'fetchDraftBar', context.commit)
    },
    // 删除草稿
    deleteDraft (context, id) {
      return asyncAndCommit(`/api/deleteDraft?id=${id}`, 'deleteDraft', context.commit, {
        method: 'post'
      })
    },
    // 获取后台用户资料
    fetchUserProfile (context) {
      return asyncAndCommit('/api/user/profile', 'fetchUserProfile', context.commit)
    },
    // 更新用户资料
    updateUserProfile (context, payload) {
      return asyncAndCommit('/api/user/profile/update', 'updateUserProfile', context.commit, {
        method: 'patch',
        data: payload
      })
    },
    fetchProfile (context, id) {
      const cid = localStorage.getItem('userID') || 0
      return asyncAndCommit(`/user/profile?uid=${id}&cid=${cid}`, 'fetchProfile', context.commit)
    },
    publishComment (context, payload) {
      return asyncAndCommit('/api/comment/create', 'publishComment', context.commit, {
        method: 'post',
        data: payload
      })
    },
    fetchCommentList (context, param = {}) {
      const { page = 1, size = 10, item, order, end = '' } = param
      const uid = localStorage.getItem('userID') || 0
      console.log(uid, page, size, item, order, end)
      return asyncAndCommit(`/comment/list?uid=${uid}&page=${page}&size=${size}&item=${item}&order=${order}&end=${end}`, 'fetchCommentList', context.commit)
    },
    // 获取搜索文章按热度或发布时间
    searchArticleList (context, param = {}) {
      const { page = 2, size = 10, category = 'top', key } = param
      const uid = localStorage.getItem('userID') || 0
      console.log(uid)
      return asyncAndCommit(`/search/article?page=${page}&size=${size}&uid=${uid}&category=${category}&key=${key}`, 'searchArticleList', context.commit)
    },
    searchArticleListOnce (context, param = {}) {
      const { page = 1, size = 10, category = 'top', key } = param
      const uid = localStorage.getItem('userID') || 0
      console.log(uid)
      return asyncAndCommit(`/search/article?page=${page}&size=${size}&uid=${uid}&category=${category}&key=${key}`, 'searchArticleListOnce', context.commit)
    },
    // 获取搜索标签
    searchTagList (context, param = {}) {
      const { page = 2, size = 10, category = 'tag', key } = param
      const uid = localStorage.getItem('userID') || 0
      console.log(uid)
      return asyncAndCommit(`/search/tag?page=${page}&size=${size}&uid=${uid}&category=${category}&key=${key}`, 'searchTagList', context.commit)
    },
    searchTagListOnce (context, param = {}) {
      const { page = 1, size = 10, category = 'tag', key } = param
      const uid = localStorage.getItem('userID') || 0
      console.log(uid)
      return asyncAndCommit(`/search/tag?page=${page}&size=${size}&uid=${uid}&category=${category}&key=${key}`, 'searchTagListOnce', context.commit)
    },
    // 搜索用户
    searchUser (context, param = {}) {
      const { page = 2, size = 10, category = 'user', key } = param
      const uid = localStorage.getItem('userID') || 0
      console.log(uid, page, size)
      return asyncAndCommit(`/search/user?page=${page}&size=${size}&uid=${uid}&category=${category}&key=${key}`, 'searchUser', context.commit)
    },
    searchUserOnce (context, param = {}) {
      const { page = 1, size = 10, category = 'user', key } = param
      const uid = localStorage.getItem('userID') || 0
      console.log(uid, page, size)
      return asyncAndCommit(`/search/user?page=${page}&size=${size}&uid=${uid}&category=${category}&key=${key}`, 'searchUserOnce', context.commit)
    }
  },
  modules: {
  }
})
