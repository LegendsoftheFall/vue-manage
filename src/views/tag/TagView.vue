<template>
  <div class="relative">
      <!-- Header -->
      <GlobalHeader />
  </div>
  <div class=" dark:bg-black absolute w-full h-full border-t dark:border-gray-900">
      <!-- Content -->
      <TagContent/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GlobalHeader from '@/components/header/GlobalHeader.vue'
import TagContent from '@/components/content/TagContent.vue'

export default defineComponent({
  name: 'TagView',
  components: { GlobalHeader, TagContent }
})
</script>
