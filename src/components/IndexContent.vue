<template>
    <!-- grid-container -->
    <div class="container grid grid-cols-12 gap-3 relative mx-auto h-full mt-5">
      <!-- SideBar -->
      <div class="col-span-2">
        <SideBar/>
        <div class="h-6 w-full"></div>
        <TrendingTags/>
      </div>
      <!-- Content -->
      <div class="col-span-10 bg-green-200"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SideBar from './SideBar.vue'
import TrendingTags from './TrendingTags.vue'

export default defineComponent({
  name: 'IndexContent',
  components: { SideBar, TrendingTags }
})
</script>
