<template>
    <!-- grid-container -->
    <div class="container grid grid-cols-12 gap-3 mx-auto h-full mt-5 font-Poppins">
      <!-- SideBar -->
      <div class="hidden col-span-2 lg:block md:block">
        <SideBar :activeMenu="2" />
      </div>
      <!-- Content -->
      <div id="scroll" class="col-span-12 lg:col-span-7 md:col-span-10 sm:col-span-12">
        <DraftList/>
      </div>
      <!-- Detail -->
      <div class="hidden lg:block lg:col-span-3">
        <DraftBar/>
        <CollectedBar/>
        <img :src="require('@/assets/image/ideas.png')" alt="">
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/model/model'
import SideBar from '@/components/sidebar/SideBar.vue'
import DraftList from '../drafts/DraftList.vue'
import DraftBar from '../sidebar/DraftBar.vue'
import CollectedBar from '../sidebar/CollectedBar.vue'

export default defineComponent({
  name: 'TagContent',
  components: { SideBar, DraftList, DraftBar, CollectedBar },
  setup () {
    const store = useStore<GlobalDataProps>()
    const total = computed(() => store.state.total)
    const introduction = computed(() => store.state.tags.introduction)

    return { introduction }
  }
})
</script>
