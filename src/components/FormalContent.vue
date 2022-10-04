<template>
    <!-- grid-container -->
    <div class="container grid grid-cols-12 gap-3 mx-auto h-full mt-5">
      <!-- SideBar -->
      <div class="col-span-2">
        <SideBar/>
        <div class="h-6 w-full"></div>
        <TrendingTags/>
      </div>
      <!-- Content -->
      <div class="col-span-7">
        <PostList/>
      </div>
      <!-- Detail -->
      <div class="col-span-3 bg-blue-200"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SideBar from './SideBar.vue'
import TrendingTags from './TrendingTags.vue'
import PostList from './PostList.vue'

export default defineComponent({
  name: 'FormalContent',
  components: { SideBar, TrendingTags, PostList }
})
</script>
