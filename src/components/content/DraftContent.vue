<template>
    <div class="container grid grid-cols-12 mx-auto h-full mt-5 font-Poppins">
      <div class="lg:col-span-1"></div>
      <!-- 写作区域 -->
      <div class="col-span-12 lg:col-span-10">
        <div class="flex items-center">
          <!-- 添加图片按钮 -->
          <AddCoverButton/>
          <!-- 添加副标题按钮 -->
          <button v-if="!isSubTitle" @click="isSubTitle = !isSubTitle" class="ml-3 relative flex justify-center items-center px-4 py-2 border rounded-full hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-fonts" viewBox="0 0 16 16">
              <path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z"/>
            </svg>
              <p class="pl-1">添加副标题</p>
          </button>
        </div>
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
            <textarea type="text" v-model="article.title"
            style="box-shadow:none"
            class="w-full text-3xl tracking-wider bg-gray-1 font-bold border-none resize-none outline-none placeholder-black"
            placeholder="文章标题..."></textarea>
        </div>
        <!-- 副标题 -->
        <div v-if="isSubTitle" class="w-full relative">
            <textarea type="text" v-model="article.subtitle"
            style="box-shadow:none"
            class="w-full text-2xl px-7 tracking-wide bg-gray-1 font-medium border-none resize-none outline-none placeholder-gray-700"
            placeholder="文章副标题..."></textarea>
            <!-- 关闭按钮 -->
            <button @click="removeSubTitle" class="absolute top-1 right-0 px-1 py-1 hover:bg-gray-200 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <!-- 文本内容 -->
        <div class="mt-2 w-full">
            <v-md-editor  v-model="article.content" class="h-200" placeholder="写下你的想法..."></v-md-editor>
            <!-- <textarea type="text" rows="20" v-model="contentVal"
            style="box-shadow:none"
            class="w-full pt-12 text-xl tracking-wider border-none resize-none outline-none"
            placeholder="写下你的想法..."></textarea> -->
        </div>
        <div class="w-full h-64"></div>
      </div>
      <div class="lg:col-span-1"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps, ContentProps } from '@/model/model'
import { useRoute } from 'vue-router'
import AddCoverButton from '@/components/draft/AddCoverButton.vue'
import { computed } from '@vue/reactivity'
import VueMarkdownEditor, { xss } from '@kangc/v-md-editor'

export default defineComponent({
  name: 'DraftView',
  components: { AddCoverButton },
  setup () {
    const isSubTitle = ref(false)
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const imgUrl = computed(() => store.state.imgUrl.url)
    // 发送请求需要的参数
    const title = computed(() => store.state.article.title)
    const subtitle = computed(() => store.state.article.subtitle)
    const content = computed(() => store.state.article.content)
    const tags = computed(() => store.state.article.tags)
    const image = computed(() => store.state.imgUrl)

    const html = computed(() => {
      if (content.value) {
        return xss.process(VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(content.value))
      }
    })
    // 删除需要单独操作
    const removeImg = () => {
      store.commit('setImgUrl', {})
    }
    const removeSubTitle = () => {
      store.commit('setSubTitle', '')
      article.subtitle = ''
      isSubTitle.value = !isSubTitle.value
    }

    const article = reactive<ContentProps>({
      title: '',
      subtitle: '',
      content: ''
    })
    // 编辑文章模式
    store.commit('setEditMode', !!route.params.id)
    const isEditMode = computed(() => store.state.editMode)
    // 保存草稿模式
    store.commit('setSaveMode', !!route.params.did)
    const isSaveMode = computed(() => store.state.saveDraftMode)

    watch(article, () => {
      store.commit('setArticle', article)
      // 保存草稿 防抖
      if (isSaveMode.value) {
        const sendData = {
          id: route.params.did,
          title: title.value,
          subtitle: subtitle.value,
          html: html.value,
          markdown: content.value,
          tags: tags.value,
          image: image.value.url
        }
        store.commit('setSaveStatus', 'saving')
        store.dispatch('saveDraft', sendData).then(() => {
          setTimeout(() => {
            store.commit('setSaveStatus', 'success')
          }, 500)
        })
      }
    })

    onMounted(() => {
      if (isEditMode.value) {
        // 获取当前文章详情
        store.dispatch('fetchArticleDetailByID', route.params.id).then(() => {
          article.title = store.state.articleDetail.article?.title as string
          article.subtitle = store.state.articleDetail.article?.subtitle as string
          if (article.subtitle) {
            isSubTitle.value = true
          }
          article.content = store.state.articleDetail.article?.markdown as string
          store.commit('setImgUrl', { url: store.state.articleDetail.article?.image })
        })
      }

      if (isSaveMode.value) {
        // 获取当前草稿详情
        store.dispatch('fetchDraftDetail', route.params.did).then(() => {
          article.title = store.state.draftDetail.title
          article.subtitle = store.state.draftDetail.subtitle as string
          if (article.subtitle) {
            isSubTitle.value = true
          }
          article.content = store.state.draftDetail.markdown
          store.commit('setImgUrl', { url: store.state.draftDetail.image })
        })
      }
    })

    return { isSubTitle, imgUrl, removeImg, removeSubTitle, article }
  }
})
</script>
