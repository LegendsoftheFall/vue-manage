<template>
    <div class="pr-1 relative">
        <!-- 头像 -->
        <button @click="isOpen = !isOpen" ref="dropdownRef" class="block w-10 h-10 rounded-full overflow-hidden">
            <img v-if="UserInfo.isLogin" :src="UserInfo.avatar === '' ? require('@/assets/image/avator.svg') : UserInfo.avatar" alt="your avator">
            <img v-if="!UserInfo.isLogin" src="@/assets/image/avator.svg" alt="Vistor avator">
        </button>
        <!-- 登录下拉菜单 -->
        <div v-if="isOpen && UserInfo.isLogin" class="absolute right-0 z-10 top-full min-h-full w-56 mt-2 bg-white
         dark:bg-black border dark:border-gray-700
         rounded-lg shadow-xl overflow-hidden">
            <!-- 新建文章 -->
            <a href="/create/draft" class="block px-4 py-4 font-semibold text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                <div class="flex">
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                    </svg>
                    <span class="ml-2">新建文章</span>
                </div>
            </a>
            <hr class=" border-gray-100 dark:border-gray-700">
            <!-- 我的草稿 -->
            <a href="#" class="block px-4 py-2 font-semibold text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                <div class="flex">
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <span class="ml-2">我的草稿</span>
                </div>
            </a>
            <!-- 账号设定 -->
            <a href="#" class="block px-4 py-2 font-semibold text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                <div class="flex">
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span class="ml-2">账号设定</span>
                </div>
            </a>
            <hr class=" border-gray-100 dark:border-gray-700">
            <!-- 社区 -->
            <a href="/recommend" class="block px-4 py-2 font-semibold text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                <div class="flex">
                    <svg class="w-6 h-6 text-gray-600 dark:text-gray-500 hover:text-black dark:hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clip-rule="evenodd" />
                    </svg>
                    <span class="ml-2">社区</span>
                </div>
            </a>
            <!-- 发现 -->
            <a href="#" class="block px-4 py-2 font-semibold text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                <div class="flex items-center">
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span class="ml-2">发现博客</span>
                </div>
            </a>
            <hr class=" border-gray-100 dark:border-gray-700">
            <!-- 登出 -->
            <router-link :to="{ name: 'Index' }" @click="useLogOut" class="block px-4 py-2 font-semibold text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                <div class="flex">
                    <svg class=" w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    <span class="ml-2">登出</span>
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
