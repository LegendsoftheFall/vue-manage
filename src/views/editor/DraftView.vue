<template>
  <div class="relative">
    <DraftHeader/>
  </div>
  <div class="absolute w-full h-full border-t">
    <DraftContent/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { useStore } from 'vuex'
// import { GlobalDataProps } from '@/store'
import DraftHeader from '@/components/header/DraftHeader.vue'
import DraftContent from '@/components/content/DraftContent.vue'

export default defineComponent({
  name: 'DraftView',
  components: { DraftHeader, DraftContent }
})
</script>
