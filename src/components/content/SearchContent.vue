<template>
    <!-- grid-container -->
    <div class="container grid grid-cols-12 gap-3 mx-auto h-full mt-5">
      <div class="col-span-2">
      </div>
      <!-- Content -->
      <div class="col-span-7">
        <SearchList/>
        <!-- end -->
        <div class="mt-10 pb-20 justify-center items-center text-center">
            <span class="text-2xl font-semibold tracking-wide">到底啦！👋</span>
        </div>
      </div>
      <!-- Detail -->
      <div class="col-span-3"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchList from '@/components/search/SearchList.vue'

export default defineComponent({
  name: 'FormalContent',
  components: { SearchList }
})
</script>
