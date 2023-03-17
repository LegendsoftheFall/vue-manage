<template>
    <div class="relative h-full flex">
        <a :href="`/edit/${Article?.id}`" class="pl-2 py-2 cursor-pointer">
            <div class="flex justify-center items-center px-2 py-1 rounded-full text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                <svg class="bi bi-pencil"  xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>
                <p class="text-sm pl-1 text-gray-700 dark:text-white">编辑</p>
            </div>
        </a>
        <button ref="dropdownRef"
        class="flex justify-center items-center pr-2 py-2" @click.prevent="isModal = true">
            <div class="flex justify-center items-center px-2 py-1 rounded-full text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                <svg class="w-5 h-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                <p class="text-sm pl-1 text-red-500 dark:text-white">删除</p>
            </div>
        </button>
    </div>
    <ConfirmModal title="删除文章" :visable="isModal" @modal-on-close="isModal = !isModal" @modal-on-confirm="hideAndDelete">
      <p>确定要删除这篇文章吗?</p>
    </ConfirmModal>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/model/model'
import { useRoute, useRouter } from 'vue-router'
import useClickOutSide from '@/hooks/useClickOutSide'
import ConfirmModal from '@/components/modal/ConfirmModal.vue'
import createToast from '@/hooks/useCreateToast'

export default defineComponent({
  name: 'EditButton', // 权限
  components: { ConfirmModal },
  setup () {
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const route = useRoute()
    const id = route.params.id
    const UserInfo = computed(() => store.state.user)
    const Article = computed(() => store.state.articleDetail.article)
    const isModal = ref(false)
    const hideAndDelete = () => {
      isModal.value = false
      store.dispatch('deleteArticle', id).then(resp => {
        const uid = resp.data.id
        createToast('success', '删除成功')
        setTimeout(() => {
          router.push({ name: 'Home', params: { id: uid } })
        }, 2000)
      })
    }

    // 处理点击事件
    const isOpen = ref(false)
    const dropdownRef = ref<null | HTMLElement>(null)
    const isClickOutSide = useClickOutSide(dropdownRef)

    watch(isClickOutSide, () => {
      if (isOpen.value && isClickOutSide.value) {
        isOpen.value = false
      }
    })

    return { isOpen, isModal, dropdownRef, hideAndDelete, UserInfo, Article }
  }
})
</script>
