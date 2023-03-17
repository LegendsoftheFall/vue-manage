<template>
<div class="relative">
    <!-- Header -->
    <GlobalHeader />
</div>
<div class=" dark:bg-black absolute w-full h-full border-t dark:border-gray-900">
    <!-- Content -->
    <SearchContent/>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GlobalHeader from '@/components/header/GlobalHeader.vue'
import SearchContent from '@/components/content/SearchContent.vue'

export default defineComponent({
  name: 'SearchView',
  components: { GlobalHeader, SearchContent }
})
</script>
