<template>
    <!-- grid-container -->
    <div class="container grid grid-cols-12 gap-3 mx-auto h-full mt-5 font-Poppins">
      <!-- SideBar -->
      <div class="col-span-2 hidden md:block lg:block">
        <SideBar :activeMenu="3" />
      </div>
      <!-- Content -->
      <div id="scroll" class="col-span-12 md:col-span-10 lg:col-span-7">
        <BookMarkList/>
      </div>
      <!-- Detail -->
      <div class="col-span-3 hidden lg:block">
        <DraftBar/>
        <CollectedBar/>
        <img :src="require('@/assets/image/notebook.png')" alt="">
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/model/model'
import SideBar from '@/components/sidebar/SideBar.vue'
import BookMarkList from '../bookmark/BookMarkList.vue'
import useScrollLoad from '@/hooks/useScrollLoad'
import DraftBar from '../sidebar/DraftBar.vue'
import CollectedBar from '../sidebar/CollectedBar.vue'

export default defineComponent({
  name: 'TagContent',
  components: { SideBar, BookMarkList, DraftBar, CollectedBar },
  setup () {
    const store = useStore<GlobalDataProps>()
    const total = computed(() => store.state.total)
    const introduction = computed(() => store.state.tags.introduction)

    useScrollLoad('fetchCollectedArticle', total, { page: 2, size: 10 })

    return { introduction }
  }
})
</script>
