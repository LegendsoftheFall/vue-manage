import { computed, onMounted, onUnmounted, ComputedRef, ref } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps, LoadParams } from '@/model/model'

const useScrollLoad = (actionName: string, total: ComputedRef<number>,
  param:LoadParams = { page: 2, size: 10 }) => {
  const store = useStore<GlobalDataProps>()
  const loadMode = computed(() => store.state.scrollPage.isReadyLoad)
  const requestMode = computed(() => store.state.scrollPage.isRequest)
  const currentPage = ref(param.page)
  const requestParam = computed(() => ({
    page: currentPage.value,
    size: param.size,
    id: param.id,
    order: param.order,
    category: param.category,
    key: param.key
  }))

  const loadMore = () => {
    // 当允许加载与允许发送同时成立时,发送请求
    if (loadMode.value && requestMode.value) {
      // 限制触发次数 进入时禁止加载
      store.commit('setLoadMode', false)
      store.dispatch(actionName, requestParam.value).then(() => {
        // 得到响应时允许加载
        currentPage.value++
        console.log(currentPage.value)
        store.commit('setLoadMode', true)
      })
    }
  }
  // 判断是否到最后一页，若到最后一页，禁止发送请求
  const isLastPage = () => {
    if (Math.ceil(total.value / param.size) < currentPage.value) {
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
