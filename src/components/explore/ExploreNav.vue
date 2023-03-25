<template>
    <div class="w-full h-14 border flex pt-3 px-1 justify-center items-center bg-white dark:bg-gray-800 dark:border-gray-700 rounded-t-lg">
        <div v-for="docker in dockerList" :key="docker.text" @click="activeMenu = docker.index"
        :class="activeMenu === docker.index ? 'text-blue-450 border-b-2 border-b-blue-450' : ''"
        class="flex justify-center items-center mr-2 cursor-pointer hover:text-blue-450">
            <router-link :to="{ name: `${docker.to}`}" v-if="docker.isShow" class="px-2 py-2">{{docker.text}}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { GlobalDataProps, dockerProps } from '@/model/model'

export default defineComponent({
  name: 'ExploreNav',
  setup () {
    const store = useStore<GlobalDataProps>()
    const isShow = ref(false)
    const activeMenu = ref(0)
    if (localStorage.getItem('userID')) {
      isShow.value = true
    }
    const route = useRoute()
    if (route.path === '/explore' || route.path === '/explore/') {
      activeMenu.value = 0
    }
    if (route.path.includes('tags')) {
      activeMenu.value = 1
    }
    if (route.path.includes('tags-following')) {
      activeMenu.value = 2
    }
    if (route.path.includes('blogers-following')) {
      activeMenu.value = 3
    }
    const dockerList:dockerProps[] = [
      { index: 0, to: 'ExploreHot', text: '热门', isShow: true },
      { index: 1, to: 'Tags', text: '全部标签', isShow: true },
      { index: 2, to: 'FollowingTags', text: '关注的标签', isShow: isShow.value },
      { index: 3, to: 'FollowingBlogers', text: '关注的博主', isShow: isShow.value }
    ]

    return { dockerList, activeMenu }
  }
})
</script>
