<template>
    <div class="w-full flex flex-col h-max border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-800">
        <a href="#" class="flex items-center mt-3 p-2 hover:bg-gray-300 dark:hover:bg-gray-700">
            <img class="w-6 h-6" src="../assets/icons/news.svg" alt="">
            <span class="ml-2 font-semibold text-blue-450">推荐</span>
        </a>
        <a href="#" class="flex items-center mt-3 p-2 hover:bg-gray-300 dark:hover:bg-gray-700">
            <img class="w-6 h-6" src="../assets/icons/maps.svg" alt="">
            <span class="ml-2 font-semibold text-gray-800 dark:text-white">发现</span>
        </a>
        <a href="#" class="flex items-center mt-3 p-2 hover:bg-gray-300 dark:hover:bg-gray-700">
            <img class="w-6 h-6" src="../assets/icons/document.svg" alt="">
            <span class="ml-2 font-semibold text-gray-800 dark:text-white">草稿</span>
        </a>
        <a href="#" class="flex items-center mt-3 mb-3 p-2 hover:bg-gray-300 dark:hover:bg-gray-700">
            <img class="w-6 h-6" src="../assets/icons/bookmarklist.svg" alt="">
            <span class="ml-2 font-semibold text-gray-800 dark:text-white">书签</span>
        </a>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SideBar'
})
</script>

<style>
    /* body{
        background-color: rgba(214, 216, 217, 0.89);
    } */
</style>
