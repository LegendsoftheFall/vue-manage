<template>
    <div class="w-full sticky top-5 flex flex-col h-max border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-800">
        <div class="flex flex-col" v-for="item in dockerList" :key="item.icon" >
            <a :href="item.to"  :class="activeMenu === item.index ? 'border-r-2 border-r-blue-450' : ''"
             class="flex items-center mt-3 p-2 hover:bg-gray-300 dark:hover:bg-gray-700">
                <img class="w-6 h-6" :src="item.icon" alt="">
                <span :class="{'text-blue-450': activeMenu === item.index}" class="ml-2 font-semibold">{{item.text}}</span>
            </a>
        </div>
        <div class="mt-3"></div>
        <!-- 排行 -->
        <TrendingTags v-if="showTrending"/>
    </div>
    <div class="h-6 w-full"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import TrendingTags from '../trending/TrendingTags.vue'
import { dockerProps } from '@/model/model'

export default defineComponent({
  name: 'SideBar',
  components: { TrendingTags },
  props: {
    activeMenu: {
      type: Number,
      default: -1
    },
    showTrending: {
      type: Boolean,
      default: true
    }
  },
  setup () {
    const route = useRoute()
    const isRecommend = () => {
      return route.path === '/recommend'
    }

    const dockerList:dockerProps[] = [
      { icon: require('@/assets/icons/news.svg'), text: '推荐', to: '/recommend', index: 0 },
      { icon: require('@/assets/icons/maps.svg'), text: '探索', to: '/explore/hot', index: 1 },
      { icon: require('@/assets/icons/document.svg'), text: '草稿', to: '/drafts', index: 2 },
      { icon: require('@/assets/icons/bookmarklist.svg'), text: '书签', to: '/bookmarks', index: 3 }
    ]

    return { isRecommend, dockerList }
  }
})
</script>

<style>
    /* body{
        background-color: rgba(214, 216, 217, 0.89);
    } */
</style>
