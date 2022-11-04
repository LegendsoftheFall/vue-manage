<template>
  <div class="w-full flex items-center h-14 border dark:border-gray-700 rounded-t-lg bg-white dark:bg-gray-800">
    <!-- 精选 -->
    <button  v-for="docker in dockerList" :key="docker.icon"
    class="flex items-center">
        <router-link :to="{ name:docker.to }" @click="activeMenu = docker.index"
        :class="activeMenu === docker.index ? 'text-blue-400 bg-slate-100 dark:bg-gray-700': ''"
        class="flex items-center p-2 ml-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg ">
          <div v-html="docker.icon"></div>
          <p class="ml-1">{{docker.text}}</p>
        </router-link>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { dockerProps } from '@/model/model'

export default defineComponent({
  name: 'RecommendButton',
  setup () {
    const activeMenu = ref(0)
    const dockerList:dockerProps[] = [
      { index: 0, to: 'Rank', text: '排行', icon: '<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" /></svg>' },
      { index: 1, to: 'New', text: '最近', icon: '<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' },
      { index: 2, to: 'Selected', text: '精选', icon: '<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>' }
    ]

    return { activeMenu, dockerList }
  }
})
</script>
