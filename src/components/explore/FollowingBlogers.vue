<template>
    <div id="scroll"
    class="w-full h-max py-6 px-4 border border-t-0 flex flex-wrap bg-white dark:bg-gray-800 dark:border-gray-700 rounded-b-lg">
        <div class="w-full p-2"  v-for="userInfo in userInfoList" :key="userInfo.userID">
            <div class=" h-16 p-3 flex items-center rounded-lg">
                <a :href="`/user/${userInfo.userID}`" target="_blank" class="w-10 h-10 block rounded-full overflow-hidden">
                    <img :src="userInfo.avatar" alt="">
                </a>
                <div class="pl-3 w-10/12 text-sm">
                    <p class="font-semibold">
                        <a :href="`/user/${userInfo.userID}`" target="_blank">{{userInfo.username}}</a>
                    </p>
                </div>
                <div class="w-2/12 flex justify-center items-center">
                  <button @click="useFollow(userInfo.userID!, userInfo.isFollow)"
                      :class="{'text-blue-450 bg-white hover:bg-gray-200 border border-blue-450 px-4 py-2 ':!userInfo.isFollow, 'bg-gray-100 hover:bg-gray-200 py-2 px-5':userInfo.isFollow }"
                      class=" rounded-md flex justify-center items-center flex-shrink-0">
                      <div v-if="!userInfo.isFollow" class="flex justify-center items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                          </svg>
                          <p class="pl-1">关注</p>
                      </div>
                      <div v-if="userInfo.isFollow" class="flex justify-center items-center">
                          <p class="pl-1 text-gray-500">已关注</p>
                      </div>
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
  name: 'FollowingBlogers',
  setup () {
    const store = useStore<GlobalDataProps>()
    const total = computed(() => store.state.total)
    const uid = computed(() => store.state.user.id)
    const isClick = ref(false)
    onMounted(() => {
      store.dispatch('fetchFollowUsersOnce', { page: 1, size: 10 })
      store.commit('setRequestMode', true)
      store.commit('setLoadMode', true)
    })

    const userInfoList = computed(() => {
      return store.state.userInfos.map(userInfo => {
        if (!userInfo.avatar) {
          userInfo.avatar = require('@/assets/image/avator.svg')
        }
        return userInfo
      })
    })

    const useFollow = (fid: string, isFollow: boolean) => {
      if (uid.value === '') {
        createToast('error', '登录后才能关注哦')
        return
      }
      console.log(isFollow)
      if (isFollow) {
        store.dispatch('followUserCancel', { uid: uid.value, fid: fid }).then(() => {
          store.commit('changeUsersFollow', fid)
        })
      } else {
        store.dispatch('followUser', { uid: uid.value, fid: fid }).then(() => {
          store.commit('changeUsersFollow', fid)
        })
      }
    }

    useScrollLoad('fetchFollowTags', total, { page: 2, size: 10 })

    return { isClick, userInfoList, useFollow }
  }
})
</script>
