<template>
    <div class="relative">
        <!-- Header -->
        <GlobalHeader />
    </div>
    <div class=" dark:bg-black absolute w-full h-max border-t dark:border-gray-900">
        <!-- Content -->
        <BookMarkContent/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GlobalHeader from '@/components/header/GlobalHeader.vue'
import BookMarkContent from '@/components/content/BookMarkContent.vue'

export default defineComponent({
  name: 'BookMarkView',
  components: { GlobalHeader, BookMarkContent }
})
</script>
