<template>
  <div id="scroll">
    <!-- Tags -->
    <TagButton/>
    <!-- <TagArticle/> -->
    <router-view></router-view>
  </div>
  <div class="h-20 w-full"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TagButton from '@/components/tag/TagButton.vue'

export default defineComponent({
  name: 'TagArticleList',
  components: { TagButton }
})
</script>
