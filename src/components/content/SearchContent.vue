<template>
    <!-- grid-container -->
    <div class="container grid grid-cols-12 gap-3 mx-auto h-full mt-5 font-Poppins">
      <div class="hidden lg:block lg:col-span-2">
      </div>
      <!-- Content -->
      <div class="col-span-12 lg:col-span-8">
        <SearchList/>
      </div>
      <!-- Detail -->
      <div class="hidden lg:block lg:col-span-2"></div>
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
