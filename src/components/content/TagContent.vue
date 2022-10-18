<template>
    <!-- grid-container -->
    <div class="container grid grid-cols-12 gap-3 mx-auto h-full mt-5">
      <!-- SideBar -->
      <div class="col-span-2">
        <SideBar/>
        <TrendingTags/>
      </div>
      <!-- Content -->
      <div class="col-span-7">
        <!-- Tag -->
        <TagDetail/>
        <!-- Hot -->
        <TagHotArticle/>
        <!-- List -->
        <TagArticleList/>
      </div>
      <!-- Detail -->
      <div class="col-span-3">
        <!-- Info -->
        <TagInfo v-if="introduction"/>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/model/model'
import SideBar from '@/components/sidebar/SideBar.vue'
import TrendingTags from '@/components/trending/TrendingTags.vue'
import TagArticleList from '@/components/tag/TagArticleList.vue'
import TagDetail from '@/components/tag/TagDetail.vue'
import TagHotArticle from '@/components/tag/TagHotArticle.vue'
import TagInfo from '@/components/tag/TagInfo.vue'

export default defineComponent({
  name: 'TagContent',
  components: { SideBar, TrendingTags, TagArticleList, TagDetail, TagHotArticle, TagInfo },
  setup () {
    const store = useStore<GlobalDataProps>()
    const introduction = computed(() => store.state.tags.introduction)

    return { introduction }
  }
})
</script>
