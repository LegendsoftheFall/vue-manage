<template>
    <!-- grid-container -->
    <div class="container grid grid-cols-12 gap-3 mx-auto h-full mt-5">
      <!-- SideBar -->
      <div class="col-span-2">
        <SideBar :activeMenu="0"></SideBar>
      </div>
      <!-- Content -->
      <div class="col-span-7">
        <RecommendArticleList/>
        <!-- end -->
        <div class="mt-10 pb-20 justify-center items-center text-center">
            <span class="text-2xl font-semibold tracking-wide">到底啦！👋</span>
        </div>
      </div>
      <!-- Detail -->
      <div class="col-span-3 bg-blue-200"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SideBar from '@/components/sidebar/SideBar.vue'
import RecommendArticleList from '@/components/recommend/RecommendArticleList.vue'

export default defineComponent({
  name: 'FormalContent',
  components: { SideBar, RecommendArticleList }
})
</script>
