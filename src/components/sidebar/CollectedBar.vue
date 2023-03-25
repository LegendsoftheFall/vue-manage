<template>
    <div class="w-full flex flex-col mb-5 h-32 p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
        <div class="text-lg font-bold flex justify-between">
            <div>最近的收藏&#40;{{total || 0}}&#41;</div>
            <a href="/bookmarks" class="py-1 px-3 border rounded-md hover:bg-gray-3 hover:text-black">全部</a>
        </div>
        <div class="mt-2 flex flex-col" v-for="article in articleList.slice(0,1)" :key="article.articleInfo.id">
            <a :href="`/article/${article.articleInfo.id}`" target="_blank" class="text-blue-400 truncate font-bold">{{article.articleInfo.title}}</a>
            <a :href="`/user/${article.articleInfo.authorID}`" target="_blank" class="mt-1">{{article.authorName}}</a>
        </div>
        <div v-if="articleList?.length === 0" class="p-2 mt-2 flex justify-center items-center">这里什么都没有👋</div>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/model/model'

export default defineComponent({
  name: 'BookMarkList',
  setup () {
    const store = useStore<GlobalDataProps>()
    const total = computed(() => store.state.bookmarkTotal)
    onMounted(() => {
      store.dispatch('fetchCollectedBar')
    })

    const articleList = computed(() => {
      return store.state.collectedBar.map(article => {
        // 没有头像
        if (!article.avatar) {
          article.avatar = require('@/assets/image/avator.svg')
        }
        return article
      })
    })

    return { articleList, total }
  }
})
</script>
