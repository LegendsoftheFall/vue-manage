<template>
    <!-- Navbar -->
    <header class="dark:bg-gray-800">
        <nav class="container mx-auto p-2">
            <!-- flex-container -->
            <div class="flex items-center justify-between">
                <!-- Logo -->
                <a href="http://localhost:8080/recommend" class="pt-2 flex justify-center items-center">
                    <img src="@/assets/icons/logo.svg" alt="">
                    <span class="font-black text-2xl tracking-tight font-mono">manage</span>
                </a>
                <!-- Search -->
<<<<<<< HEAD
                <div class="w-3/6 flex items-center rounded-full">
                    <SearchBar/>
                </div>
                <div class="flex justify-between items-center">
                    <!-- Write -->
                    <WriteButton/>
                    <!-- mode -->
                    <ToggleMode class=" pl-4"/>
=======
                <div class="relative w-3/6 flex justify-center items-center rounded-full">
                    <form class="w-full flex items-center border-transparent" action="">
                        <img class="absolute ml-3" src="@/assets/icons/search.svg" alt="" />
                        <input class="w-full pr-3 pl-10 py-2 rounded-full border-none ring-2 ring-gray-300 focus:ring-blue-500
                        focus:ring-2 bg-gray-1 dark:bg-black dark:ring-0 dark:border dark:border-1 dark:border-gray-400" name="search"
                         type="text" placeholder="搜索文章/标签/社区">
                    </form>
                </div>
                <!-- Write -->
                <WriteButton/>
                <div class="flex justify-between items-center pl-4">
                    <!-- mode -->
                    <ToggleMode/>
>>>>>>> 8d7ae212e14904c7e89a97459b97f55e3b39a352
                    <!-- Notice -->
                    <NoticeButton/>
                    <!-- avator -->
                    <UserAvatar/>
                </div>
            </div>
        </nav>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WriteButton from '@/components/button/WriteButton.vue'
import NoticeButton from '@/components/button/NoticeButton.vue'
import ToggleMode from '@/components/button/ToggleMode.vue'
import UserAvatar from '@/components/header/UserAvatar.vue'
<<<<<<< HEAD
import SearchBar from '@/components/header/SearchBar.vue'

export default defineComponent({
  name: 'GlobalHeader',
  components: { WriteButton, NoticeButton, SearchBar, ToggleMode, UserAvatar }
=======

export default defineComponent({
  name: 'GlobalHeader',
  components: { WriteButton, NoticeButton, ToggleMode, UserAvatar }
>>>>>>> 8d7ae212e14904c7e89a97459b97f55e3b39a352
})
</script>
