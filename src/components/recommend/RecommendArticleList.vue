<template>
  <!-- Tags -->
  <div class="w-full flex items-center h-14 border rounded-t-lg bg-white">
    <RecommendButton/>
  </div>
  <!-- StaticPost -->
  <div class="w-full flex flex-col p-4 items-center h-64 border border-t-0 bg-white">
    <!-- Author -->
    <div class="flex w-full h-10">
      <!-- Avator -->
      <div class="w-11">
        <div class="h-10 w-10 rounded-full overflow-hidden">
          <a href="#">
            <img src="@/assets/image/KKK.jpg" alt="avator">
          </a>
        </div>
      </div>
      <!-- detail -->
      <div class="w-7/12">
        <div class="font-semibold">发腮的汤姆猫</div>
        <div class="text-gray-500 text-sm">2022年10月2日</div>
      </div>
      <!-- Other -->
      <div class="w-4/12"></div>
    </div>
    <!-- Article -->
    <div class="flex w-full h-38 mt-2">
      <div class="w-7/12 mt-1 mr-3">
        <h1 class="font-semibold mb-1">
          <a href="#">GoWeb开发</a>
        </h1>
        <p class="line-clamp-5 mt-2 text-sm text-gray-600">
          <a href="#">Gin框架介绍 Gin是一个用 Go (Golang) 编写的 web 框架。它是一个类似于martini但性能更好的API框架，不同于谢大主导的Beegoweb框架，后者更像是Python语言中的Django框架，内部包含了开发一个web程序所需的各种组件。如果你是性能和高效的追求者，我相信你会像我一样爱上Gin。同时，不同于其他Golang语言的API框架，该框架社区十分活跃，并且主程仍然在不断更新和改进，我们知道通常情况下在选择一个开源的软件或者相关库时，社区的活跃度以及项目的更新情况会非常重要(考虑到后期的维护和性能和特性问题)。另外一方面，该框架官方提供了很多简单的示例来供我们快速运行一个期望的http服务，这对于一个刚转入Golang进行业务开发的同学来说是一个非常好的开始。Gin官方提供的各种HTTP服务示例当然我在很长一段时间也仅是去看官方示例来快速熟悉并实现自己的业务需求，但当有一些特殊的需求时通常去查看官方的具体实现来满足需求，长期如此，不仅耗时且效率极低，因此我产生了将核心源码探究一番的兴趣，希望能通过源码方式来对Gin框架有个深入的学习。</a>
        </p>
      </div>
      <!-- Picture -->
      <a href="#" class="w-5/12">
        <div class="h-4/5">
          <img class="w-full h-full rounded-lg border" src="@/assets/image/Login.svg" alt="">
        </div>
      </a>
    </div>
    <!-- Icons -->
    <div class="w-full flex justify-between items-center">
      <!-- Left -->
      <div class="flex items-center">
        <!-- bookmark -->
        <div @click.prevent="useClickMark" class="ml-1">
          <button v-if="!isClickMark" class="rounded-full p-1 hover:bg-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 100 100" width="20px" height="20px">
              <path d="M24.501,98.001c-1.021,0-2.042-0.245-2.952-0.709C19.361,96.179,18,93.959,18,91.5v-75 C18,10.71,22.71,6,28.5,6h47C81.29,6,86,10.71,86,16.5v13.545c8.23,2.719,14,10.419,14,19.455s-5.77,16.737-14,19.455V91.5 c0,3.326-2.551,6.5-6.056,6.5c-1.387,0-2.858-0.789-3.978-1.607L52.297,79.179L28.322,96.757 C27.215,97.567,25.889,98.001,24.501,98.001z" opacity=".35"/><path fill="#f2f2f2" d="M22.501,96.001c-1.021,0-2.042-0.245-2.952-0.709C17.361,94.179,16,91.959,16,89.5v-75 C16,8.71,20.71,4,26.5,4h47C79.29,4,84,8.71,84,14.5v13.545c8.23,2.719,14,10.419,14,19.455s-5.77,16.737-14,19.455V89.5 c0,2.459-1.361,4.679-3.552,5.793C79.54,95.756,78.521,96,77.5,96c-1.387,0-2.712-0.432-3.831-1.249L50,77.537l-23.678,17.22 C25.215,95.567,23.889,96.001,22.501,96.001z"/><path fill="#f66" d="M26.5,10.5h47c2.209,0,4,1.791,4,4v75L50,69.5l-27.5,20v-75C22.5,12.291,24.291,10.5,26.5,10.5z"/><circle cx="77.5" cy="47.5" r="12.5" fill="#96c362"/><path d="M77.5,63C68.953,63,62,56.047,62,47.5S68.953,32,77.5,32v3C70.607,35,65,40.607,65,47.5S70.607,60,77.5,60V63z" opacity=".35"/><path fill="#f2f2f2" d="M77.5,55c-0.829,0-1.5-0.672-1.5-1.5v-12c0-0.828,0.671-1.5,1.5-1.5s1.5,0.672,1.5,1.5v12 C79,54.328,78.329,55,77.5,55z"/><path fill="#f2f2f2" d="M83.5,49h-12c-0.829,0-1.5-0.672-1.5-1.5s0.671-1.5,1.5-1.5h12c0.829,0,1.5,0.672,1.5,1.5 S84.329,49,83.5,49z"/><path fill="none" stroke="#40396e" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M77.5,33.5v-19 c0-2.209-1.791-4-4-4h-47c-2.209,0-4,1.791-4,4v75l27.5-20l27.5,20v-28c7.732,0,14-6.268,14-14S85.232,33.5,77.5,33.5z"/>
            </svg>
          </button>
          <button v-if="isClickMark" class="rounded-full p-1 bg-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 100 100" width="20px" height="20px">
              <path d="M19.5,98.001c-1.022,0-2.044-0.246-2.955-0.711C14.361,96.179,13,93.959,13,91.5v-75 C13,10.71,17.71,6,23.5,6h47C76.29,6,81,10.71,81,16.5v9.471l2.68,8.246h9.699c2.823,0,5.308,1.804,6.182,4.489 c0.871,2.691-0.078,5.61-2.36,7.27l-7.848,5.701l2.997,9.225c0.871,2.689-0.078,5.608-2.36,7.268 c-1.122,0.812-2.441,1.241-3.821,1.241s-2.699-0.429-3.816-1.238L81,67.19V91.5c0,3.478-3.003,6.5-5.733,6.5 c-1.387,0-2.712-0.432-3.831-1.249L47.767,79.537l-24.445,17.22C22.215,97.567,20.889,98.001,19.5,98.001z" opacity=".35"/><path fill="#f2f2f2" d="M17.5,96.001c-1.022,0-2.044-0.246-2.955-0.711C12.361,94.179,11,91.959,11,89.5v-75 C11,8.71,15.71,4,21.5,4h47C74.29,4,79,8.71,79,14.5v9.471l2.68,8.246h9.699c2.823,0,5.308,1.804,6.182,4.489 c0.871,2.691-0.078,5.61-2.36,7.27l-7.848,5.701l2.997,9.225c0.871,2.689-0.078,5.608-2.36,7.268 c-1.122,0.812-2.441,1.241-3.821,1.241s-2.699-0.429-3.816-1.238L79,65.19V89.5c0,2.459-1.361,4.679-3.552,5.793 C74.54,95.756,73.521,96,72.5,96c-1.387,0-2.712-0.432-3.831-1.249L45,77.537l-23.678,17.22 C20.215,95.567,18.889,96.001,17.5,96.001z"/><path fill="#f66" d="M21.5,10.5h47c2.209,0,4,1.791,4,4v75L45,69.5l-27.5,20v-75C17.5,12.291,19.291,10.5,21.5,10.5z"/><path fill="#ffc571" d="M73.382,51.219c-0.263-0.19-0.572-0.286-0.882-0.286s-0.619,0.096-0.882,0.286l-7.933,5.765 l3.03-9.326c0.2-0.618-0.02-1.296-0.545-1.678l-7.933-5.763h9.805c0.649,0,1.226-0.418,1.427-1.036l3.03-9.327l3.03,9.327 c0.201,0.618,0.777,1.036,1.427,1.036h9.805l-7.933,5.763c-0.525,0.382-0.745,1.06-0.545,1.678l3.03,9.326L73.382,51.219z"/><path d="M60.803,62.5c-0.31,0-0.619-0.096-0.882-0.286c-0.525-0.382-0.745-1.06-0.545-1.678l4.131-12.714l-10.815-7.857 c-0.525-0.382-0.745-1.06-0.545-1.678c0.201-0.618,0.777-1.036,1.427-1.036h13.369l4.131-12.715l2.854,0.928l-4.468,13.751 c-0.201,0.618-0.777,1.036-1.427,1.036H58.19l7.962,5.784c0.525,0.382,0.745,1.06,0.545,1.678l-3.042,9.36l7.963-5.785 l1.764,2.428l-11.697,8.498C61.422,62.404,61.112,62.5,60.803,62.5z" opacity=".35"/><path fill="none" stroke="#40396e" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M91.379,38.716H76.957 L72.5,25V14.5c0-2.209-1.791-4-4-4h-47c-2.209,0-4,1.791-4,4v75l27.5-20l27.5,20V52.433l11.668,8.477l-4.457-13.716L91.379,38.716z"/>
            </svg>
          </button>
        </div>
        <!-- tags -->
        <div class="ml-2 flex items-center">
          <a href="#" class="ml-1">
            <div class="p-1 border rounded-md hover:bg-gray-300">
              <p class="text-xs text-gray-600">Go</p>
            </div>
          </a>
          <a href="#" class="ml-1">
            <div class="p-1 border rounded-md hover:bg-gray-300">
              <p class="text-xs text-gray-600">Web开发</p>
            </div>
          </a>
          <a href="#" class="ml-1">
            <div class="p-1 border rounded-md hover:bg-gray-300">
              <p class="text-xs text-gray-600">+2</p>
            </div>
          </a>
        </div>
      </div>
      <!-- Right -->
      <div class="flex items-center">
        <!-- like -->
        <button @click="useClickLike" :class="{'text-blue-400': isClickLike}" class="flex items-center mr-2 p-1 hover:bg-gray-300 rounded-md">
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
          </svg>
          <p :class="{'text-blue-400': isClickLike, 'text-gray-800': !isClickLike}" class="text-xs ml-1">11</p>
        </button>
        <!-- comment -->
        <a href="#" class="flex items-center p-1 hover:bg-gray-300 rounded-md">
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
          <p class="text-xs text-gray-800 ml-1">2</p>
        </a>
      </div>
    </div>
  </div>

  <RecommendArticle/>

  <div class="h-20 w-full"></div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import RecommendButton from '@/components/recommend/RecommendButton.vue'
import RecommendArticle from '@/components/recommend/RecommendArticle.vue'
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
  name: 'RecommendArticleList',
  components: { RecommendButton, RecommendArticle },
  setup () {
    const { isClickMark, useClickMark } = useClickMarkEffect()
    const { isClickLike, useClickLike } = useClickLikeEffect()
    return { isClickMark, isClickLike, useClickMark, useClickLike }
  }
})
</script>
