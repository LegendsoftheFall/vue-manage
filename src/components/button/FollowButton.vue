<template>
    <button @click="changeFollow"
        :class="{'bg-blue-450 hover:bg-blue-400 px-4 py-2 ':!isFollow, 'bg-gray-100 hover:bg-gray-200 py-2 px-5':isFollow }"
        class="rounded-md flex justify-center items-center mr-3">
        <div v-if="!isFollow" class="flex justify-center items-center">
            <svg class="text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            <p class="pl-1 text-white">关注</p>
        </div>
        <div v-if="isFollow" class="flex justify-center items-center">
            <p class="pl-1 text-gray-500">已关注</p>
        </div>
    </button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'FollowButton',
  setup () {
    const isFollow = ref(true)
    const changeFollow = () => {
      isFollow.value = !isFollow.value
    }

    return { isFollow, changeFollow }
  }
})
</script>
