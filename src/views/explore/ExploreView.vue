<template>
    <div class="relative">
        <!-- Header -->
        <GlobalHeader />
    </div>
    <div class=" dark:bg-black absolute w-full h-max border-t dark:border-gray-900">
        <!-- Content -->
        <ExploreContent/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ExploreContent from '@/components/content/ExploreContent.vue'
import GlobalHeader from '@/components/header/GlobalHeader.vue'

export default defineComponent({
  name: 'ExploreView',
  components: { GlobalHeader, ExploreContent }
})
</script>
