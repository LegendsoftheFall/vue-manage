<template>
<div class="relative">
    <!-- Header -->
    <GlobalHeader />
</div>
<div class=" dark:bg-black absolute w-full h-full border-t dark:border-gray-900">
    <!-- Content -->
    <FormalContent/>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GlobalHeader from '@/components/header/GlobalHeader.vue'
import FormalContent from '@/components/content/RecommendContent.vue'

export default defineComponent({
  name: 'RecommendView',
  components: { GlobalHeader, FormalContent }
})
</script>
