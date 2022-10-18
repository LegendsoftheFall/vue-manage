<template>
    <div class="w-full flex flex-col h-max border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-800">
      <!-- Title -->
      <div class="flex items-center p-2 my-3">
        <span class="font-semibold text-gray-800 dark:text-white">标签排行</span>
        <svg class="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      </div>
      <!-- Tags -->
      <div v-for="tags in trendData" :key="tags.id" class=" w-full h-max px-4">
        <!-- Tag -->
        <a :href="`/n/${tags.id}`" v-if="!isLoading" class="flex rounded-lg justify-between items-center hover:bg-gray-300 dark:hover:bg-gray-700 py-2">
          <span class="text-sm tracking-wide ml-1 text-gray-600 dark:text-gray-200">{{tags.name}}</span>
          <span class="flex px-1 mr-1 tracking-tight rounded-full bg-slate-200 dark:bg-gray-600 text-xs text-gray-600 dark:text-white font-semibold">
            <p>+</p>
            {{tags.num}}
          </span>
        </a>
      </div>
      <TagsLoader v-if="isLoading"/>
      <div class="w-full h-max px-4">
        <!-- See More -->
        <a href="#" class="flex rounded-lg items-center hover:bg-gray-300 dark:hover:bg-gray-700 py-2">
          <span class="text-sm font-semibold ml-1 text-gray-900 dark:text-white">全部</span>
          <svg class="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </a>
      </div>
      <div class="w-full mt-12"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/model/model'
import TagsLoader from '@/components/loading/TagsLoader.vue'

export default defineComponent({
  name: 'TrendingTags',
  components: { TagsLoader },
  setup () {
    const store = useStore<GlobalDataProps>()
    // 挂载时发起请求
    onMounted(() => {
      store.dispatch('fetchTrendingTag') // 获取数据
    })

    const trendData = computed(() => store.state.trend) // 渲染页面

    const isLoading = computed(() => store.state.loading)
    return { trendData, isLoading }
  }
})
</script>
