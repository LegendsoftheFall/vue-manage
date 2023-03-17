<template>
    <!-- grid-container -->
    <div class="container grid grid-cols-12 gap-3 mx-auto h-full mt-5">
      <!-- SideBar -->
      <div class="col-span-2">
        <SideBar/>
      </div>
      <!-- Content -->
      <div class="col-span-10">
        <div class="w-full h-full border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
            <!-- Info -->
            <div class="grid grid-cols-12">
                <div class="col-span-1"></div>
                <div class="col-span-10">
                    <div class="flex my-4 py-4">
                        <!-- 头像 -->
                        <div class="flex items-center">
                            <a :href="`/@${profile.userID}`" class="w-40 h-40 rounded-full overflow-hidden">
                                <img v-if="profile.avatar" :src="profile.avatar" alt="">
                                <img v-if="!profile.avatar" src="@/assets/image/avator.svg" alt="">
                            </a>
                        </div>
                        <!-- 信息 -->
                        <div class="flex w-full">
                            <div class="w-full pl-8 flex flex-col">
                                <div class="flex justify-between">
                                    <div class="flex flex-col w-64 pr-4">
                                        <a :href="`/@${profile.userID}`" class="text-3xl line-clamp-2">{{profile.username}}</a>
                                        <p class="mt-3 text-lg">{{profile.position}}</p>
                                    </div>
                                    <div class="flex">
                                        <!-- 主页 -->
                                        <div>
                                            <a :href="`/user/${profile.userID}`" class="flex justify-center items-center px-6 py-2 mr-3 rounded-full border border-blue-400 text-blue-400">
                                                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                                </svg>
                                                <p class="pl-1">主页</p>
                                            </a>
                                        </div>
                                        <!-- 关注 -->
                                        <div>
                                            <button @click="useFollow(profile.userID, profile.isFollow)" v-if="showFollow"
                                                :class="{'bg-blue-450 hover:bg-blue-400 px-6 py-2 ':!profile.isFollow, 'bg-gray-100 hover:bg-gray-200 py-2 px-8':profile.isFollow }"
                                                class="rounded-lg flex justify-center items-center">
                                                <div v-if="!profile.isFollow" class="flex justify-center items-center">
                                                    <svg class="text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                                    </svg>
                                                    <p class="pl-1 text-white">关注</p>
                                                </div>
                                                <div v-if="profile.isFollow" class="flex justify-center items-center">
                                                    <p class="pl-1 text-gray-500">已关注</p>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <!-- 关注相关 -->
                                <div class="flex mt-5">
                                    <a href="#">
                                        <span>{{profile.follower}}</span> 关注者
                                    </a>
                                    <a href="#" class="pl-4">
                                        <span>{{profile.following}}</span> 关注了
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-1"></div>
            </div>
            <!-- detail -->
            <div class="grid grid-cols-12 mb-5">
                <div class="col-span-1"></div>
                <div class="col-span-10">
                    <div class="px-2 py-5 flex justify-center items-center border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                        <div class="mx-2 flex  justify-center items-center pr-6">
                            <a v-if="profile.homePage" href="#"
                            class="h-full block px-2
                            py-2 items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
                                <svg class="w-6 h-6 text-gray-600 dark:text-gray-500 hover:text-black dark:hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M15.75 8.25a.75.75 0 01.75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 11-.992-1.124A2.243 2.243 0 0015 9a.75.75 0 01.75-.75z" />
                                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM4.575 15.6a8.25 8.25 0 009.348 4.425 1.966 1.966 0 00-1.84-1.275.983.983 0 01-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 012.328-.377L16.5 15h.628a2.25 2.25 0 011.983 1.186 8.25 8.25 0 00-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.575 15.6z" clip-rule="evenodd" />
                                </svg>
                            </a>
                            <!-- github -->
                            <a v-if="profile.github" :href="profile.github"
                            class="h-full block px-2
                            py-2 items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
                                <svg class="bi bi-github text-gray-600 dark:text-gray-500 hover:text-black dark:hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"  viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                                </svg>
                            </a>
                        </div>
                        <div v-if="profile.location" class="mx-2 flex justify-center items-center pr-6">
                            <svg class="w-6 h-6 mx-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            <span class="text-lg">{{profile.location}}</span>
                        </div>
                        <div v-if="profile.format" class="mx-2 flex justify-center items-center">
                            <svg class="w-6 h-6 mx-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                            </svg>
                            <span class="text-lg">加入于 {{profile.format}}</span>
                        </div>
                        <div v-if="profile.company" class="mx-2 flex justify-center items-center">
                            <svg class="w-6 h-6 mx-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                            </svg>
                            <span class="text-lg">{{profile.company}}</span>
                        </div>
                    </div>
                </div>
                <div class="col-span-1"></div>
            </div>
            <!-- About -->
            <div class="grid grid-cols-12 mb-5">
                <div class="col-span-1"></div>
                <div class="col-span-10">
                    <div class="px-10 py-5 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                        <div class="mb-4">
                            <span class="text-lg font-semibold tracking-wider">关于我</span>
                        </div>
                        <p class="break-words">{{profile.introduction}}</p>
                    </div>
                </div>
                <div class="col-span-1"></div>
            </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/model/model'
import SideBar from '@/components/sidebar/SideBar.vue'
import createToast from '@/hooks/useCreateToast'

export default defineComponent({
  name: 'ExploreContent',
  components: { SideBar },
  setup () {
    const route = useRoute()
    const id = route.params.id
    const store = useStore<GlobalDataProps>()
    const uid = computed(() => store.state.user.id)
    const isClick = ref(false)

    onMounted(() => {
      store.dispatch('fetchProfile', id)
    })

    const profile = computed(() => store.state.profile)

    const showFollow = computed(() => {
      const { isLogin, id } = store.state.user
      if (isLogin && profile.value && profile.value.userID) {
        const userID = profile.value.userID
        return userID !== id
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
<<<<<<< HEAD
        store.dispatch('followUserCancel', fid).then(() => {
          store.commit('setProfileFollow')
        })
      } else {
        store.dispatch('followUser', fid).then(() => {
=======
        store.dispatch('followUserCancel', { uid: uid.value, fid: fid }).then(() => {
          store.commit('setProfileFollow')
        })
      } else {
        store.dispatch('followUser', { uid: uid.value, fid: fid }).then(() => {
>>>>>>> 8d7ae212e14904c7e89a97459b97f55e3b39a352
          store.commit('setProfileFollow')
        })
      }
    }
    return { isClick, profile, showFollow, useFollow }
  }
})
</script>
