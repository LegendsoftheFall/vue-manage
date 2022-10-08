<template>
    <!-- Navbar -->
    <header>
        <nav class="container mx-auto p-2">
            <!-- flex-container -->
            <div class="flex items-center justify-between">
                <!-- Logo -->
                <a href="http://localhost:8080/recommend" class="pt-2 flex justify-center items-center">
                    <img src="@/assets/icons/logo.svg" alt="">
                    <span class="font-black text-2xl tracking-tight font-mono">manage</span>
                </a>
                <!-- Search -->
                <div class="relative w-3/6 flex justify-center items-center rounded-full">
                    <form class="w-full flex items-center border-transparent" action="">
                        <img class="absolute ml-3" src="@/assets/icons/search.svg" alt="" />
                        <input class="w-full pr-3 pl-10 py-2 rounded-full border-none ring-2 ring-gray-300 focus:ring-blue-500
                        focus:ring-2 bg-gray-1 dark:bg-gray-700 dark:ring-0 dark:border dark:border-1 dark:border-gray-400" name="search"
                         type="text" placeholder="搜索文章/标签/社区">
                    </form>
                </div>
                <!-- Write -->
                <WriteButton/>
                <div class="flex justify-between items-center pl-4">
                    <!-- mode -->
                    <ToggleMode/>
                    <!-- Notice -->
                    <NoticeButton/>
                    <!-- avator -->
                    <UserAvator/>
                </div>
            </div>
        </nav>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WriteButton from '@/components/header/WriteButton.vue'
import NoticeButton from '@/components/header/NoticeButton.vue'
import ToggleMode from '@/components/header/ToggleMode.vue'
import UserAvator from '@/components/header/UserAvator.vue'

export default defineComponent({
  name: 'GlobalHeader',
  components: { WriteButton, NoticeButton, ToggleMode, UserAvator }
})
</script>
