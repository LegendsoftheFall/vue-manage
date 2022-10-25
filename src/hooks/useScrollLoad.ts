import { computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/model/model'

const useScrollLoad = (actionName: string, id?: string) => {
  const store = useStore<GlobalDataProps>()
  const loadMode = computed(() => store.state.scrollPage.isReadyLoad)
  const requestMode = computed(() => store.state.scrollPage.isRequest)
  const currentPage = computed(() => store.state.scrollPage.page)
  const total = computed(() => store.state.scrollPage.total)
  const size = computed(() => store.state.scrollPage.size)

  const loadMore = () => {
    // 当允许加载与允许发送同时成立时,发送请求
    if (loadMode.value && requestMode.value) {
      // 限制触发次数 进入时禁止加载
      store.commit('setLoadMode', false)
      store.dispatch(actionName, id).then(() => {
        // 得到响应时允许加载
        store.commit('setLoadMode', true)
      })
    }
  }
  // 判断是否到最后一页，若到最后一页，禁止发送请求
  const isLastPage = () => {
    if (Math.ceil(total.value / size.value) < currentPage.value) {
      store.commit('setRequestMode', false)
      store.commit('setLoadMode', false)
    }
  }

  const onScroll = () => {
    // 内容总高度
    const scrollHeight = document.getElementById('scroll')?.scrollHeight
    // 可视区高度
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
    // 滚动距离
    const scrollTop = document.documentElement.scrollTop
    // 到底部的距离
    if (scrollHeight) {
      const distance = scrollHeight - scrollTop - clientHeight
      if (distance <= 20) {
        console.log('快到底部了')
        isLastPage()
        loadMore()
      }
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll)
  })
  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })
}

export default useScrollLoad
