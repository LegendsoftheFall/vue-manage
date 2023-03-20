<template>
    <!-- grid-container -->
    <div class="container grid grid-cols-12 gap-3 mx-auto h-full mt-5 font-Poppins">
      <!-- SideBar -->
      <div class="hidden col-span-2 lg:block md:block">
        <SideBar :activeMenu="1" :showTrending="false"/>
      </div>
      <!-- Content -->
      <div class="col-span-12 lg:col-span-7 md:col-span-10 sm:col-span-12">
        <!-- info -->
        <div class="w-full flex flex-col items-center mb-5 h-32 p-6 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
            <div class="text-2xl font-semibold tracking-wide">探索技术博客&标签</div>
            <div class="mt-2 tracking-wide">在这里你能找到社区中的优质博客和你感兴趣的领域</div>
        </div>
        <!-- button -->
        <ExploreNav/>
        <!-- view -->
        <RouterView></RouterView>
      </div>
      <!-- Detail -->
      <div class="hidden lg:block lg:col-span-3">
        <DraftBar/>
        <CollectedBar/>
        <img :src="require('@/assets/image/easter-egg-hunt.png')" alt="">
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/model/model'
import SideBar from '@/components/sidebar/SideBar.vue'
import ExploreNav from '../explore/ExploreNav.vue'
import DraftBar from '../sidebar/DraftBar.vue'
import CollectedBar from '../sidebar/CollectedBar.vue'

export default defineComponent({
  name: 'ExploreContent',
  components: { SideBar, ExploreNav, DraftBar, CollectedBar },
  setup () {
    const store = useStore<GlobalDataProps>()
    const introduction = computed(() => store.state.tags.introduction)

    return { introduction }
  }
})
</script>
