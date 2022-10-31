<template>
  <!-- Tags -->
  <TagButton/>
  <TagArticle/>
  <div class="h-20 w-full"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TagButton from '@/components/tag/TagButton.vue'
import TagArticle from '@/components/tag/TagArticle.vue'

export default defineComponent({
  name: 'TagArticleList',
  components: { TagButton, TagArticle }
})
</script>
