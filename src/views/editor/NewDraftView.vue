<template>
  <div class="relative">
    <DraftHeader/>
  </div>
  <div class="absolute w-full h-full border-t">
    <NewDraftContent/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DraftHeader from '@/components/header/DraftHeader.vue'
import NewDraftContent from '@/components/content/NewDraftContent.vue'

export default defineComponent({
  name: 'NewDraftView',
  components: { DraftHeader, NewDraftContent }
})
</script>
