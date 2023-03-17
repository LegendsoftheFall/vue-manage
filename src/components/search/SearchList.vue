<template>
  <div id="scroll">
    <SearchButton/>
    <router-view></router-view>
  </div>

  <div class="h-20 w-full"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchButton from '@/components/search/SearchButton.vue'

export default defineComponent({
  name: 'RecommendArticleList',
  components: { SearchButton }
})
</script>
