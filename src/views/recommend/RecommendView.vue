<template>
<div class="relative">
    <!-- Header -->
    <GlobalHeader />
</div>
<div class="bg-gray-1 dark:bg-black absolute w-full h-full border-t dark:border-gray-900">
    <!-- Content -->
    <FormalContent/>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GlobalHeader from '@/components/header/GlobalHeader.vue'
import FormalContent from '@/components/FormalContent.vue'

export default defineComponent({
  name: 'App',
  components: { GlobalHeader, FormalContent }
})
</script>
