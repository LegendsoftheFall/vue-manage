<template>
  <a :href="`/article/${article.articleInfo.id}`" target="_blank" v-for="article in articleList" :key="article.articleInfo.id"
    class="w-full flex flex-col p-4 hover:bg-gray-3 dark:hover:bg-gray-700 cursor-pointer items-center h-48 border dark:border-gray-700 border-t-0 bg-white dark:bg-gray-800">
        <!-- Article -->
        <div class="flex justify-between w-full h-38 mt-2">
          <div :class="{'w-7/12': article.articleInfo.image, 'w-full': !article.articleInfo.image}" class="mt-1 mr-3 text-gray-900">
              <p class="font-bold text-3xl mb-1 break-words h-max line-clamp-2 dark:text-white">
                {{article.articleInfo.title}}
              </p>
              <!-- Author -->
                <div class="flex w-full h-10">
                <!-- detail -->
                <div class="w-full">
                    <div>
                        <div class="mt-3 text-xl">
                            {{article.authorName}}
                        </div>
                        <div class="text-gray-500 flex mt-5">
                            {{article.articleInfo.format}}
                        <p class="mx-2 h-full">&#183;</p>
                            {{article.articleInfo.viewCount}} 浏览量
                        <p class="mx-2 h-full">&#183;</p>
                        <div v-if="article.articleInfo.tags.length>0" class="ml-2 flex items-center">
                        <template v-for="(item, index) in article.articleInfo.tags.slice(0,2)" :key="index">
                                <p class="text-gray-600">{{item.name}}</p>
                                <p v-if="index !== article.articleInfo.tags.slice(0,2).length-1" class="mx-1">/</p>
                        </template>
                        </div>
                        </div>
                    </div>
                </div>
                </div>
          </div>
          <!-- Picture -->
          <a v-if="article.articleInfo.image" :href="`/article/${article.articleInfo.id}`" target="_blank" class="w-5/12">
              <div class="h-full">
              <img class="w-full h-full rounded-lg border dark:border-gray-700 object-cover" :src="article.articleInfo.image" alt="image">
              </div>
          </a>
        </div>
    </a>
    <!-- end -->
    <div v-if="articleList.length === 0" class="mt-10 pb-20 justify-center items-center text-center">
        <span class="text-2xl font-bold tracking-wide">糟糕！未找到结果, 请尝试新的关键字.</span>
        <img class="mt-10" :src="require('@/assets/image/bored.png')" alt="">
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/model/model'
import useScrollLoad from '@/hooks/useScrollLoad'

export default defineComponent({
  name: 'SearchLatestArticle',
  setup () {
    const store = useStore<GlobalDataProps>()
    const currentUserID = computed(() => store.state.user.id)
    const uid = currentUserID.value
    const total = computed(() => store.state.total)
    const key = computed(() => store.state.key)

    onMounted(() => {
      store.dispatch('searchArticleListOnce', { page: 1, size: 10, category: 'latest', key: key.value })
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

    useScrollLoad('searchArticleList', total, { page: 2, size: 10, category: 'latest', key: key.value })

    return { articleList }
  }
})
</script>
