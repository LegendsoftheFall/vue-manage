<template>
    <div class="flex">
        <!-- 写文章 -->
        <a href="/create/draft" class="relative flex items-center justify-center bg-blue-450 hover:bg-blue-500 focus:outline-none
        text-white rounded-l">
            <img class="pl-2" src="@/assets/icons/edit.svg" alt="edit">
            <p class="pr-4 pl-1 py-2">写文章</p>
        </a>
        <div class="border border-blue-400"></div>
        <button @click="isOpen = !isOpen" class="relative flex items-center justify-center bg-blue-450
         hover:bg-blue-500 focus:outline-none text-white rounded-r" ref="dropdownRef">
            <span class="p-2">
                <img src="@/assets/icons/icons8-walter-white.svg" alt="white"/>
            </span>
            <!-- 下拉菜单 -->
            <div v-if="isOpen" class="absolute z-10 right-0 top-full min-h-full w-max shadow-md rounded-lg overflow-hidden mt-2 ">
                <div class="text-left rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-800">
                    <div class="px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 border-b dark:border-b-gray-700">
                        <a href="#">
                           <div class="flex">
                            <svg class="w-6 h-6 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.048 8.287 8.287 0 0 0 9 9.6a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925 3.546 5.974 5.974 0 0 1-2.133-1A3.75 3.75 0 0 0 12 18z"/>
                            </svg>
                                <strong class="text-blue-450">写沸点</strong>
                            </div>
                            <span class="text-gray-700 dark:text-teal-400">分享你的新鲜事</span>
                        </a>
                    </div>
                    <div class="px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <a href="#">
                            <div class="flex">
                                <svg class="w-6 h-6 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                                </svg>
                                <strong class="text-blue-450">写笔记</strong>
                            </div>
                            <span class="text-gray-700 dark:text-teal-400">记录你的所思所想</span>
                        </a>
                    </div>
                </div>
            </div>
            <!-- <div class=" absolute w-5 h-5 bg-white border top-12 rotate-45 pointer-events-none"></div> -->
            </button>
            <!-- <button v-if="isOpen" @click="isOpen = false" class="fixed -z-10 inset-0 h-full w-full"></button> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useClickOutSide from '@/hooks/useClickOutSide'

export default defineComponent({
  name: 'WriteButton',
  setup () {
    const isOpen = ref(false)
    const dropdownRef = ref<null | HTMLElement>(null)
    const isClickOutSide = useClickOutSide(dropdownRef)

    watch(isClickOutSide, () => {
      if (isOpen.value && isClickOutSide.value) {
        isOpen.value = false
      }
    })
    return { isOpen, dropdownRef }
  }
})
</script>
