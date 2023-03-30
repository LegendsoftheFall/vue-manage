<template>
    <div>
        <!-- 添加头图按钮 -->
        <button @click="isOpen = !isOpen" class="relative flex justify-center items-center px-4 py-2 border rounded-full hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <p class="pl-2">添加头图</p>
        </button>
        <!-- 下拉内容 -->
        <div v-if="isOpen" class="absolute z-20 w-100 h-max p-4 border rounded-lg shadow-lg bg-white">
            <!-- 关闭按钮 -->
            <button @click="isOpen = !isOpen" class="absolute top-2 right-2 px-2 py-1 hover:bg-gray-200 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <div class="w-92 h-40">
                <!-- 上传 -->
                <button class="flex justify-center items-center p-2 rounded-t-sm text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-cloud-upload" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
                        <path fill-rule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"/>
                    </svg>
                    <p class="pl-1">上传</p>
                </button>
                <hr class="w-full border-gray-400">
                <div class="flex justify-center items-center mt-10">
                    <UpLoader action="/api/upload" :beforeUpload="uploadCheck"
                     @file-uploaded="OnFileUploaded" @file-uploaded-error="OnFileUploadedError">
                      <!-- <template #uploaded="slotData">
                        <img :src="slotData.imgUrl.data.url">
                      </template> -->
                    </UpLoader>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import UpLoader from '@/components/upload/UpLoader.vue'
import createToast from '@/hooks/useCreateToast'
// import { ResponseType, ImageProps } from '@/model/model'
import { beforeUploadCheck } from '@/hooks/helper'

const uploadCheck = (file: File) => {
  const result = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'], size: 5 })
  const { passed, error } = result
  if (error === 'format') {
    createToast('warning', '上传图片只能是JPG或PNG格式')
  }
  if (error === 'size') {
    createToast('warning', '上传图片不能超过5M')
  }

  return passed
}

export default defineComponent({
  name: 'AddCoverButton',
  components: { UpLoader },
  setup () {
    // 处理点击事件
    const isOpen = ref(false)
    // 定义上传成功返回数据的事件函数
    // const OnFileUploaded = (rawData: ResponseType<ImageProps>) => {
    //   createToast('success', `图片的url为${rawData.data.url}`)
    // }
    const OnFileUploaded = () => {
      // createToast('success', '上传成功')
    }
    // 定义上传失败的事件函数
    const OnFileUploadedError = () => {
      createToast('error', '上传失败,服务器繁忙')
    }

    return { isOpen, uploadCheck, OnFileUploaded, OnFileUploadedError }
  }
})
</script>
