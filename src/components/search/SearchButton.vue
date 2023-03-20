<template>
  <div class="w-full flex items-center h-14 border dark:border-gray-700 rounded-t-lg bg-white dark:bg-gray-800">
    <!-- 精选 -->
    <button  v-for="docker in dockerList" :key="docker.icon"
    class="flex items-center">
        <router-link :to="{ name:docker.to, query: {q: query} }" @click="activeMenu = docker.index"
        :class="activeMenu === docker.index ? 'text-blue-400 bg-slate-100 dark:bg-gray-700': ''"
        class="flex items-center p-2 ml-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg ">
          <div v-html="docker.icon"></div>
          <p class="ml-1">{{docker.text}}</p>
        </router-link>
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { dockerProps, GlobalDataProps } from '@/model/model'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'RecommendButton',
  setup () {
    const store = useStore<GlobalDataProps>()
    const query = computed(() => store.state.key)
    console.log(query.value)
    const activeMenu = ref(0)
    const route = useRoute()
    if (route.path.includes('hot')) {
      activeMenu.value = 0
    }
    if (route.path.includes('latest')) {
      activeMenu.value = 1
    }
    if (route.path.includes('tag')) {
      activeMenu.value = 2
    }
    if (route.path.includes('user')) {
      activeMenu.value = 3
    }
    const dockerList:dockerProps[] = [
      { index: 0, to: 'HotSearch', text: '排行', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" /></svg>' },
      { index: 1, to: 'LatestSearch', text: '最近', icon: '<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' },
      { index: 2, to: 'TagSearch', text: '标签', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" /></svg>' },
      { index: 3, to: 'UserSearch', text: '用户', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>' }
    ]

    return { activeMenu, dockerList, query }
  }
})
</script>
