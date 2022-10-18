<template>
  <teleport to='#message'>
    <div ref="toastRef" class="absolute flex flex-col z-50 items-center justify-center top-0 left-0 right-0 max-h-screen bg-transparent my-3">
      <div
      class="flex items-center my-1 rounded-lg overflow-hidden w-1/4"
      :class="wrapperClass.get(type!)">
        <!-- wrapper -->
        <div class="relative flex items-center w-full">
            <!-- icon -->
            <div :class="iconClass.get(type!)" class="h-12 w-12 items-center justify-center">
                <svg v-if="type === 'info'" class="absolute w-8 h-8 top-2 left-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                    <path fill="#2196f3" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"/><path fill="#fff" d="M22 22h4v11h-4V22zM26.5 16.5c0 1.379-1.121 2.5-2.5 2.5s-2.5-1.121-2.5-2.5S22.621 14 24 14 26.5 15.121 26.5 16.5z"/>
                </svg>
                <svg v-if="type === 'success'" class="absolute w-8 h-8 top-2 left-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                    <path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"/><path fill="#ccff90" d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"/>
                </svg>
                <svg v-if="type === 'warning'" class="absolute w-8 h-8 top-2 left-2 text-orange-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <svg v-if="type === 'error'" class="absolute w-8 h-8 top-2 left-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                    <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"/><path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"/><path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"/>
                </svg>
                <!-- <svg  v-if="toast.type === 'warning'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                    <path fill="#ffa500" d="M5.7 22H42.5V26H5.7z" transform="rotate(-45.001 24.036 24.037)"/><path fill="#ffa500" d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z M24,40c-8.8,0-16-7.2-16-16S15.2,8,24,8 s16,7.2,16,16S32.8,40,24,40z"/>
                </svg> -->
            </div>
            <!-- message -->
            <span class="text-sm ml-3 tracking-widest">{{message}}</span>
            <!-- closeBtn -->
            <button @click.prevent="removeToast" class="absolute right-4 transform hover:scale-125 rounded-md inline-flex"
            >
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
            <!-- progressBar -->
            <div class="absolute bottom-0 right-0 left-0 h-1 bg-neutral-200">
              <span :class="progressClass.get(type!)" class="absolute left-0 top-0 bottom-0 h-full" :style="{ 'width': `${progress}%`}"></span>
            </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted } from 'vue'
import { MessageType } from '@/model/model'
import useDOMCreate from '@/hooks/useDOMCreate'

export default defineComponent({
  name: 'AlertToast',
  props: {
    message: String,
    type: String as PropType<MessageType>
    // progress: {
    //   type: Number,
    //   default: 15
    // }
  },
  setup () {
    const progress = ref(0)
    onMounted(() => {
      // 进度条
      const interval = setInterval(() => {
        if (progress.value < 100) {
          progress.value += 1
        } else {
          clearInterval(interval)
        }
      }, 25)
    })

    // 全局组件
    useDOMCreate('message')
    const toastRef = ref()
    const removeToast = () => {
      const toastDiv: HTMLDivElement = toastRef.value
      toastDiv.classList.add('animate-toastOut')
    }

    const wrapperClass = new Map([
      ['info', 'bg-blue-500 text-blue-100'],
      ['success', 'bg-green-500 text-green-100'],
      ['warning', 'bg-orange-500 text-orange-100'],
      ['error', 'bg-red-500 text-red-100']
    ])

    const iconClass = new Map([
      ['info', 'bg-blue-100'],
      ['success', 'bg-green-100'],
      ['warning', 'bg-orange-100'],
      ['error', 'bg-red-100']
    ])

    const progressClass = new Map([
      ['info', 'bg-blue-300'],
      ['success', 'bg-green-300'],
      ['warning', 'bg-orange-300'],
      ['error', 'bg-red-300']
    ])

    return { wrapperClass, iconClass, progressClass, toastRef, progress, removeToast }
  }
})
</script>
