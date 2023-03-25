<template>
  <!-- 标签列表 -->
    <div class="border border-t-0">
        <div class="flex flex-col w-full">
            <a :href="`/n/${tag.id}`" target="_blank" v-for="tag in tagList" :key="tag.id">
                <div class="w-full h-32 p-2 hover:bg-gray-3 flex justify-between items-center cursor-pointer">
                    <div class="flex flex-col pl-3">
                        <p class="text-2xl font-bold mb-4">{{tag.name}}</p>
                        <div class="flex">
                            <span class="text-gray-500 text-md">{{tag.num}} 文章</span>
                            <p class="mx-2 h-full">&#183;</p>
                            <span class="text-gray-500 text-md">{{tag.f_num}} 关注</span>
                        </div>
                    </div>
                    <div class="pr-4 rounded-sm overflow-hidden">
                        <img class="w-18 h-18 border rounded-md" :src="tag.image" alt="">
                    </div>
                </div>
            </a>
        </div>
    </div>
    <!-- end -->
    <div v-if="!tagList" class="mt-10 pb-20 justify-center items-center text-center">
        <span class="text-2xl font-bold tracking-wide">糟糕！未找到结果, 请尝试新的关键字.</span>
        <img class="mt-10" :src="require('@/assets/image/bored.png')" alt="">
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/model/model'
import useScrollLoad from '@/hooks/useScrollLoad'

export default defineComponent({
  name: 'SearchTag',
  setup () {
    const store = useStore<GlobalDataProps>()
    const currentUserID = computed(() => store.state.user.id)
    const uid = currentUserID.value
    const total = computed(() => store.state.total)
    const key = computed(() => store.state.key)

    onMounted(() => {
      store.dispatch('searchTagListOnce', { page: 1, size: 10, category: 'tag', key: key.value })
      store.commit('setRequestMode', true)
      store.commit('setLoadMode', true)
    })

    const tagList = computed(() => store.state.tagInfo)

    useScrollLoad('searchTagList', total, { page: 2, size: 10, category: 'tag', key: key.value })

    return { tagList }
  }
})
</script>
