<template>
    <div class="col-span-8 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
      <div class="p-7 flex">
        <div class="w-1/2 pr-5 flex flex-col">
          <span class="font-semibold tracking-wide text-lg mb-5">基本资料</span>
          <!-- 用户名 -->
          <div class="mb-5">
            <label class="font-light inline-block mb-1">用户名</label>
            <input type="text" class="textInput" maxlength="40" placeholder="填写你的用户名" v-model="profileVal.profile.username">
          </div>
          <!-- 头像 -->
          <div class="mb-5">
            <label class="font-light inline-block mb-1">头像</label>
            <!-- 上传头像 -->
            <AvatarUploader v-if="!profile.avatar" action="/api/upload" :before-upload="uploadCheck" @file-uploaded-error="OnFileUploadedError" />
            <!-- 有头像或需要上传 -->
            <div v-if="profile.avatar" class="w-40 h-40 flex relative justify-center items-center">
              <a :herf="profile.avatar" target="_blank" class="w-full h-full block rounded-full overflow-hidden shadow-md">
                <img class="block" :src="profile.avatar" alt="">
              </a>
              <button @click="removeAvatar" class="absolute top-0 right-0 w-8 h-8 rounded-full flex justify-center items-center bg-white border dark:border-gray-700">
                <svg class="w-5 h-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          </div>
          <!-- 所在地 -->
          <div class="mb-5">
            <label class="font-light inline-block mb-1">所在地</label>
            <input type="text" class="textInput" placeholder="广东, 深圳" v-model="profileVal.profile.location">
          </div>
          <!-- 公司 -->
          <div class="mb-5">
            <label class="font-light inline-block mb-1">公司</label>
            <input type="text" class="textInput" placeholder="填写你的公司" v-model="profileVal.profile.company">
          </div>
          <!-- 职位 -->
          <div class="mb-5">
            <label class="font-light inline-block mb-1">职位</label>
            <input type="text" class="textInput" placeholder="软件工程师..." v-model="profileVal.profile.position">
          </div>
          <!-- 更新 -->
          <div class="my-10">
            <button @click="update" class="flex justify-center items-center px-4 py-3 w-1/3 rounded-md shadow-md border dark:border-gray-700 bg-blue-450 hover:bg-blue-400">
              <p v-if="submitStatus === 'ready'" class="text-white tracking-wider">更新</p>
              <span v-if="submitStatus === 'uploading'" class="flex justify-center items-center text-white tracking-wider">
                <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                </svg>
                <p class="pl-1">更新中...</p>
              </span>
            </button>
          </div>
        </div>
        <div class="w-1/2 flex flex-col">
          <span class="font-semibold tracking-wide text-lg mb-5">关于你</span>
          <!-- 个人介绍 -->
          <div class="mb-2">
            <label class="font-light inline-block mb-1">个人介绍</label>
            <textarea type="text" rows="10" class="textInput" maxlength="255" placeholder="我是一个开发者来自..." v-model="profileVal.profile.introduction" />
          </div>
          <!-- 个人网站 -->
          <div class="mb-5">
            <label class="font-light inline-block mb-1">个人网站</label>
            <input type="text" class="textInput" placeholder="填写你的个人网站" v-model="profileVal.profile.homePage">
          </div>
          <!-- Github -->
          <div class="mb-5">
            <label class="font-light inline-block mb-1">Github URL</label>
            <input type="text" class="textInput" placeholder="填写你的Github" v-model="profileVal.profile.github">
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps, UploadStatus } from '@/model/model'
import AvatarUploader from '../upload/AvatarUploader.vue'
import createToast from '@/hooks/useCreateToast'
import { beforeUploadCheck } from '@/hooks/helper'

const uploadCheck = (file: File) => {
  const result = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'], size: 1 })
  const { passed, error } = result
  if (error === 'format') {
    createToast('warning', '上传图片只能是JPG或PNG格式')
  }
  if (error === 'size') {
    createToast('warning', '上传图片不能超过1M')
  }

  return passed
}

export default defineComponent({
  name: 'ProfileSetting',
  components: { AvatarUploader },
  setup () {
    // 定义上传失败的事件函数
    const OnFileUploadedError = () => {
      createToast('error', '上传失败,服务器繁忙')
    }

    const removeAvatar = () => {
      profileVal.profile.avatar = ''
      // 更新图片
      store.commit('setProfileAvatar', '')
    }

    const store = useStore<GlobalDataProps>()
    const profileVal = reactive({
      profile: {
        username: '',
        avatar: '',
        location: '',
        company: '',
        position: '',
        introduction: '',
        homePage: '',
        github: ''
      }
    })

    onMounted(() => {
      store.dispatch('fetchUserProfile').then(() => {
        profileVal.profile = { ...store.state.userProfile }
      })
    })
    const profile = computed(() => store.state.userProfile)
    const submitStatus = ref<UploadStatus>('ready')
    const update = () => {
      const { username, location, company, position, introduction, homePage, github } = profileVal.profile
      const sendData = {
        username: username,
        avatar: profile.value.avatar,
        location: location,
        company: company,
        position: position,
        introduction: introduction,
        homePage: homePage,
        github: github
      }
      submitStatus.value = 'uploading'
      store.dispatch('updateUserProfile', sendData).then(() => {
        submitStatus.value = 'ready'
        // 获取更新后的资料
        store.dispatch('fetchUserInfo')
        store.dispatch('fetchUserProfile').then(() => {
          profileVal.profile = { ...store.state.userProfile }
        })
      }).catch(() => {
        submitStatus.value = 'uploading'
        createToast('error', '上传失败,服务器繁忙')
      }).finally(() => {
        submitStatus.value = 'ready'
      })
    }
    return { uploadCheck, OnFileUploadedError, profileVal, profile, removeAvatar, submitStatus, update }
  }
})
</script>
