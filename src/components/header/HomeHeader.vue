<template>
    <!-- Navbar -->
    <header>
        <nav class="container mx-auto pt-2">
            <!-- flex-container -->
            <div class="flex flex-col ">
                <div class="flex items-center justify-between mt-5 ">
                    <!-- User -->
                    <a :href="`/user/${userInfo.userID}`" class="flex justify-center items-center">
                        <button class="block w-10 h-10 rounded-full overflow-hidden">
                            <img :src="userInfo?.avatar" alt="">
                        </button>
                        <span class="font-black text-xl tracking-wide pl-2">{{userInfo?.username}} 的博客</span>
                    </a>
                    <div class="flex justify-between items-center pl-4">
                        <!-- mode -->
                        <ToggleMode/>
                        <!-- follow -->
                        <button @click="useFollow(userInfo.userID!, userInfo.isFollow)" v-if="showFollow"
                            :class="{'bg-blue-450 hover:bg-blue-400 px-4 py-2 ':!userInfo.isFollow, 'bg-gray-100 hover:bg-gray-200 py-2 px-5':userInfo.isFollow }"
                            class="rounded-md flex justify-center items-center mr-3">
                            <div v-if="!userInfo.isFollow" class="flex justify-center items-center">
                                <svg class="text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                                <p class="pl-1 text-white">关注</p>
                            </div>
                            <div v-if="userInfo.isFollow" class="flex justify-center items-center">
                                <p class="pl-1 text-gray-500">已关注</p>
                            </div>
                        </button>
                        <!-- avator -->
                        <HomeAvatar/>
                    </div>
                </div>
                <div class="flex justify-between items-center mt-6 h-10">
                    <!-- 专栏 -->
                    <nav class="flex justify-center items-center whitespace-nowrap overflow-x-auto no-scrollbar">
                        <a href="#"
                        class="font-semibold tracking-wide h-full block px-4
                        py-2 items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-t-md
                        text-gray-600 dark:text-gray-500 hover:text-black dark:hover:text-white">主页</a>
                    </nav>
                    <!-- icon -->
                    <div class="flex justify-center items-center whitespace-nowrap">
                        <!-- 个人信息 -->
                        <a :href="`/@${userInfo.userID}`"
                        class="h-full block px-2
                        py-2 items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-t-md">
                            <svg class="w-6 h-6 text-gray-600 dark:text-gray-500 hover:text-black dark:hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clip-rule="evenodd" />
                            </svg>
                        </a>
                        <!-- 个人主页 -->
                        <a v-if="userInfo.homePage" :href="userInfo.homePage"
                        class="h-full block px-2
                        py-2 items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-t-md">
                            <svg class="w-6 h-6 text-gray-600 dark:text-gray-500 hover:text-black dark:hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15.75 8.25a.75.75 0 01.75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 11-.992-1.124A2.243 2.243 0 0015 9a.75.75 0 01.75-.75z" />
                                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM4.575 15.6a8.25 8.25 0 009.348 4.425 1.966 1.966 0 00-1.84-1.275.983.983 0 01-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 012.328-.377L16.5 15h.628a2.25 2.25 0 011.983 1.186 8.25 8.25 0 00-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.575 15.6z" clip-rule="evenodd" />
                            </svg>
                        </a>
                        <!-- github -->
                        <a v-if="userInfo.github" :href="userInfo.github"
                        class="h-full block px-2
                        py-2 items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-t-md">
                            <svg class="bi bi-github text-gray-600 dark:text-gray-500 hover:text-black dark:hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"  viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/model/model'
import ToggleMode from '@/components/button/ToggleMode.vue'
import HomeAvatar from '@/components/header/HomeAvatar.vue'
import { computed } from '@vue/reactivity'
import createToast from '@/hooks/useCreateToast'

export default defineComponent({
  name: 'GlobalHeader',
  components: { ToggleMode, HomeAvatar },
  setup () {
    const store = useStore<GlobalDataProps>()
    const uid = computed(() => store.state.user.id)
    const userInfo = computed(() => {
      if (store.state.userInfo?.avatar === '') {
        store.state.userInfo.avatar = require('@/assets/image/avator.svg')
      }
      return store.state.userInfo
    })

    const showFollow = computed(() => {
      const { isLogin, id } = store.state.user
      if (isLogin && userInfo.value && userInfo.value.userID) {
        const authorID = userInfo.value.userID
        return authorID !== id
      } else {
        return true
      }
    })

    const useFollow = (fid: string, isFollow: boolean) => {
      if (uid.value === '') {
        createToast('error', '登录后才能关注哦')
        return
      }
      console.log(isFollow)
      if (isFollow) {
        store.dispatch('followUserCancel', { uid: uid.value, fid: fid }).then(() => {
          store.commit('setUserFollowMode', fid)
        })
      } else {
        store.dispatch('followUser', { uid: uid.value, fid: fid }).then(() => {
          store.commit('setUserFollowMode', fid)
        })
      }
    }

    return { userInfo, showFollow, useFollow }
  }
})
</script>

<style>
 /* Hide scrollbar for Chrome, Safari and Opera */
 .no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>
