<template>
    <div class="relative">
        <!-- Header -->
        <GlobalHeader />
    </div>
    <div class=" dark:bg-black absolute w-full h-max border-t dark:border-gray-900">
        <!-- Content -->
        <DraftsContent/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GlobalHeader from '@/components/header/GlobalHeader.vue'
import DraftsContent from '@/components/content/DraftsContent.vue'

export default defineComponent({
  name: 'DraftsView',
  components: { GlobalHeader, DraftsContent }
})
</script>
