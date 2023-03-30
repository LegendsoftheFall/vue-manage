<template>
    <div class="w-full flex flex-col items-start h-max p-6 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 font-Poppins">
        <span class="font-semibold">关于此标签</span>
        <span class="mt-4 mb-4">{{introduction}}</span>
    </div>
    <div class="h-6 w-full"></div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/model/model'

export default defineComponent({
  name: 'TagInfo',
  setup () {
    const store = useStore<GlobalDataProps>()
    const introduction = computed(() => store.state.tags.introduction)

    return { introduction }
  }
})
</script>
