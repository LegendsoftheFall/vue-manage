<template>
    <div class="flex justify-center items-center">
        <button class="flex justify-center items-center transition-all
         rounded-lg px-32 py-3 bg-white shadow-sm border border-blue-450 text-blue-450 hover:text-white hover:bg-blue-450">
            <span class="text-lg">加载更多</span>
            <div v-if="false" class="flex justify-center items-center">
                <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                </svg>
                <span class="text-lg">正在加载...</span>
            </div>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoadingButton'
})
</script>
