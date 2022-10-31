<template>
    <div class="relative">
        <!-- Header -->
        <GlobalHeader />
    </div>
    <div class="absolute w-full h-full border-t bg-gray-1 dark:bg-black dark:border-gray-900">
        <!-- Content -->
        <div class="container mt-4 grid grid-cols-10 gap-7 mx-auto h-full">
            <div class="col-span-2 bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                <DashBoardBar/>
            </div>
            <div class="col-span-8 bg-white dark:bg-gray-800 rounded-lg"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GlobalHeader from '@/components/header/GlobalHeader.vue'
import DashBoardBar from '@/components/sidebar/DashBoardBar.vue'

export default defineComponent({
  name: 'DashBoard',
  components: { GlobalHeader, DashBoardBar }
})
</script>
