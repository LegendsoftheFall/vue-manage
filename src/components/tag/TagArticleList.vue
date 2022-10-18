<template>
  <!-- Tags -->
  <TagButton/>
  <TagArticle/>
  <div class="h-20 w-full"></div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import TagButton from '@/components/tag/TagButton.vue'
import TagArticle from '@/components/tag/TagArticle.vue'
// import { testPostData } from '@/model/TestPostData'

const useClickMarkEffect = () => {
  const isClickMark = ref(false)
  const useClickMark = () => {
    isClickMark.value = !isClickMark.value
  }

  return { isClickMark, useClickMark }
}

const useClickLikeEffect = () => {
  const isClickLike = ref(false)
  const useClickLike = () => {
    isClickLike.value = !isClickLike.value
  }

  return { isClickLike, useClickLike }
}
export default defineComponent({
  name: 'TagArticleList',
  components: { TagButton, TagArticle },
  setup () {
    const { isClickMark, useClickMark } = useClickMarkEffect()
    const { isClickLike, useClickLike } = useClickLikeEffect()
    return { isClickMark, isClickLike, useClickMark, useClickLike }
  }
})
</script>
