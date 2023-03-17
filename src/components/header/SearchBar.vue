<template>
    <div class="flex items-center border rounded-md bg-white dark:bg-black
    dark:ring-0 dark:border-1 dark:border-gray-600 ring-gray-300 ring-1
     focus-within:ring-blue-300" action="">
        <input maxlength="50" class="seach-text pr-4 pl-5 py-2 rounded-l-md
           dark:bg-black dark:ring-0 dark:border dark:border-1 dark:border-gray-300
         "
            type="text" placeholder="搜索文章/标签/用户" v-model="keyword">
        <div :class="isType ? 'bg-blue-100 dark:bg-blue-600' : 'bg-gray-3 dark:bg-gray-700'" class=" rounded-md z-99 my-1 mr-1">
            <svg @click="onClick" :class="isType ? 'text-blue-500' : ''" class="dark:text-white fill-current mx-4 my-2 cursor-pointer" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="24px" height="24px">
                <path d="M 20.5 6 C 12.509634 6 6 12.50964 6 20.5 C 6 28.49036 12.509634 35 20.5 35 C 23.956359 35 27.133709 33.779044 29.628906 31.75 L 39.439453 41.560547 A 1.50015 1.50015 0 1 0 41.560547 39.439453 L 31.75 29.628906 C 33.779044 27.133709 35 23.956357 35 20.5 C 35 12.50964 28.490366 6 20.5 6 z M 20.5 9 C 26.869047 9 32 14.130957 32 20.5 C 32 23.602612 30.776198 26.405717 28.791016 28.470703 A 1.50015 1.50015 0 0 0 28.470703 28.791016 C 26.405717 30.776199 23.602614 32 20.5 32 C 14.130953 32 9 26.869043 9 20.5 C 9 14.130957 14.130953 9 20.5 9 z"/>
            </svg>
        </div>
    </div>
</template>

<script lang="ts">
import router from '@/router'
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  name: 'SearchBar',
  setup () {
    const isType = ref(false)
    const keyword = ref('')

    watch(() => keyword.value, () => {
      console.log('输入的关键词', keyword.value)
      isType.value = true
      if (keyword.value === '') {
        isType.value = false
      }
    })
    // 点击搜索后跳转到搜索页面,根据传入的参数获取数据
    const onClick = () => {
      if (keyword.value === '') {
        return
      }
      console.log('点击搜索并带着数据跳转到搜索页面')
      router.push(`/search/tag?q=${keyword.value}`)
    }
    return { onClick, isType, keyword }
  }
})
</script>

<style scoped>
.seach-text{
    outline: none;
    box-shadow: none;
    border: none;
}
</style>
