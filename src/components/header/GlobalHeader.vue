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
                <div class="w-3/6 flex items-center rounded-full">
                    <SearchBar/>
                </div>
                <div class="flex justify-between items-center">
                    <!-- Write -->
                    <WriteButton/>
                    <!-- mode -->
                    <ToggleMode class=" pl-4"/>
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
import SearchBar from '@/components/header/SearchBar.vue'

export default defineComponent({
  name: 'GlobalHeader',
  components: { WriteButton, NoticeButton, SearchBar, ToggleMode, UserAvatar }
})
</script>
