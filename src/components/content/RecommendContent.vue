<template>
    <!-- grid-container -->
    <div class="container grid grid-cols-12 gap-3 mx-auto h-full mt-5 font-Poppins">
      <!-- SideBar -->
      <div class="hidden col-span-2 lg:block md:block">
        <SideBar :activeMenu="0"></SideBar>
      </div>
      <!-- Content -->
      <div class="col-span-12 lg:col-span-7 md:col-span-10 sm:col-span-12">
        <RecommendArticleList/>
        <!-- end -->
        <div class="mt-10 pb-20 justify-center items-center text-center">
            <span class="text-2xl font-semibold tracking-wide">到底啦！👋</span>
        </div>
      </div>
      <!-- Detail -->
      <div class="hidden lg:block lg:col-span-3">
        <DraftBar/>
        <CollectedBar/>
        <img :src="require('@/assets/image/wind-turbine.png')" alt="">
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SideBar from '@/components/sidebar/SideBar.vue'
import RecommendArticleList from '@/components/recommend/RecommendArticleList.vue'
import DraftBar from '../sidebar/DraftBar.vue'
import CollectedBar from '../sidebar/CollectedBar.vue'

export default defineComponent({
  name: 'FormalContent',
  components: { SideBar, RecommendArticleList, DraftBar, CollectedBar }
})
</script>
