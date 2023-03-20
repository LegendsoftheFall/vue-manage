<template>
    <div class="absolute right-0 z-30 py-2 top-full min-h-full w-56 mt-2 bg-white
        dark:bg-gray-800 dark:border-t-gray-700 dark:border-b-gray-700 border-t border-b rounded-lg shadow-xl overflow-hidden">
        <!-- 头像 -->
        <div class="flex justify-center items-center">
            <img class="w-19 h-19" src="@/assets/image/avator.svg" alt="avator">
        </div>
        <!-- 标语 -->
        <div class="flex mx-5 mt-4">
            <p class="text-gray-900 font-semibold dark:text-teal-500">注册或登录你的manage账户</p>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LogoutMenu'
})
</script>
