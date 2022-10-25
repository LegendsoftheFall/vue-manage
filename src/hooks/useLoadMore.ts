import { computed, ComputedRef } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/model/model'

const useLoadMore = (actionName: string, total: ComputedRef<number>, id?: string) => {
  const store = useStore<GlobalDataProps>()
  const currentPage = computed(() => store.state.homePage.page)
  const size = computed(() => store.state.homePage.size)
  // 加载更多
  const loadMorePage = () => {
    store.dispatch(actionName, id).then(() => {
      store.commit('addHomePage')
    })
  }
  // 判断是否是最后一页
  const isLastPage = computed(() => {
    return Math.ceil(total.value / size.value) < currentPage.value
  })

  return { loadMorePage, isLastPage, currentPage }
}

export default useLoadMore
