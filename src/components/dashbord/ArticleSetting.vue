<template>
    <div class="col-span-8 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 font-Poppins">
      <div class="flex flex-col p-6">
        <div class="text-bookmark-blue font-semibold text-2xl">文章&#40;{{articleList?.length || 0}}&#41;</div>
        <div v-for="article in articleList" :key="article&&article.id"
        class="w-full flex justify-between p-4 h-32 dark:border-gray-700 border-b-0 bg-white dark:bg-gray-800">
            <!-- Article -->
            <!-- left -->
            <template v-if="article">
            <div class="flex flex-col h-full">
                <div class="h-max">
                    <a :href="`/article/${article&&article.id}`" target="_blank">
                        <p class="break-words font-big text-2xl tracking-wider line-clamp-2">{{article&&article.title}}</p>
                    </a>
                </div>
                <div class="flex py-3 text-gray-600">
                    <a :href="`/article/${article&&article.id}`" target="_blank"> <p>{{article&&article.format}}</p> </a>
                    <p class="px-2">&#183;</p>
                    <div class="flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart" viewBox="0 0 16 16">
                            <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z"/>
                        </svg>
                        <p class="pl-2">{{article&&article.viewCount}} 阅读</p>
                    </div>
                    <p class="px-2">&#183;</p>
                    <p>发布于 {{article&&article.format}}</p>
                </div>
            </div>
            </template>
            <!-- edit -->
            <div class="flex w-32">
                <!-- edit -->
                <div class="flex flex-shrink-0">
                    <div class="pr-2 py-2">
                      <a :href="`/edit/${article.id}`" target="_blank" class="
                      py-1 px-3 rounded-lg border border-blue-400
                      text-sm text-blue-400 ">
                          编辑
                      </a>
                  </div>
                </div>
                <!-- delete -->
                <div class="flex flex-shrink-0">
                    <div class="pr-2 py-2">
                        <button  @click.prevent="isModal = true, onClick(article.id)" class="flex px-2 py-1 rounded-full text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                            <svg class="w-5 h-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    <ConfirmModal title="删除文章" :visable="isModal" @modal-on-close="isModal = !isModal" @modal-on-confirm="hideAndDelete(aid)">
      <p>确定要删除这篇文章吗?</p>
    </ConfirmModal>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/model/model'
import ConfirmModal from '@/components/modal/ConfirmModal.vue'
import createToast from '@/hooks/useCreateToast'

export default defineComponent({
  name: 'ArticleSetting',
  components: { ConfirmModal },
  setup () {
    const store = useStore<GlobalDataProps>()
    const aid = ref('')
    const isModal = ref(false)
    const id = localStorage.getItem('userID')

    const hideAndDelete = (id: string) => {
      console.log(id)
      isModal.value = false
      store.dispatch('deleteArticle', id).then(() => {
        createToast('success', '删除成功')
        store.dispatch('fetchAllUserArticle')
      })
    }

    const onClick = (id: string) => {
      aid.value = id
    }

    onMounted(() => {
      store.dispatch('fetchAllUserArticle')
    })

    const articleList = computed(() => store.state.userArticleInfo)

    return { articleList, hideAndDelete, isModal, aid, onClick }
  }
})
</script>
