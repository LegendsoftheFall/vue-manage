<template>
    <!-- 评论区 -->
    <div class="w-full px-6  border rounded-lg">
        <div class="pt-5 text-2xl font-bold mb-5">评论</div>
        <!-- 发表评论 -->
        <div class="w-full flex mb-3">
            <!-- 头像 -->
            <div class="">
                <button class="block w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img v-if="UserInfo.isLogin" :src="UserInfo.avatar === '' ? require('@/assets/image/avator.svg') : UserInfo.avatar" alt="">
                    <img v-if="!UserInfo.isLogin" src="@/assets/image/avator.svg" alt="Vistor avator">
                </button>
            </div>
            <!--  评论区 -->
            <div class="w-full">
                <textarea type="text" class="textInput" placeholder="输入评论" v-model="comContent"/>
                <div class="mt-2 flex justify-between">
                    <div></div>
                    <button @click="publishComment" class="flex justify-center items-center px-4 py-2 rounded-md border dark:border-gray-700 bg-blue-450 hover:bg-blue-400">
                      <p v-if="submitStatus === 'ready'" class="text-white tracking-wider">发布评论</p>
                      <span v-if="submitStatus === 'uploading'" class="flex justify-center items-center text-white tracking-wider">
                        <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                        </svg>
                        <p class="pl-1">发布中...</p>
                      </span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- 评论列表 -->
    <div v-if="total > 0" class="w-full px-6 pb-6 border rounded-lg mt-4">
      <!-- 全部评论 -->
      <div class="flex justify-between">
        <div class="pt-5 mb-5"><span class="text-2xl font-bold ">全部评论 {{total}}</span></div>
        <div></div>
      </div>
      <!-- 评论列表区 -->
      <div class="comment box-border">
        <div class="comment-list flex flex-col" v-for="comment in commentList" :key="comment.comment_id">
          <div class="comment-item flex py-3">
            <!-- 头像 -->
            <div>
              <button class="block w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img :src="comment.user_info.avatar === '' ? require('@/assets/image/avator.svg') : comment.user_info.avatar" alt="">
              </button>
            </div>
            <!-- 内容 -->
            <div class="comment-content w-full">
              <!-- 用户信息 -->
              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <div class="">{{comment.user_info.username}}</div>
                  <div class="ml-4 text-slate-500"><span>{{comment.user_info.position}}</span></div>
                </div>
                <div class=" text-slate-500"><span>{{comment.comment_info.format}}</span></div>
              </div>
              <!-- 评论内容 -->
              <div class="mt-3 text-sm text-slate-700"><span>{{comment.comment_info.content}}</span></div>
              <!-- 点赞回复 -->
              <div class="mt-3 flex">
                <!-- <div class="like mr-4">
                  <button :class="{'text-blue-400': comment.comment_info.is_like}" class="flex justify-center items-center rounded-full hover:text-blue-400">
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                    </svg>
                    <p v-if="comment.comment_info.is_like" class="pl-1 text-sm">{{comment.comment_info.likes}}</p>
                    <p v-if="!comment.comment_info.is_like" class="pl-1 text-sm">点赞</p>
                  </button>
                </div> -->
                <div class="comment mr-4">
                  <button @click="dropDownClick(comment.comment_info.comment_id)"  class="flex justify-center items-center rounded-full hover:text-blue-400">
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                    <p v-if="!comment.comment_info.is_click && comment.comment_info.reply_count !== 0" class="pl-1 text-sm">{{comment.comment_info.reply_count}}</p>
                    <p v-if="!comment.comment_info.is_click && comment.comment_info.reply_count === 0"  class="pl-1 text-sm">回复</p>
                    <p v-if="comment.comment_info.is_click"  class="pl-1 text-sm">取消回复</p>
                  </button>
                </div>
              </div>
              <!--  评论区 -->
              <div v-if="comment.comment_info.is_click" class="w-full mt-2">
                  <textarea type="text" class="textInput" :placeholder='`回复${comment.user_info.username}...`' v-model="repContent"/>
                  <div class="mt-2 flex justify-between">
                      <div></div>
                      <button @click="publicReply(comment.comment_info.comment_id)" class="flex justify-center items-center px-4 py-2 rounded-md border dark:border-gray-700 bg-blue-450 hover:bg-blue-400">
                        <p v-if="submitStatus === 'ready'" class="text-white tracking-wider">发布</p>
                        <span v-if="submitStatus === 'uploading'" class="flex justify-center items-center text-white tracking-wider">
                          <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                          </svg>
                          <p class="pl-1">发布中...</p>
                        </span>
                      </button>
                  </div>
              </div>
              <!-- 回复列表 -->
              <div v-if="comment.comment_info.reply_count !== 0" class="reply mt-2 p-3 bg-gray-1 rounded-lg">
                <div class="comment-list flex flex-col" v-for="reply in comment.reply_infos" :key="reply.reply_id">
                  <div class="comment-item flex py-3">
                     <!-- 头像 -->
                      <div>
                        <button class="block w-7 h-7 rounded-full overflow-hidden mr-3">
                              <img :src="reply.user_info.avatar === '' ? require('@/assets/image/avator.svg') : reply.user_info.avatar" alt="">
                        </button>
                      </div>
                      <!-- 回复内容 -->
                      <div class="reply-content w-full">
                        <!-- 用户信息 -->
                          <!-- 根评论的回复 -->
                          <div v-if="reply.reply_info.level === 1" class="flex justify-between items-center">
                            <div class="flex items-center">
                              <div class="">{{reply.user_info.username}}</div>
                              <div class="ml-4 text-slate-500"><span>{{reply.user_info.position}}</span></div>
                            </div>
                            <div class=" text-slate-500"><span>{{reply.reply_info.format}}</span></div>
                          </div>
                          <!-- 回复评论的回复 -->
                          <div v-if="reply.reply_info.level === 2" class="flex justify-between items-center">
                            <div class="flex items-center">
                              <div class="">{{reply.user_info.username}}</div>
                              <div class="ml-4 text-slate-500">回复</div>
                              <div class="ml-4"><span>{{reply.reply_user.username}}</span></div>
                            </div>
                            <div class=" text-slate-500"><span>{{reply.reply_info.format}}</span></div>
                          </div>
                          <!-- 回复内容 -->
                          <div class="mt-3 text-sm text-slate-700"><span>{{reply.reply_info.reply_content}}</span></div>
                          <!-- 回复的目标内容 -->
                          <div v-if="reply.reply_info.level === 2" class="mt-1 px-4 py-1 flex border rounded-md bg-gray-3 text-center">
                            <div class="text-slate-500">"</div>
                            <div class="text-slate-500 text-sm truncate">{{reply.parent_reply.reply_content.substring(0,20)}}</div>
                            <div class="text-slate-500"><span v-if="reply.parent_reply.reply_content.length > 20">...</span> "</div>
                          </div>
                          <!-- 点赞回复 -->
                          <div class="mt-3 flex">
                            <!-- <div class="like mr-4">
                              <button :class="{'text-blue-400': reply.reply_info.is_like}" class="flex justify-center items-center rounded-full hover:text-blue-400">
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                                </svg>
                                <p v-if="reply.reply_info.is_like" class="pl-1 text-sm">{{reply.reply_info.likes}}</p>
                                <p v-if="!reply.reply_info.is_like" class="pl-1 text-sm">点赞</p>
                              </button>
                            </div> -->
                            <div class="comment mr-4">
                              <button @click="dropDownClick(reply.reply_info.reply_id)"  class="flex justify-center items-center rounded-full hover:text-blue-400">
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                </svg>
                                <p v-if="!reply.reply_info.is_click" class="pl-1 text-sm">回复</p>
                                <p v-if="reply.reply_info.is_click" class="pl-1 text-sm">取消回复</p>
                              </button>
                            </div>
                          </div>
                          <!--  回复评论区 -->
                          <div v-if="reply.reply_info.is_click" class="w-full mt-2">
                              <textarea type="text" class="textInput" :placeholder='`回复${reply.user_info.username}...`' v-model="repContent"/>
                              <div class="mt-2 flex justify-between">
                                  <div></div>
                                  <button @click="publicReply(reply.reply_info.reply_id)" class="flex justify-center items-center px-4 py-2 rounded-md border dark:border-gray-700 bg-blue-450 hover:bg-blue-400">
                                    <p v-if="submitStatus === 'ready'" class="text-white tracking-wider">发布</p>
                                    <span v-if="submitStatus === 'uploading'" class="flex justify-center items-center text-white tracking-wider">
                                      <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                                      </svg>
                                      <p class="pl-1">发布中...</p>
                                    </span>
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { GlobalDataProps, UploadStatus } from '@/model/model'
import createToast from '@/hooks/useCreateToast'
export default defineComponent({
  name: 'GlobalComment',
  setup () {
    const route = useRoute()
    const aid = route.params.id
    const store = useStore<GlobalDataProps>()
    const UserInfo = computed(() => store.state.user)
    const commentList = computed(() => store.state.commentList)
    const total = computed(() => store.state.total)
    const comContent = ref('')
    const repContent = ref('')
    const order = ref(true)
    watch(() => comContent.value, () => {
      console.log(comContent.value)
    })
    watch(() => repContent.value, () => {
      console.log(repContent.value)
    })
    // 获取评论列表
    onMounted(() => {
      store.dispatch('fetchCommentList', { page: 1, size: 10, order: order.value ? 'time' : 'score', item: aid }).then((res) => {
        console.log('获取的评论列表数据', res)
      })
    })
    // 发布评论
    const submitStatus = ref<UploadStatus>('ready')
    const publishComment = () => {
      if (UserInfo.value.id === '') {
        createToast('error', '登录后才能评论哦！')
      } else if (comContent.value === '') {
        createToast('error', '不能发表空评论！')
      } else {
        const sendData = {
          itemType: 2,
          userID: UserInfo.value.id,
          itemID: aid,
          content: comContent.value
        }
        submitStatus.value = 'uploading'
        store.dispatch('publishComment', sendData).then(() => {
          submitStatus.value = 'ready'
          // 获取评论列表
          store.dispatch('fetchCommentList', { page: 1, size: 10, order: order.value ? 'time' : 'score', item: aid }).then((res) => {
            console.log('获取的评论列表数据', res)
          })
        }).catch(() => {
          submitStatus.value = 'uploading'
          createToast('error', '发布失败,服务器繁忙')
        }).finally(() => {
          submitStatus.value = 'ready'
          comContent.value = ''
        })
      }
    }
    // 回复评论
    const publicReply = (toCommentID: string) => {
      if (UserInfo.value.id === '') {
        createToast('error', '登录后才能评论哦！')
      } else if (repContent.value === '') {
        createToast('error', '不能发表空评论！')
      } else {
        console.log('点击获取到的回复评论ID', toCommentID)
        const sendData = {
          itemType: 1,
          userID: UserInfo.value.id,
          itemID: aid,
          content: repContent.value,
          toCommentID: toCommentID
        }
        submitStatus.value = 'uploading'
        store.dispatch('publishComment', sendData).then(() => {
          submitStatus.value = 'ready'
          // 获取评论列表
          setTimeout(() => {
            store.dispatch('fetchCommentList', { page: 1, size: 10, order: order.value ? 'time' : 'score', item: aid }).then((res) => {
              console.log('获取的评论列表数据', res)
            })
          }, 1000)
        }).catch(() => {
          submitStatus.value = 'uploading'
          createToast('error', '发布失败,服务器繁忙')
        }).finally(() => {
          submitStatus.value = 'ready'
          repContent.value = ''
        })
      }
    }
    // 点击事件
    const dropDownClick = (id: string) => {
      console.log('dropDownClick')
      store.commit('setDropDownComment', id)
      repContent.value = ''
    }
    return { UserInfo, comContent, repContent, publishComment, publicReply, submitStatus, commentList, total, dropDownClick }
  }
})
</script>
