<template>
    <div class="w-full flex justify-between items-center mb-5 h-max p-6 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
        <div>
            <div class="text-2xl font-semibold">草稿</div>
            <div class="tracking-wide">所有待发布的草稿</div>
        </div>
        <a href="/create/draft" class="px-4 py-2 border border-blue-450 rounded-md flex
          justify-center items-center hover:bg-blue-50 dark:hover:bg-gray-700 ml-3">
            <svg class="w-4 h-4 text-blue-450" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
            </svg>
            <p class="pl-1 text-blue-450">创建新的草稿</p>
        </a>
    </div>

    <div v-for="draft in draftList" :key="draft.id"
    class="w-full flex p-4 h-52 border dark:border-gray-700 border-b-0 bg-white dark:bg-gray-800">
        <!-- Picture -->
        <div class="flex w-40">
            <a :href="`/draft/${draft.id}`" target="_blank" class="w-32 h-max">
              <div v-if="draft.image">
                <img class="w-full h-full rounded-lg border dark:border-gray-700 object-cover" :src="draft.image" alt="image">
              </div>
              <div v-if="!draft.image" class="bg-gray-400 rounded-lg border w-32 h-23 flex justify-center items-center">没有头图</div>
            </a>
        </div>
        <!-- Article -->
        <div class="flex w-full h-max mt-2">
          <div class=" flex flex-col mx-4 w-full">
              <p class="font-bold text-xl mb-1 break-words h-max line-clamp-2 dark:text-white text-blue-450">
                <a :href="`/draft/${draft.id}`" target="_blank">{{draft.title}}</a>
              </p>
              <p class="line-clamp-4 break-words mt-2 text-sm text-gray-600 dark:text-gray-500">
                <a :href="`/draft/${draft.id}`" target="_blank">
                    <span v-if="draft.subtitle" target="_blank">{{draft.subtitle}} &#183; </span>
                    {{draft.content}}
                </a>
              </p>
              <div class="mt-4">
                <a :href="`/draft/${draft.id}`" class="flex items-center text-gray-600 dark:text-gray-400">
                    <span class="">上一次更新:</span>
                    <em class="pl-2 text-gray-800">{{draft.format}}</em>
                </a>
              </div>
          </div>
        </div>
        <!-- Picture -->
        <div class="flex w-32">
            <!-- edit -->
            <div class="flex flex-shrink-0">
                <div class="pr-2 py-2">
                    <div class="flex px-2 py-1 rounded-full text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                        <a :href="`/draft/${draft.id}`" class="text-sm text-gray-700 dark:text-white">编辑</a>
                    </div>
                </div>
            </div>
            <!-- delete -->
            <div class="flex flex-shrink-0">
                <div class="pr-2 py-2">
                    <button  @click.prevent="isModal = true, onClick(draft.id)" class="flex px-2 py-1 rounded-full text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                        <svg class="w-5 h-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- end -->
    <div class="mb-10 px-6 py-12 justify-center border rounded-b-lg dark:border-gray-700 bg-white dark:bg-gray-800 items-center text-center">
        <span class="text-2xl font-semibold tracking-wide my-4">到底啦！👋</span>
    </div>
    <ConfirmModal title="删除草稿" :visable="isModal" @modal-on-close="isModal = !isModal" @modal-on-confirm="hideAndDelete(did)">
      <p>确定要删除这篇草稿吗?</p>
    </ConfirmModal>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/model/model'
import ConfirmModal from '@/components/modal/ConfirmModal.vue'
import createToast from '@/hooks/useCreateToast'

export default defineComponent({
  name: 'DraftList',
  components: { ConfirmModal },
  setup () {
    const store = useStore<GlobalDataProps>()
    const did = ref('')
    const isModal = ref(false)
    const hideAndDelete = (id: string) => {
      console.log(id)
      isModal.value = false
      store.dispatch('deleteDraft', id).then(() => {
        createToast('success', '删除成功')
        store.dispatch('fetchDraftInfo')
      })
    }

    const onClick = (id: string) => {
      did.value = id
    }

    onMounted(() => {
      // store.dispatch('fetchDraftInfo', { page: 1, size: 10 })
      store.dispatch('fetchDraftInfo')
    })

    const draftList = computed(() => store.state.draftInfo)

    return { draftList, hideAndDelete, isModal, did, onClick }
  }
})
</script>
