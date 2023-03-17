import axios from 'axios'
import router from '@/router'
import store from '@/store/index'

axios.defaults.baseURL = 'http://localhost:8081/'
// 使用拦截器添加loading效果
axios.interceptors.request.use(config => {
  // store.commit('setLoading', true)
  store.commit('setErrorStatus', false)
  return config
})

axios.interceptors.response.use(config => {
  // setTimeout(() => {
  //   store.commit('setLoading', false)
  // }, 2000)
  return config
})

axios.interceptors.response.use(resp => {
  const { code, msg } = resp.data
  // 若登录注册的响应码是错误码
  if (code === 1004 || code === 1003 || code === 1002) {
    store.commit('setError', { status: true, code: code, message: msg })
    console.log(code, msg)
  }
  // 若RefreshToken过期,重新登录
  if (code === 1006) {
    store.commit('setError', { status: true, code: code, message: msg })
    store.commit('logout')
    router.push({ name: 'Index' })
    console.log(code, msg)
  }
  // 若是成功响应
  if (code === 1000) {
    store.commit('setError', { status: false, code: code, message: msg })
  }
  return resp
}, async err => {
  if (err.response.status === 401) {
    // 认证过期,刷新token
    // 携带本地存储的aToken和rToken到刷新接口
    const payload = {
      aToken: localStorage.getItem('aToken'),
      rToken: localStorage.getItem('rToken')
    }
    const { data } = await axios.post('/refresh', payload)
    // console.log(status, data.data.newAToken, data.data.newRToken)
    // 取到新的aToken,更新aToken
    store.commit('setAToken', data.data.newAToken)
    localStorage.setItem('aToken', data.data.newAToken)
    // 将新的aToken写入请求头获取用户信息
    axios.defaults.headers.common.Authorization = `Bearer ${data.data.newAToken}`
    store.dispatch('fetchUserInfo')
  }
  if (err.response.status === 404) {
    console.log(err)
  }
  return err
})
