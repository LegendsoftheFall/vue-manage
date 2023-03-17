<template>
    <div class="mt-2 w-full">
        <!-- 选择按钮 -->
        <button v-if="tagNameList.length < 5" @click="isClick = !isClick" class="relative flex justify-center items-center px-20 py-3 w-full border rounded-md bg-blue-450 hover:bg-blue-400">
            <p class="text-white overflow-hidden">最多可选择五个标签</p>
        </button>
        <!-- 全部标签 -->
        <div v-if="isClick" :class="{'hidden': tagNameList.length >= 5}" class="absolute z-20 right-10 w-100 h-100 border rounded-lg shadow-lg bg-white overflow-y-auto">
            <!-- 关闭按钮 -->
            <div>
                <button @click="isClick = !isClick" class="absolute top-2 right-2 px-2 py-1 hover:bg-gray-200 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <!-- 标签列表 -->
            <div class="mt-10">
                <div class="flex flex-col w-full">
                    <div v-for="tag in TagList" :key="tag.id" @click="getCurrentID(tag.id),addTagToList(tag.id)">
                        <div :class="{ 'bg-gray-200': tagNumList.includes(tag.id)}" class="w-full h-15 hover:bg-gray-200 flex justify-between items-center cursor-pointer">
                            <div class="flex flex-col pl-3">
                                <p>{{tag.name}}</p>
                                <span class="text-sm text-gray-500">{{tag.num}} 文章</span>
                            </div>
                            <div class="pr-4 rounded-sm overflow-hidden">
                                <img class="w-8 h-8" :src="tag.image" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 已添加的标签 -->
        <div v-for="(tagName,index) in tagNameList" :key="index" class="inline-block mt-3 pl-1 pt-2">
            <span class="flex justify-center items-center py-2 px-3 border rounded-lg hover:bg-gray-200">
              {{tagName}}
              <div @click="removeTag(tagName)" class="pl-1 cursor-pointer">
                  <svg class="w-5 h-5 hover:text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
              </div>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { GlobalDataProps } from '@/model/model'
import { computed } from '@vue/reactivity'
import VueMarkdownEditor, { xss } from '@kangc/v-md-editor'

export default defineComponent({
  name: 'SelectButton',
  setup () {
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const route = useRoute()
    // 取到创建草稿模式
    const isCreateMode = computed(() => store.state.createDraftMode)
    const isClick = ref(false)
    const title = computed(() => store.state.article.title)
    const subtitle = computed(() => store.state.article.subtitle)
    const content = computed(() => store.state.article.content)
    const html = computed(() => {
      if (content.value) {
        return xss.process(VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(content.value))
      }
    })
    const tags = computed(() => store.state.article.tags)
    const image = computed(() => store.state.imgUrl)
    // 未用store
    // const intTagList: number[] = []
    // const tagNumList: string[] = reactive([])
    // const tagNameList: string[] = reactive([])
    // const addTagToList = (id: string) => {
    //   const index = tagNumList.findIndex(item => item === id)
    //   if (index === -1) {
    //     // 若不在数组中添加进数组
    //     tagNumList.push(id)
    //     console.log(tagNumList)
    //     // string[]转换为int
    //     if (tagNumList.length === 5) {
    //       tagNumList.forEach(num => {
    //         intTagList.push(+num)
    //       })
    //       console.log(intTagList)
    //     }
    //   }
    // }
    // const addTagToNameList = (name: string) => {
    //   const index = tagNameList.findIndex(item => item === name)
    //   if (index === -1) {
    //     // 若不在数组中添加进数组
    //     tagNameList.push(name)
    //     console.log(tagNameList)
    //   }
    // }
    // const removeTagFromNum = (id: string) => {
    //   const index = tagNumList.findIndex(item => item === id)
    //   if (index > -1) {
    //     tagNumList.splice(index, 1)
    //     console.log(tagNameList)
    //   }
    // }
    // const removeTag = (name: string) => {
    //   const index = tagNameList.findIndex(item => item === name)
    //   if (index > -1) {
    //     tagNameList.splice(index, 1)
    //     const id = computed(() => store.getters.getTagIDByName(name))
    //     removeTagFromNum(id.value)
    //   }
    // }

    // store版本
    const tagNumList = computed(() => store.state.tagNumberList)
    const tagNameList = computed(() => store.state.tagNameList)
    // 向ID列表中添加tagID
    const addTagToList = (id: string) => {
      store.commit('addTagNumberToList', id)
    }
    // 向Name列表中添加tagName
    const addTagToNameList = (name: string) => {
      store.commit('addTagNameToList', name)
    }
    // 根据ID移除ID列表中的tag
    const removeTagNumber = (id: string) => {
      store.commit('removeTagNumberFromList', id)
    }
    // 移除ID和Name列表中的tag
    const removeTag = (name: string) => {
      store.commit('removeTagNameFromList', name)
      const id = computed(() => store.getters.getTagIDByName(name))
      removeTagNumber(id.value)
    }
    // 请求标签列表
    onMounted(() => {
      store.dispatch('fetchSelectTags')
    })
    // 获取标签列表
    const TagList = computed(() => store.state.tagInfo)
    // 获取点击事件的tagID
    const getCurrentID = (id: string) => {
      const TagName = computed(() => store.getters.getTagNameByID(id))
      addTagToNameList(TagName.value)
    }
    // 获取响应式的由stirng[] -> number[]的tag数组
    const articleTags = computed(() => {
      return store.state.tagNumberList.map(tag => {
        return +tag
      })
    })
    // 监听列表,发生改变去mutation更新文章标签列表
    watch(() => articleTags.value, () => {
      store.commit('setArticleTags', articleTags.value)
      // 若是创建草稿模式,得到标签数组,发送创建草稿请求
      if (isCreateMode.value) {
        const sendData = {
          tags: articleTags.value
        }
        store.dispatch('createDraft', sendData).then(resp => {
          // 取消创建草稿模式
          store.commit('setCreateMode', false)
          // 跳转到草稿页面
          router.replace({ name: 'Draft', params: { did: resp.data.id } })
        })
      }
      // 保存草稿
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
        store.dispatch('saveDraft', sendData).then(() => {
          console.log('保存成功')
        })
      }
    })

    // 编辑模式
    const isEditMode = computed(() => store.state.editMode)
    const aTags = computed(() => store.state.articleDetail.tags)
    console.log('取到的文章标签', aTags)
    if (isEditMode.value) {
      // 遍历数组并依次添加到标签数组
      aTags.value && aTags.value.forEach(tag => {
        store.commit('addTagNumberToList', tag.id)
        store.commit('addTagNameToList', tag.name)
      })
    }
    // 草稿模式
    const isSaveMode = computed(() => store.state.saveDraftMode)
    const dTags = computed(() => store.state.draftDetail.tagSimple)
    console.log('取到的草稿标签', dTags)
    if (isSaveMode.value) {
      // 遍历数组并依次添加到标签数组
      dTags.value && dTags.value.forEach(tag => {
        store.commit('addTagNumberToList', tag.id)
        store.commit('addTagNameToList', tag.name)
      })
    }

    return { isClick, TagList, tagNumList, tagNameList, getCurrentID, addTagToList, removeTag }
  }
})
</script>
