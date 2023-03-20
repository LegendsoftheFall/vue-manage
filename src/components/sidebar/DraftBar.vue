<template>
    <div class="w-full flex flex-col mb-5 h-32 p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
        <div class="text-lg font-bold flex justify-between">
            <div>最近的草稿&#40;{{draftList?.length || 0}}&#41;</div>
            <a href="/drafts" class="py-1 px-3 border rounded-md hover:bg-gray-3 hover:text-black">全部</a>
        </div>
        <div class="mt-2 flex flex-col" v-for="draft in draftList.slice(0,1)" :key="draft.id">
            <a :href="`/draft/${draft.id}`" target="_blank" class="text-blue-400 truncate font-bold">{{draft.title}}</a>
            <div>修改于 {{draft?.format.substr(0,10)}}</div>
        </div>
        <div v-if="draftList?.length === 0" class="p-2 mt-2 flex justify-center items-center">这里什么都没有👋</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/model/model'

export default defineComponent({
  name: 'DraftBar',
  setup () {
    const store = useStore<GlobalDataProps>()

    onMounted(() => {
      // store.dispatch('fetchDraftInfo', { page: 1, size: 10 })
      store.dispatch('fetchDraftBar')
    })

    const draftList = computed(() => store.state.draftBar)

    return { draftList }
  }
})
</script>
