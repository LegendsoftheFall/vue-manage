<template>
    <div class="relative">
        <!-- Header -->
        <HomeHeader />
    </div>
    <div class="absolute w-full h-max border-t dark:border-gray-900">
        <!-- Content -->
        <HomeContent/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomeHeader from '@/components/header/HomeHeader.vue'
import HomeContent from '@/components/content/HomeContent.vue'

export default defineComponent({
  name: 'HomeView',
  components: { HomeHeader, HomeContent }
})
</script>
