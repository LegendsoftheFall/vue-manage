<template>
    <div>
      <!-- <input type="file" name="file" @change.prevent="handleFileChange"> -->
      <button @click="triggerUpload"
      class="flex justify-center items-center px-20 py-3 border rounded-md bg-blue-450 hover:bg-blue-400">
        <!-- 准备状态 -->
        <slot v-if="fileStatus === 'ready'" name="ready">
          <p class="text-white font-semibold tracking-wider">选择一张图片</p>
        </slot>
        <!-- 上传状态 -->
        <slot v-if="fileStatus === 'uploading'" name="uploading">
          <div class="flex justify-center items-center text-white font-semibold">
            <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
            </svg>
            <p class="tracking-wider pl-1">正在上传...</p>
          </div>
        </slot>
        <!-- 成功状态 -->
        <slot v-if="fileStatus === 'success'" name="uploaded" :imgUrl="imgUrl">
          <div class="flex justify-center items-center text-white font-semibold">
            <svg class="w-5 h-5 animate-bounce" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <p class="tracking-wider pl-1">上传成功</p>
          </div>
        </slot>
        <input type="file" ref="fileInput" class="hidden" @change="handleFileChange">
      </button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import { UploadStatus, CheckFunction } from '@/model/model'

export default defineComponent({
  name: 'UpLoader',
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
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>('ready')
    // 上传成功返回的url
    const imgUrl = ref()
    const store = useStore()

    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    // 监听input事件
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
          // console.log(resp)
          fileStatus.value = 'success'
          imgUrl.value = resp.data
          // 更新图片
          store.commit('setImgUrl', resp.data.data)
          context.emit('file-uploaded', resp.data) // 触发成功事件
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

    return { fileInput, fileStatus, imgUrl, handleFileChange, triggerUpload }
  }
})
</script>
