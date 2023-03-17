<template>
    <div id="scroll"
    class="w-full h-max py-6 px-4 border border-t-0 flex flex-wrap bg-white dark:bg-gray-800 dark:border-gray-700 rounded-b-lg">
        <div class="w-1/2 p-2"  v-for="tag in tagList" :key="tag.name">
            <div class="bg-gray-3 dark:bg-gray-700 h-16 p-3 flex items-center rounded-lg">
                <a :href="`/n/${tag.id}`" target="_blank" class="w-12 h-10 rounded-md overflow-hidden shadow-md">
                    <img class="w-12 h-10 object-cover bg-white" :src="tag.image" alt="">
                </a>
                <div class="pl-2 w-10/12 text-sm">
                    <p class="font-semibold">
                        <a :href="`/n/${tag.id}`" target="_blank">{{tag.name}}</a>
                    </p>
                    <p>
                        <a :href="`/n/${tag.id}`" target="_blank">{{tag.num}} 文章</a>
                    </p>
                </div>
                <div class="w-2/12 flex justify-center items-center">
                    <button @click="useFollow(tag.id, tag.isFollow)" class="w-7 h-7 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full shadow-md border dark:border-gray-700 flex justify-center items-center flex-shrink-0">
                        <svg v-if="!tag.isFollow" class="bi bi-plus text-blue-700" xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                        <svg v-if="tag.isFollow" class="bi bi-check2 text-green-600" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="w-full h-12"></div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/model/model'
import useScrollLoad from '@/hooks/useScrollLoad'
import createToast from '@/hooks/useCreateToast'

export default defineComponent({
  name: 'AllTags',
  setup () {
    const store = useStore<GlobalDataProps>()
    const total = computed(() => store.state.total)
    const uid = computed(() => store.state.user.id)
    const isClick = ref(false)
    onMounted(() => {
      store.dispatch('fetchTagsOnce', { page: 1, size: 10 })
      store.commit('setRequestMode', true)
      store.commit('setLoadMode', true)
    })

    const tagList = computed(() => store.state.tagInfo)

    const useFollow = (tid: string, isFollow: boolean) => {
      if (uid.value === '') {
        createToast('error', '登录后才能关注哦')
        return
      }
      console.log(isFollow)
      if (isFollow) {
<<<<<<< HEAD
        store.dispatch('followTagCancel', tid).then(() => {
          store.commit('changeTagFollow', tid)
        })
      } else {
        store.dispatch('followTag', tid).then(() => {
=======
        store.dispatch('followTagCancel', { uid: uid.value, tid: tid }).then(() => {
          store.commit('changeTagFollow', tid)
        })
      } else {
        store.dispatch('followTag', { uid: uid.value, tid: tid }).then(() => {
>>>>>>> 8d7ae212e14904c7e89a97459b97f55e3b39a352
          store.commit('changeTagFollow', tid)
        })
      }
    }

    useScrollLoad('fetchAllTags', total, { page: 2, size: 10 })

    return { isClick, tagList, useFollow }
  }
})
</script>
