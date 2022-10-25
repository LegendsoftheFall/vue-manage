<template>
    <!-- 个人信息 -->
    <div class="container mx-auto px-32 py-10">
        <div class="flex flex-col justify-center items-center h-64">
            <!-- 头像 -->
            <a :href="`/user/${userInfo.userID}`" class="h-32 w-32 rounded-full overflow-hidden">
                <img :src="userInfo.avatar" alt="">
            </a>
            <!-- 信息 -->
            <div class="flex flex-col w-full h-1/2 justify-center items-center text-center">
                <a :href="`/user/${userInfo.userID}`" class="h-1/2">
                    <p class="pt-3 font-big text-2xl">{{userInfo.username}}</p>
                </a>
                <p class="text-gray-600">{{userInfo.follower}} 关注者</p>
                <!-- 简介 -->
                <div class="w-full h-1/2">
                    <p class="pt-3">{{userInfo.introduction}}</p>
                </div>
            </div>
        </div>
    </div>
    <!-- 文章列表 -->
    <div class="container mx-auto mt-4 px-32">
        <div class="flex flex-col justify-center items-center">
            <div v-for="article in articleList" :key="Number(article.id)" class="w-full h-max mb-16 px-16 flex justify-between">
                <!-- left -->
                <div :class="{'w-7/12': article.image, 'w-full': !article.image}" class="flex flex-col h-full">
                    <div class="h-max">
                        <a :href="`/article/${article.id}`">
                            <p class="break-words font-big text-2xl tracking-wider line-clamp-2">{{article.title}}</p>
                        </a>
                    </div>
                    <div class="h-1/4 flex py-3 text-gray-600">
                        <a :href="`/article/${article.id}`"> <p>{{article.format}}</p> </a>
                        <p class="px-2">&#183;</p>
                        <div class="flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart" viewBox="0 0 16 16">
                                <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z"/>
                            </svg>
                            <p class="px-2">{{article.viewCount}} 阅读</p>
                        </div>
                    </div>
                    <div class="h-max line-clamp-2 break-words">
                        <a :href="`/article/${article.id}`">
                            <span v-if="article.subtitle">{{article.subtitle}} &#183;</span>
                            {{article.content.substring(0,180)}}
                        </a>
                    </div>
                </div>
                <!-- right -->
                <div v-if="article.image" class="h-full w-5/12">
                    <div class="h-1/2 w-3/4 float-right">
                        <a :href="`/article/${article.id}`">
                            <img class="w-full h-40 rounded-lg object-cover border dark:border-transparent" :src="article.image" alt="">
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- loading -->
        <LoadingButton class="my-5" @click="loadMorePage" v-if="!isLastPage"/>
    </div>
    <!-- end -->
    <div class="container mx-auto mt-10 pb-20 justify-center items-center text-center" v-if="isLastPage">
        <span class="text-2xl font-semibold tracking-wide">到底啦！👋</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/model/model'
import { computed } from '@vue/reactivity'
import LoadingButton from '@/components/button/LoadingButton.vue'
import useLoadMore from '@/hooks/useLoadMore'

export default defineComponent({
  name: 'HomeContent',
  components: { LoadingButton },
  setup () {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const total = computed(() => store.state.total)
    const id = route.params.id

    onMounted(() => {
      store.dispatch('fetchUserHomeByID', id)
      store.commit('addHomePage')
    })

    const articleList = computed(() => store.state.homeArticleInfo)
    const userInfo = computed(() => {
      if (store.state.userInfo?.avatar === '') {
        store.state.userInfo.avatar = require('@/assets/image/avator.svg')
      }
      return store.state.userInfo
    })

    const { loadMorePage, isLastPage } = useLoadMore('fetchUserHomeByID', total, id as string)

    return { articleList, userInfo, loadMorePage, isLastPage }
  }
})
</script>
