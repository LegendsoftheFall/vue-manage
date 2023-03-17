<template>
  <div v-for="article in articleList" :key="article.articleInfo.id"
    class="w-full flex flex-col p-4 items-center h-66 border dark:border-gray-700 border-t-0 bg-white dark:bg-gray-800">
        <!-- Author -->
        <div class="flex w-full h-10">
          <!-- Avatar -->
          <div class="w-11">
              <div class="h-10 w-10 rounded-full overflow-hidden">
              <a :href="`/user/${article.articleInfo.authorID}`" target="_blank">
                  <img :src="article.avatar" alt="avator">
              </a>
              </div>
          </div>
          <!-- detail -->
          <div class="w-7/12">
              <div class="pl-3">
                <div class="font-semibold">
                  <a :href="`/user/${article.articleInfo.authorID}`" target="_blank">
                  {{article.authorName}}
                  </a>
                </div>
                <div class="text-gray-500 text-sm">
                  <a :href="`/user/${article.articleInfo.authorID}`" target="_blank">
                  {{article.articleInfo.format}}
                  </a>
                </div>
              </div>
          </div>
          <!-- Other -->
          <div class="w-4/12"></div>
        </div>
        <!-- Article -->
        <div class="flex justify-between w-full h-38 mt-2">
          <div :class="{'w-7/12': article.articleInfo.image, 'w-full': !article.articleInfo.image}" class="mt-1 mr-3 text-gray-900">
              <p class="font-bold text-xl mb-1 break-words h-max line-clamp-2 dark:text-white">
              <a :href="`/article/${article.articleInfo.id}`" target="_blank">{{article.articleInfo.title}}</a>
              </p>
              <p class="line-clamp-4 break-words mt-2 text-sm text-gray-600 dark:text-gray-500">
              <a :href="`/article/${article.articleInfo.id}`" target="_blank">
                <span v-if="article.articleInfo.subtitle" target="_blank">{{article.articleInfo.subtitle}} &#183; </span>
                {{article.articleInfo.content}}
              </a>
              </p>
          </div>
          <!-- Picture -->
          <a v-if="article.articleInfo.image" :href="`/article/${article.articleInfo.id}`" target="_blank" class="w-4/12">
              <div class="h-4/5">
              <img class="w-full h-full rounded-lg border dark:border-gray-700 object-cover" :src="article.articleInfo.image" alt="image">
              </div>
          </a>
        </div>
        <!-- Icons -->
        <div class="w-full flex justify-between items-center">
        <!-- Left -->
        <div class="flex items-center">
            <!-- bookmark -->
            <div @click.prevent="useClickCollect(article.articleInfo.id)" class="ml-1">
            <button :class="{'bg-blue-200 dark:bg-blue-800': article.articleInfo.isCollected}" class="rounded-full p-2 hover:bg-gray-400 dark:hover:bg-gray-700">
                <svg v-if="!article.articleInfo.isCollected" class="bi bi-bookmark-plus text-gray-700 dark:text-white"  xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                  <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z"/>
                </svg>
                <svg v-if="article.articleInfo.isCollected" class="bi bi-bookmark-check text-blue-500 dark:text-white" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                </svg>
            </button>
            </div>
            <!-- tags -->
            <div v-if="article.articleInfo.tags.length>0" class="ml-2 flex items-center">
            <template v-for="tags in article.articleInfo.tags.slice(0,2)" :key="tags">
                <a :href="`/n/${tags.id}`" target="_blank" class="ml-1">
                <div class="p-1 border dark:border-gray-700 rounded-md hover:bg-gray-300">
                    <p class="text-xs text-gray-600">{{tags.name}}</p>
                </div>
                </a>
            </template>
            </div>
            <!-- more -->
            <div v-if="article.articleInfo.tags.length>2"  class="flex items-center">
            <a :href="`/article/${article.articleInfo.id}`" target="_blank" class="ml-1">
                <div class="p-1 border dark:border-gray-700 rounded-md hover:bg-gray-300">
                <p class="text-xs text-gray-600">+{{article.articleInfo.tags.length - 2}}</p>
                </div>
            </a>
            </div>
        </div>
        <!-- Right -->
        <div class="flex items-center">
            <!-- view -->
            <div class="flex items-center mr-2 p-1">
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p class="text-xs text-gray-800 dark:text-white ml-1">{{article.articleInfo.viewCount}}</p>
            </div>
            <!-- like -->
            <a v-if="article.articleInfo.likes > 0" :class="{'text-blue-400': article.articleInfo.isLiked}" :href="`/article/${article.articleInfo.id}`" target="_blank"
            class="flex items-center mr-2 p-1 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md">
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
            </svg>
            <p :class="{'text-blue-400': article.articleInfo.isLiked, 'text-gray-800': !article.articleInfo.isLiked}"
            class="text-xs ml-1">{{article.articleInfo.likes}}</p>
            </a>
            <!-- comment -->
            <a v-if="article.articleInfo.comments > 0" :href="`/article/${article.articleInfo.id}`" target="_blank"
            class="flex items-center p-1 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md">
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
            <p class="text-xs text-gray-800 dark:text-white ml-1">{{article.articleInfo.comments}}</p>
            </a>
        </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/model/model'
import useScrollLoad from '@/hooks/useScrollLoad'

export default defineComponent({
  name: 'TagArticle',
  setup () {
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const tagID = route.params.id
    const currentUserID = computed(() => store.state.user.id)
    const uid = currentUserID.value
    const total = computed(() => store.state.total)

    onMounted(() => {
      store.dispatch('fetchTagArticleByIDOnce', { page: 1, size: 10, id: tagID })
      store.commit('setRequestMode', true)
      store.commit('setLoadMode', true)
    })

    const articleList = computed(() => {
      return store.state.articleInfo.map(article => {
        // 没有头像
        if (!article.avatar) {
          article.avatar = require('@/assets/image/avator.svg')
        }
        return article
      })
    })

    const useClickCollect = (aid: string) => {
      store.dispatch('collectArticle', aid).then(() => {
        store.commit('changeCollectMode', aid)
      })
    }

    useScrollLoad('fetchTagArticleByID', total, { page: 2, size: 10, id: tagID as string })

    return { articleList, useClickCollect }
  }
})
</script>
