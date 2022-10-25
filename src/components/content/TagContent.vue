<template>
    <!-- grid-container -->
    <div class="container grid grid-cols-12 gap-3 mx-auto h-full mt-5">
      <!-- SideBar -->
      <div class="col-span-2">
        <SideBar/>
        <TrendingTags/>
      </div>
      <!-- Content -->
      <div id="scroll" class="col-span-7">
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
    <!-- end -->
    <div class="container mx-auto pt-10 pb-20 justify-center items-center text-center">
        <span class="text-2xl font-semibold tracking-wide">到底啦！👋</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/model/model'
import SideBar from '@/components/sidebar/SideBar.vue'
import TrendingTags from '@/components/trending/TrendingTags.vue'
import TagArticleList from '@/components/tag/TagArticleList.vue'
import TagDetail from '@/components/tag/TagDetail.vue'
import TagHotArticle from '@/components/tag/TagHotArticle.vue'
import TagInfo from '@/components/tag/TagInfo.vue'
import useScrollLoad from '@/hooks/useScrollLoad'

export default defineComponent({
  name: 'TagContent',
  components: { SideBar, TrendingTags, TagArticleList, TagDetail, TagHotArticle, TagInfo },
  setup () {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const id = route.params.id
    const introduction = computed(() => store.state.tags.introduction)

    useScrollLoad('fetchTagArticleByID', id as string)

    return { introduction }
  }
})
</script>
