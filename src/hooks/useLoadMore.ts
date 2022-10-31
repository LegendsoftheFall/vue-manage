import { computed, ComputedRef, ref } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps, LoadParams } from '@/model/model'

const useLoadMore = (actionName: string, total: ComputedRef<number>,
  param:LoadParams = { page: 2, size: 10 }) => {
  const store = useStore<GlobalDataProps>()
  const currentPage = ref(param.page)
  const requestParam = computed(() => ({
    page: currentPage.value,
    size: param.size,
    id: param.id
  }))
  // 加载更多
  const loadMorePage = () => {
    store.dispatch(actionName, requestParam.value).then(() => {
      currentPage.value++
    })
  }
  // 判断是否是最后一页
  const isLastPage = computed(() => {
    return Math.ceil(total.value / param.size) < currentPage.value
  })

  return { loadMorePage, isLastPage, currentPage }
}

export default useLoadMore
