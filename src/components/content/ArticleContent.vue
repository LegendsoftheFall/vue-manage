<template>
  <!-- 文章信息 -->
   <div class="container grid grid-cols-8 mx-auto h-full">
        <div class="col-span-1"></div>
        <div class="col-span-6">
          <div class="flex flex-col w-full items-center">
              <!-- 标题 -->
              <div class="mt-8 mb-8 w-full text-center px-6 font-bold text-5xl tracking-wide">
                <p>{{articleDetail?.article?.title}}</p>
              </div>
              <!-- 副标题 -->
              <div v-if="articleDetail?.article?.subtitle" class="mb-8 w-full text-center px-6 text-4xl text-gray-700 tracking-wide">
                <p>{{articleDetail?.article?.subtitle}}</p>
              </div>
              <!-- 作者信息 -->
              <div class="mb-4 flex w-full justify-center items-center">
                <!-- 头像昵称 -->
                <a :href="`/user/${articleDetail.userInfo?.userID}`" class="flex justify-center items-center">
                    <button class="block w-10 h-10 rounded-full overflow-hidden">
                        <img :src="articleDetail.userInfo?.avatar" alt="">
                    </button>
                    <span class="text-xl tracking-wide pl-2">{{articleDetail.userInfo?.username}}</span>
                </a>
                <!-- 日期 -->
                <div class="flex justify-center items-center">
                  <p class="mx-3 h-full">&#183;</p>
                  <p class="text-xl tracking-wide">{{articleDetail?.article?.format}}</p>
                </div>
                <!-- 阅读 -->
                <div class="flex justify-center items-center">
                  <p class="mx-3 h-full">&#183;</p>
                  <p class="text-xl tracking-wide">{{articleDetail?.article?.viewCount}} 阅读</p>
                </div>
                <!-- 更多 -->
                <div class="ml-3 border rounded-lg h-full" v-if="showEdit">
                  <EditButton/>
                </div>
              </div>
              <!-- 头图 -->
              <div v-if="articleDetail.article?.image" class="w-full h-150 my-10">
                <img class="w-full h-full object-cover" :src="articleDetail.article?.image" alt="">
              </div>
          </div>
        </div>
        <div class="col-span-1"></div>
   </div>
   <!-- 文章内容 -->
   <div  class="container grid grid-cols-8 gap-5 mx-auto h-full">
      <!-- 内容 -->
      <div class="col-span-1"></div>
      <div class="col-span-5">
        <v-md-editor :model-value="articleDetail.article?.markdown" mode="preview"></v-md-editor>
      </div>
      <div class="col-span-2">
        <div class="sticky top-70 mr-28 flex flex-col justify-center items-center">
          <!-- 点赞 -->
          <button @click="useClickLike" :class="{'text-blue-400': articleDetail.isLiked}" class="mt-14 p-2 flex justify-center items-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
            </svg>
            <p v-if="articleDetail?.article?.likes" class="pl-1">{{articleDetail?.article?.likes}}</p>
          </button>
          <!-- 评论 -->
          <a href="#"  class="mt-14 p-2 relative z-10 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            <span v-if="articleDetail?.article?.comments" class="absolute top-0 -right-1 flex border shadow-md rounded-full px-1 justify-center text-center text-sm font-semibold bg-white dark:text-black">
              {{articleDetail?.article?.comments}}
            </span>
          </a>
          <!-- 收藏 -->
          <button @click="useClickCollect" :class="{'bg-blue-200': articleDetail.isCollected}" class="mt-14 mb-14 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <svg v-if="!articleDetail.isCollected" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-bookmark-plus" viewBox="0 0 16 16">
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z"/>
            </svg>
            <svg v-if="articleDetail.isCollected" class="bi bi-bookmark-check text-blue-500" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
            </svg>
          </button>
        </div>
      </div>
      <!-- 功能 -->
   </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/model/model'
import EditButton from '@/components/button/EditButton.vue'
import { computed } from '@vue/reactivity'
import createToast from '@/hooks/useCreateToast'

export default defineComponent({
  name: 'ArticleContent',
  components: { EditButton },
  setup () {
    const isLike = ref(false)
    const isMark = ref(false)
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const id = route.params.id
    onMounted(() => {
      store.dispatch('fetchArticleDetailByID', id)
    })

    const userID = computed(() => store.state.user.id)
    const uid = userID.value

    const articleDetail = computed(() => {
      if (store.state.articleDetail.userInfo?.avatar === '') {
        store.state.articleDetail.userInfo.avatar = require('@/assets/image/avator.svg')
      }
      return store.state.articleDetail
    })

    const showEdit = computed(() => {
      const { isLogin, id } = store.state.user
      if (isLogin && articleDetail.value && articleDetail.value.userInfo && articleDetail.value.userInfo.userID) {
        const authorID = articleDetail.value.userInfo.userID
        return authorID === id
      } else {
        return false
      }
    })

    const useClickLike = () => {
      if (uid === '') {
        createToast('error', '登录后才能点赞哦！')
      } else {
        store.dispatch('likeArticle', { aid: id, uid: uid }).then(() => {
          store.commit('setLikeMode')
        })
      }
    }

    const useClickCollect = () => {
      if (uid === '') {
        createToast('error', '登录后才能收藏哦！')
      } else {
        store.dispatch('collectArticle', { aid: id, uid: uid }).then(() => {
          store.commit('setCollectMode')
        })
      }
    }

    return { isLike, isMark, articleDetail, showEdit, useClickLike, useClickCollect }
  }
})
</script>

<style scoped>
</style>
