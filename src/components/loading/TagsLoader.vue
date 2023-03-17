<template>
  <div v-for="index of 6" :key="index" class=" w-full h-max px-4">
    <div class="animate-pulse flex justify-between items-center py-2">
        <div class="w-1/2 h-5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        <div class="w-1/8 h-5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
    </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TagsLoader'
})

</script>
