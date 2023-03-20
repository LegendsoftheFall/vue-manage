<template>
  <div class="w-full flex items-center h-64 p-6 border rounded-lg bg-white font-Poppins">
    <div class="flex flex-col w-full h-full">
      <!-- Name -->
      <div class="h-1/2 justify-center items-start">
        <div class="flex justify-center items-center">
          <!-- 在请求图片路径未赋值前是undefined -->
          <a :href="`/n/${tagDetail.id}`" class="mr-4">
            <div v-if="!isLoading && tagDetail.image" class="w-15 h-15 border rounded-md overflow-hidden shadow-lg">
              <img class="w-15 h-15 object-cover" :src="`${tagDetail.image}`" alt="">
            </div>
            <div v-if="isLoading" class="animate-pulse p-8 rounded-md border bg-gray-100 shadow-lg"></div>
          </a>
          <div>
            <span class="text-3xl font-semibold font-Poppins">{{tagDetail.name}}</span>
            <p># {{tagDetail.id}}</p>
          </div>
        </div>
      </div>
      <!-- Button -->
      <div class="h-1/4 justify-center items-center">
        <div class="flex justify-center items-center">
          <!-- follow -->
          <button @click="useFollow(tagDetail.id, tagDetail.isFollow)"
              :class="{'bg-blue-450 hover:bg-blue-400 px-4 py-2 ':!tagDetail.isFollow, 'bg-gray-100 hover:bg-gray-200 py-2 px-5':tagDetail.isFollow }"
              class="rounded-md flex justify-center items-center mr-3">
              <div v-if="!tagDetail.isFollow" class="flex justify-center items-center">
                  <svg class="text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                  </svg>
                  <p class="pl-1 text-white">关注</p>
              </div>
              <div v-if="tagDetail.isFollow" class="flex justify-center items-center">
                  <p class="pl-1 text-gray-500">已关注</p>
              </div>
          </button>
          <!-- write -->
          <a href="#" class="px-4 py-2 border border-blue-300 bg-blue-50 rounded-md flex
          justify-center items-center hover:bg-blue-100 ml-3">
            <svg class="w-4 h-4 text-blue-450" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
            </svg>
            <a href="/create/draft" class="pl-1 text-blue-450">写作</a>
          </a>
        </div>
      </div>
      <!-- Detail -->
      <div class="h-1/4 justify-between items-center">
        <div class="flex justify-center items-center">
          <!-- followers and articles -->
          <div class="flex justify-center items-center">
            <!-- followers -->
            <div class="flex justify-center items-center mr-4">
              <svg class="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
              <span>{{tagDetail.followerNum}} 关注者</span>
            </div>
            <span>&#183;</span>
            <!-- articles -->
            <div class="flex justify-center items-center ml-4">
              <svg class="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
              </svg>
              <span>{{tagDetail.articleNum}} 文章</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="h-6 w-full"></div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { GlobalDataProps } from '@/model/model'
import createToast from '@/hooks/useCreateToast'

export default defineComponent({
  name: 'TagDetail',
  setup () {
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const currentID = route.params.id
    const uid = computed(() => store.state.user.id)

    onMounted(() => {
      // 获取标签详情
      store.dispatch('fetchTagDetailByID', currentID)
    })

    const tagDetail = computed(() => store.state.tags)
    const isLoading = computed(() => store.state.loading)

    const useFollow = (tid: string, isFollow: boolean) => {
      if (uid.value === '') {
        createToast('error', '登录后才能关注哦')
        return
      }
      console.log(isFollow)
      if (isFollow) {
        store.dispatch('followTagCancel', tid).then(() => {
          store.commit('setTagFollowMode')
        })
      } else {
        store.dispatch('followTag', tid).then(() => {
          store.commit('setTagFollowMode')
        })
      }
    }

    return { tagDetail, isLoading, useFollow }
  }
})

</script>
