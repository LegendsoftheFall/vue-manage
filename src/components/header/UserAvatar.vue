<template>
    <div class="pr-1 relative">
        <!-- 头像 -->
        <button @click="isOpen = !isOpen" ref="dropdownRef" class="block w-10 h-10 rounded-full overflow-hidden">
            <img v-if="UserInfo.isLogin" :src="UserInfo.avatar === '' ? require('@/assets/image/avator.svg') : UserInfo.avatar" alt="">
            <img v-if="!UserInfo.isLogin" src="@/assets/image/avator.svg" alt="Vistor avator">
        </button>
        <!-- 登录下拉菜单 -->
        <div v-if="isOpen && UserInfo.isLogin" class="absolute right-0 z-30 py-2 top-full min-h-full w-56 mt-2 bg-white
        dark:bg-black border dark:border-gray-700
         rounded-lg shadow-xl overflow-hidden">
            <!-- 关于我 -->
            <a :href="`/@${UserInfo.id}`" class="block px-4 py-4 text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
                <div class="flex items-center">
                    <!-- Avator -->
                    <div class="w-12 h-12 rounded-full overflow-hidden">
                        <img class="" :src="UserInfo.avatar === '' ? require('@/assets/image/avator.svg') : UserInfo.avatar" alt="">
                    </div>
                    <div class="pl-2 flex flex-col">
                        <span class="text-sm font-semibold dark:text-white">{{UserInfo.name}}</span>
                        <span class="text-xs text-gray-500">{{UserInfo.email}}</span>
                    </div>
                </div>
            </a>
            <hr class="w-5/6 ml-4 border-gray-200 dark:border-gray-700">
            <!-- 我的博客 -->
            <a :href="`/user/${UserInfo.id}`" class="block px-4 py-4 font-semibold text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                <div class="flex justify-between items-center">
                    <span>我的博客</span>
                    <svg class="w-6 h-6 -rotate-90 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                    </svg>
                </div>
            </a>
            <hr class="w-5/6 ml-4 border-gray-200 dark:border-gray-700">
            <!-- 我的草稿 -->
            <a href="/drafts" class="block px-4 py-2 font-semibold text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                <div class="flex">
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <span class="ml-2">我的草稿</span>
                </div>
            </a>
            <!-- 我的书签 -->
            <a href="/bookmarks" class="block px-4 py-2 font-semibold text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                <div class="flex">
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>
                    <span class="ml-2">我的书签</span>
                </div>
            </a>
            <!-- 账号设定 -->
            <a href="/dashboard" class="block px-4 py-2 font-semibold text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                <div class="flex">
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span class="ml-2">账号设定</span>
                </div>
            </a>
            <!-- 管理博客 -->
            <a href="#" class="block px-4 py-2 font-semibold text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                <div class="flex">
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                    </svg>
                    <span class="ml-2">管理博客</span>
                </div>
            </a>
            <hr class="w-5/6 ml-4 border-gray-200 dark:border-gray-700">
            <!-- 登出 -->
            <router-link :to="{ name: 'Index' }" @click="useLogOut" class="block px-4 py-2 font-semibold text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                <div class="flex">
                    <svg class="text-red-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    <span class="ml-2 text-red-500">登出</span>
                </div>
            </router-link>
        </div>
        <!-- 未登录下拉菜单 -->
        <LogoutMenu v-if="isOpen && !UserInfo.isLogin"/>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/model/model'
import useClickOutSide from '@/hooks/useClickOutSide'
import LogoutMenu from '@/components/header/LogoutMenu.vue'

export default defineComponent({
  name: 'UserAvatar',
  components: { LogoutMenu },
  setup () {
    const store = useStore<GlobalDataProps>()
    const UserInfo = computed(() => store.state.user)

    // 处理点击事件
    const isOpen = ref(false)
    const dropdownRef = ref<null | HTMLElement>(null)
    const isClickOutSide = useClickOutSide(dropdownRef)

    watch(isClickOutSide, () => {
      if (isOpen.value && isClickOutSide.value) {
        isOpen.value = false
      }
    })

    const useLogOut = () => {
      store.commit('logout') // 登出功能
    }
    return { isOpen, dropdownRef, UserInfo, useLogOut }
  }
})
</script>
