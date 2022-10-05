<template>
    <div class="relative">
    <!-- Header -->
    <GlobalHeader />
  </div>
  <div class="bg-gray-1 dark:bg-black absolute w-full h-full border-t dark:border-gray-900">
    <!-- Content -->
    <IndexContent/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GlobalHeader from '@/components/GlobalHeader.vue'
import IndexContent from '@/components/IndexContent.vue'

export default defineComponent({
  name: 'VisitorHomeView',
  components: { GlobalHeader, IndexContent }
})
</script>
