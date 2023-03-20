<template>
    <!-- grid-container -->
    <div class="container grid grid-cols-12 gap-3 mx-auto h-full mt-5 font-Poppins">
      <!-- SideBar -->
      <div class="col-span-2 hidden md:block lg:block">
        <SideBar/>
      </div>
      <!-- Content -->
      <div id="scroll" class="col-span-12 md:col-span-10 lg:col-span-7">
        <!-- Tag -->
        <TagDetail/>
        <!-- Hot -->
        <!-- <TagHotArticle/> -->
        <!-- List -->
        <TagArticleList/>
        <!-- end -->
        <div class="mt-10 pb-20 justify-center items-center text-center">
            <span class="text-2xl font-semibold tracking-wide">到底啦！👋</span>
        </div>
      </div>
      <!-- Detail -->
      <div class="hidden lg:block lg:col-span-3">
        <!-- Info -->
        <TagInfo v-if="introduction"/>
        <img :src="require('@/assets/image/young.png')" alt="">
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/model/model'
import SideBar from '@/components/sidebar/SideBar.vue'
import TagArticleList from '@/components/tag/TagArticleList.vue'
import TagDetail from '@/components/tag/TagDetail.vue'
import TagInfo from '@/components/tag/TagInfo.vue'
import useScrollLoad from '@/hooks/useScrollLoad'

export default defineComponent({
  name: 'TagContent',
  components: { SideBar, TagArticleList, TagDetail, TagInfo },
  setup () {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const tid = route.params.id
    const total = computed(() => store.state.total)
    const introduction = computed(() => store.state.tags.introduction)

    useScrollLoad('fetchTagArticleByID', total, { page: 2, size: 10, id: tid as string })

    return { introduction }
  }
})
</script>
