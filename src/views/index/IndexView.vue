<template>
    <div class="relative">
    <!-- Header -->
    <GlobalHeader />
  </div>
  <div class="bg-gray-1 dark:bg-black absolute w-full h-max border-t dark:border-gray-900">
    <!-- Content -->
    <IndexContent/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GlobalHeader from '@/components/header/GlobalHeader.vue'
import IndexContent from '@/components/content/IndexContent.vue'

export default defineComponent({
  name: 'VisitorHomeView',
  components: { GlobalHeader, IndexContent }
})
</script>
