<template>
  <div id="scroll">
    <RecommendButton/>
    <router-view></router-view>
  </div>

  <div class="h-20 w-full"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RecommendButton from '@/components/recommend/RecommendButton.vue'

export default defineComponent({
  name: 'RecommendArticleList',
  components: { RecommendButton }
})
</script>
