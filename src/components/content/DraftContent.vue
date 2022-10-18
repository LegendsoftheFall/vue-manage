<template>
    <div class="container grid grid-cols-10 mx-auto h-full mt-5">
      <div class="col-span-2"></div>
      <!-- 写作区域 -->
      <div class="col-span-6">
        <!-- 添加图片按钮 -->
        <AddCoverButton/>
        <!-- 图片展示 -->
        <div v-if="imgUrl" class="relative mt-10 w-full h-110 rounded-lg overflow-hidden">
          <img class="w-full h-full object-cover" :src="imgUrl" alt="">
          <!-- 关闭按钮 -->
          <button @click="removeImg" class="absolute top-4 right-4 px-4 py-2 bg-slate-100 bg-opacity-75 hover:bg-white rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
          </button>
        </div>
        <!-- 标题 -->
        <div class="mt-12 w-full">
            <textarea type="text" v-model="titleVal"
            style="box-shadow:none"
            class="w-full text-3xl tracking-wider font-bold border-none resize-none outline-none"
            placeholder="文章标题..."></textarea>
        </div>
        <!-- 文本内容 -->
        <div class="mt-2 w-full">
            <textarea type="text" rows="20" v-model="contentVal"
            style="box-shadow:none"
            class="w-full pt-12 text-xl tracking-wider border-none resize-none outline-none"
            placeholder="写下你的想法..."></textarea>
        </div>
      </div>
      <div class="col-span-2"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/model/model'
import AddCoverButton from '@/components/draft/AddCoverButton.vue'

export default defineComponent({
  name: 'DraftView',
  components: { AddCoverButton },
  setup () {
    const store = useStore<GlobalDataProps>()
    const imgUrl = computed(() => store.state.imgUrl.url)
    const removeImg = () => {
      store.commit('setImgUrl', {})
    }

    const titleVal = ref('')
    watch(() => titleVal.value, () => {
      store.commit('setTitle', titleVal.value)
    })
    const contentVal = ref('')
    watch(() => contentVal.value, () => {
      store.commit('setContent', contentVal.value)
    })

    return { imgUrl, removeImg, titleVal, contentVal }
  }
})
</script>
