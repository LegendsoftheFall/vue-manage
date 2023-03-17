<template>
    <!-- Navbar -->
    <header>
        <nav class="container mx-auto p-2">
            <!-- flex-container -->
            <div class="flex items-center justify-between">
                <!-- Logo -->
                <a href="http://localhost:8080/recommend" class="pt-2 flex justify-center items-center">
                    <img src="@/assets/icons/logo.svg" alt="">
                    <span class="font-black text-2xl tracking-tight font-mono">manage</span>
                </a>
                <div class=" flex justify-center items-center">
                  <!-- 保存状态 -->
                  <div class="p-2 flex justify-center items-center">
                    <div v-if="saveStatus === 'success'" class="flex justify-center items-center text-green-500">
                      <svg class="bi bi-cloud-check mr-2"  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                        <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
                      </svg>
                      <p class="mr-2">已保存</p>
                    </div>
                    <div v-if="saveStatus === 'saving'" class="flex justify-center items-center text-gray-500">
                      <svg class="bi bi-arrow-clockwise mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                      </svg>
                      <p class="mr-2">正在保存</p>
                    </div>
                  </div>
                  <!-- 发布按钮 -->
                  <button @click="isClick = !isClick" class="px-5 py-1 bg-blue-600 hover:bg-blue-500 hover:shadow-md rounded-md">
                    <p v-if="!isEditMode" class="text-white text-lg font-semibold tracking-widest">发布</p>
                    <p v-if="isEditMode" class="text-white text-lg font-semibold tracking-widest">更新</p>
                  </button>
                </div>
            </div>
        </nav>
    </header>
    <!-- 发布侧边栏 -->
    <div v-if="isClick"
    class="fixed top-0 bottom-0 right-0 z-50 overflow-y-auto lg:w-2/5 sm:w-full bg-white border-l shadow-lg">
      <div class="px-6 py-5">
        <!-- 按钮 -->
        <div class="flex justify-between items-center">
            <!-- 关闭按钮 -->
            <button @click="isClick = !isClick" class="flex justify-center items-center px-3 py-1 rounded-md hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span class="pl-1">关闭</span>
            </button>
            <!-- 发布按钮 -->
            <button :disabled="status === 'uploading' || status === 'success'" @click="publishValidation"
            class="px-9 py-2 bg-blue-600 hover:bg-blue-500 hover:shadow-md rounded-md">
                <!-- 准备状态 -->
                <div v-if="status === 'ready'" class="text-white text-lg font-semibold tracking-widest">
                  <p v-if="!isEditMode">发布</p>
                  <p v-if="isEditMode">更新</p>
                </div>
                <!-- 上传状态 -->
                <div v-if="status === 'uploading'" class="flex justify-center items-center text-white font-semibold tracking-widest">
                  <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                  </svg>
                  <p v-if="!isEditMode" class="tracking-wider pl-1">正在发布...</p>
                  <p v-if="isEditMode" class="tracking-wider pl-1">正在更新...</p>
                </div>
                <!-- 上传成功 -->
                <div v-if="status === 'success'" class="flex justify-center items-center text-white font-semibold tracking-widest">
                  <svg class="w-5 h-5 animate-bounce" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <p v-if="!isEditMode" class="tracking-wider pl-1">发布成功</p>
                  <p v-if="isEditMode" class="tracking-wider pl-1">更新成功</p>
                </div>
            </button>
        </div>
        <hr class="w-full mt-4 border-slate-200">
        <!-- 选择标签 -->
        <div class="w-full py-8 px-5">
            <span class="text-lg font-semibold tracking-wider">选择标签</span>
            <!-- 选择标签按钮 -->
            <SelectButton/>
        </div>
        <hr class="w-full mt-4 border-slate-200">
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// import MarkdownIt from 'markdown-it'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps, UploadStatus } from '@/model/model'
import SelectButton from '@/components/button/SelectButton.vue'
import { computed } from '@vue/reactivity'
import createToast from '@/hooks/useCreateToast'
import VueMarkdownEditor, { xss } from '@kangc/v-md-editor'

export default defineComponent({
  name: 'GlobalHeader',
  components: { SelectButton },
  setup () {
    // const md = new MarkdownIt()
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const router = useRouter()
    const status = ref<UploadStatus>('ready')
    const saveStatus = computed(() => store.state.saving)
    const isClick = ref(false)
    const title = computed(() => store.state.article.title)
    const subtitle = computed(() => store.state.article.subtitle)
    const content = computed(() => store.state.article.content)
    // const html = computed(() => {
    //   if (content.value) {
    //     return md.render(content.value)
    //   }
    // })
    const html = computed(() => {
      if (content.value) {
        return xss.process(VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(content.value))
      }
    })
    const tags = computed(() => store.state.article.tags)
    const imageUrl = computed(() => store.state.imgUrl)

    // 编辑模式
    const isEditMode = computed(() => store.state.editMode)

    const publishValidation = () => {
      if (title.value === '' || title.value.length < 5) {
        createToast('error', '文章标题不能少于5个字')
        return
      }
      if (content.value === '') {
        createToast('error', '请输入文章内容')
        return
      }
      if (tags.value.length < 1) {
        createToast('warning', '请选择标签')
        return false
      }

      status.value = 'uploading'

      const actionName = isEditMode.value ? 'editArticle' : 'createArticle'
      const sendData = isEditMode.value
        ? {
            id: route.params.id,
            authorID: store.state.articleDetail.article?.authorID,
            title: title.value,
            subtitle: subtitle.value,
            html: html.value,
            markdown: content.value,
            tags: tags.value,
            image: imageUrl.value.url
          }
        : {
            did: route.params.did,
            title: title.value,
            subtitle: subtitle.value,
            html: html.value,
            markdown: content.value,
            tags: tags.value,
            image: imageUrl.value.url
          }

      store.dispatch(actionName, sendData).then(resp => {
        status.value = 'success'
        const id = resp.data.id
        setTimeout(() => {
          router.push({ name: 'Article', params: { id: id } })
        }, 2000)
        // 取得resp的postID,跳转到对应文章页面
      }).catch(error => {
        status.value = 'uploading'
        setTimeout(() => {
          status.value = 'ready'
        }, 4000)
        createToast('error', '服务器繁忙!')
        console.log(error)
      })
    }

    return { isClick, isEditMode, status, saveStatus, publishValidation }
  }
})
</script>
