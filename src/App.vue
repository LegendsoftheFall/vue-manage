<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, watch } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import { GlobalDataProps } from '@/model/model'
import createToast from '@/hooks/useCreateToast'

export default defineComponent({
  name: 'App',
  setup () {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    const aToken = computed(() => store.state.aToken)
    const error = computed(() => store.state.error)
    // 挂载时，用户未登录但是token存在，请求头加上token直接获取用户信息
    onMounted(() => {
      if (!currentUser.value.isLogin && aToken.value) {
        axios.defaults.headers.common.Authorization = `Bearer ${aToken.value}`
        store.dispatch('fetchUserInfo')
      }
    })

    // 监视error的变化 得到对应信息触发弹窗
    watch(() => error.value.status, () => {
      const { status, message } = error.value
      if (status && message) {
        createToast('error', message)
      }
    })

    watch(() => store.state.user.isLogin, () => {
      console.log(store.state.user.isLogin)
    })

    watch(() => store.state.user.id, () => {
      console.log('获取用户id', store.state.user.id)
    })
    return { error }
  }
})
</script>

<style>
  html.dark{
    color-scheme: dark;
    background: black;
  }
  body{
    background:rgba(248, 251, 255, 0.8) ;
  }
</style>
