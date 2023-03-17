<template>
    <!-- grid-container -->
    <div class="container grid grid-cols-12 gap-3 mx-auto h-full mt-5">
      <!-- SideBar -->
      <div class="col-span-2">
        <SideBar :activeMenu="2" />
      </div>
      <!-- Content -->
      <div id="scroll" class="col-span-7">
        <DraftList/>
      </div>
      <!-- Detail -->
      <div class="col-span-3">
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/model/model'
import SideBar from '@/components/sidebar/SideBar.vue'
import DraftList from '../drafts/DraftList.vue'
import useScrollLoad from '@/hooks/useScrollLoad'

export default defineComponent({
  name: 'TagContent',
  components: { SideBar, DraftList },
  setup () {
    const store = useStore<GlobalDataProps>()
    const total = computed(() => store.state.total)
    const introduction = computed(() => store.state.tags.introduction)

    useScrollLoad('fetchCollectedArticle', total, { page: 2, size: 10 })

    return { introduction }
  }
})
</script>
