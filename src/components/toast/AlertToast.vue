<template>
  <teleport to='#message'>
    <div ref="toastRef" class="absolute flex flex-col z-50 items-center justify-center top-0 left-0 right-0 max-h-screen bg-transparent my-3">
      <div
      class="flex items-center my-1 rounded-lg overflow-hidden w-1/4"
      :class="wrapperClass.get(type!)">
        <!-- wrapper -->
        <div class="relative flex items-center w-full h-20">
            <!-- icon -->
            <div :class="iconClass.get(type!)" class="h-20 w-20 items-center justify-center">
                <svg v-if="type === 'info'" class="absolute w-10 h-10 top-5 left-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704l1.323-6.208Zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0Z"/>
                </svg>
                <svg v-if="type === 'success'" class="absolute w-10 h-10 top-5 left-5" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                </svg>
                <svg v-if="type === 'warning'" class="absolute w-10 h-10 top-5 left-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0L7.005 3.1ZM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"/>
                </svg>
                <svg v-if="type === 'error'" class="absolute w-10 h-10 top-5 left-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </div>
            <!-- message -->
            <span class="text-base ml-3 font-semibold tracking-widest">{{message}}</span>
            <!-- closeBtn -->
            <!-- <button @click.prevent="removeToast" class="absolute right-4 transform hover:scale-125 rounded-md inline-flex"
            >
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button> -->
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
      ['info', 'bg-blue-500 text-white'],
      ['success', 'bg-green-500 text-white'],
      ['warning', 'bg-orange-500 text-white'],
      ['error', 'bg-red-500 text-white']
    ])

    const iconClass = new Map([
      ['info', 'bg-blue-500'],
      ['success', 'bg-green-500'],
      ['warning', 'bg-orange-500'],
      ['error', 'bg-red-500']
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
