<template>
    <div class="relative">
        <!-- Header -->
        <HomeHeader />
    </div>
    <div class="absolute w-full h-max border-t dark:border-gray-900">
        <!-- Content -->
        <ArticleContent/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomeHeader from '@/components/header/HomeHeader.vue'
import ArticleContent from '@/components/content/ArticleContent.vue'

export default defineComponent({
  name: 'ArticleView',
  components: { HomeHeader, ArticleContent }
})
</script>
