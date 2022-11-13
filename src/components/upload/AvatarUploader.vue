<template>
    <div class="w-40 h-40 flex justify-center items-center">
        <button @click="triggerUpload" class="w-full h-full rounded-full overflow-hidden border shadow-md dark:bg-gray-700 dark:border-gray-700">
            <div v-if="fileStatus === 'ready'" class=" flex flex-col justify-center items-center">
                <svg class="w-12 h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.03 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v4.94a.75.75 0 001.5 0v-4.94l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" clip-rule="evenodd" />
                </svg>
                <p class="tracking-wider">上传图片</p>
            </div>
            <div v-if="fileStatus === 'uploading'" class="flex justify-center items-center">
              <svg class="w-14 h-14 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </div>
        </button>
        <input type="file" ref="fileInput" class="hidden" @change="handleFileChange">
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { useStore } from 'vuex'
import { UploadStatus, CheckFunction, GlobalDataProps } from '@/model/model'
import axios from 'axios'

export default defineComponent({
  name: 'AvatarUploader',
  props: {
    action: {
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>
    }
  },
  // 触发文件上传成功或失败的事件
  emits: ['file-uploaded', 'file-uploaded-error'],
  setup (props, context) {
    const store = useStore<GlobalDataProps>()
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>('ready')
    // 上传成功返回的url
    const imgUrl = ref()

    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }

    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      const files = target.files
      if (files) {
        const uploadedFile = files[0]
        // 在上传前检查是否满足条件
        if (props.beforeUpload) {
          const result = props.beforeUpload(uploadedFile)
          if (!result) {
            return
          }
        }
        fileStatus.value = 'uploading'
        const formData = new FormData()
        // 需要命名为file
        formData.append('file', uploadedFile)
        // 发送upload请求
        axios.post(props.action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(resp => {
          fileStatus.value = 'ready'
          imgUrl.value = resp.data
          // 更新图片
          store.commit('setProfileAvatar', resp.data.data.url)
        }).catch((error) => {
          fileStatus.value = 'uploading'
          context.emit('file-uploaded-error', { error }) // 触发失败事件
        }).finally(() => {
          if (fileInput.value) {
            fileInput.value.value = ''
          }
        })
      }
    }

    return { triggerUpload, fileInput, handleFileChange, fileStatus }
  }
})
</script>
