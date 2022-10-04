<template>
    <div class="pr-1 relative">
        <!-- 头像 -->
        <button @click="isOpen = !isOpen" ref="dropdownRef" class="block w-10 h-10 rounded-full overflow-hidden">
            <img v-if="isLogin" class="w-full h-full" src="../assets/image/KKK.jpg" alt="Your avator">
            <img v-if="!isLogin" class="w-full h-full" src="../assets/image/avator.svg" alt="Your avator">
        </button>
        <!-- 登录下拉菜单 -->
        <div v-if="isOpen && isLogin" class="absolute right-0 z-10 py-2 top-full min-h-full w-56 mt-2 bg-white
        dark:bg-gray-800 dark:border-t-gray-700 dark:border-b-gray-700
        border-t border-b rounded-lg shadow-xl overflow-hidden">
            <!-- 关于我 -->
            <a href="#" class="block px-4 py-4 text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
                <div class="flex items-center">
                    <!-- Avator -->
                    <img class="w-12 h-12 rounded-full" src="../assets/image/KKK.jpg" alt="your avator">
                    <div class="pl-2">
                        <span class="text-sm font-semibold dark:text-white">发腮的汤姆猫</span>
                    </div>
                </div>
            </a>
            <hr class="w-5/6 ml-4 border-gray-100 dark:border-gray-700">
            <!-- 我的博客 -->
            <a href="#" class="block px-4 py-4 font-semibold text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                <div class="flex justify-between items-center">
                    <span>我的博客</span>
                    <svg class="w-6 h-6 -rotate-90 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                    </svg>
                </div>
            </a>
            <hr class="w-5/6 ml-4 border-gray-100 dark:border-gray-700">
            <!-- 我的草稿 -->
            <a href="#" class="block px-4 py-2 font-semibold text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                <div class="flex">
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <span class="ml-2">我的草稿</span>
                </div>
            </a>
            <!-- 我的书签 -->
            <a href="#" class="block px-4 py-2 font-semibold text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                <div class="flex">
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>
                    <span class="ml-2">我的书签</span>
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
            <!-- 管理博客 -->
            <a href="#" class="block px-4 py-2 font-semibold text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                <div class="flex">
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                    </svg>
                    <span class="ml-2">管理博客</span>
                </div>
            </a>
            <hr class="w-5/6 ml-4 border-gray-100 dark:border-gray-700">
            <!-- 登出 -->
            <a href="#" class="block px-4 py-2 font-semibold text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                <div class="flex">
                    <svg class="text-red-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    <span class="ml-2 text-red-500">登出</span>
                </div>
            </a>
        </div>
        <!-- 未登录下拉菜单 -->
        <div v-if="isOpen && !isLogin" class="absolute right-0 z-10 py-2 top-full min-h-full w-56 mt-2 bg-white
        dark:bg-gray-800 dark:border-t-gray-700 dark:border-b-gray-700 border-t border-b rounded-lg shadow-xl overflow-hidden">
            <!-- 头像 -->
            <div class="flex justify-center items-center">
                <img class="w-19 h-19" src="../assets/image/avator.svg" alt="avator">
            </div>
            <!-- 标语 -->
            <div class="flex mx-5 mt-4">
                <h1 class="text-gray-900 font-semibold dark:text-teal-500">注册或登录你的manage账户</h1>
            </div>
            <hr class="w-5/6 ml-4 mt-2 border-gray-100 dark:border-gray-700">
            <!-- 登录或注册 -->
            <div class="flex justify-between items-center mt-4">
                <!-- 注册 -->
                <router-link :to="{ name: 'Login'}" class=" bg-blue-450 hover:bg-blue-500 ml-4 focus:outline-none
                text-white rounded-full">
                    <p class="pr-7 pl-7 py-2 font-semibold tracking-wider">登录</p>
                </router-link>
                <!-- 登录 -->
                <router-link :to="{ name: 'Signup'}" class="border bg-white border-blue-450 hover:bg-gray-100 mr-4 rounded-full">
                    <p class="pr-7 pl-7 py-2 text-blue-450 font-semibold tracking-wider">注册</p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useClickOutSide from '../hooks/useClickOutSide'

export default defineComponent({
  name: 'UserAvator',
  setup () {
    const isLogin = ref(false)
    const isOpen = ref(false)
    const dropdownRef = ref<null | HTMLElement>(null)
    const isClickOutSide = useClickOutSide(dropdownRef)

    watch(isClickOutSide, () => {
      if (isOpen.value && isClickOutSide.value) {
        isOpen.value = false
      }
    })
    return { isOpen, dropdownRef, isLogin }
  }
})
</script>
