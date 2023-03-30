<template>
    <!-- grid-container -->
    <div class="container grid grid-cols-12 gap-3 relative mx-auto h-full mt-5 font-Poppins">
      <!-- SideBar -->
      <!-- <div class="col-span-2">
        <SideBar/>
      </div> -->
      <!-- Content -->
      <div class="col-span-12">
        <!-- Hero -->
        <section class="relative">
          <div class="container flex flex-col-reverse lg:flex-row items-center gap-12 mt-14 lg:mt-28">
            <!-- Content -->
            <div class="flex flex-1 flex-col items-center lg:items-start">
              <h2 class="text-bookmark-blue text-3xl md:text-4 lg:text-5xl text-center lg:text-left mb-6">
                基于Vue+Gin开发的博客社区
              </h2>
              <p class="text-bookmark-grey text-lg text-center lg:text-left mb-6">
                你可以随心所欲地撰写你的技术博客。社区收集每个人的想法并帮助解决你的技术难题。
              </p>
              <div class="flex justify-center flex-wrap gap-6">
                <a href="/recommend" type="button" class="btn btn-purple hover:bg-bookmark-white hover:text-black">
                  探索博客
                </a>
                <!-- <button type="button" class="btn btn-white hover:bg-bookmark-purple hover:text-white">
                </button> -->
              </div>
            </div>
            <!-- Image -->
            <div class="flex justify-center flex-1 mb-10 md:mb-16 lg:mb-0 z-10">
              <img class="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full" :src="require('@/assets/image/hero-bg.png') " alt="" />
            </div>
          </div>
          <!-- Rounded Rectangle -->
          <div
            class="
              hidden
              md:block
              overflow-hidden
              bg-bookmark-purple
              rounded-l-full
              absolute
              h-80
              w-2/4
              top-32
              right-0
              lg:
              -bottom-28
              lg:-right-36
            "
          ></div>
        </section>
        <!-- Features -->
        <section class="bg-bookmark-white py-20 mt-20 lg:mt-60">
          <!-- Heading -->
          <div class="sm:w-3/4 lg:w-5/12 mx-auto px-2">
            <h1 class="text-3xl text-center text-bookmark-blue">特点</h1>
            <p class="text-center text-bookmark-grey mt-4">
              随时撰写你的技术文章并分享到社区
            </p>
          </div>
          <!-- Feature #1 -->
          <div class="relative mt-20 lg:mt-24">
            <div class="container flex flex-col lg:flex-row items-center justify-center gap-x-24">
              <!-- Image -->
              <div class="flex flex-1 justify-center z-10 mb-10 lg:mb-0">
                <img
                  class="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full"
                  :src="require('@/assets/image/illustration-features-tab-1.png')"
                  alt=""
                />
              </div>
              <!-- Content -->
              <div class="flex flex-1 flex-col items-center lg:items-start">
                <h1 class="text-3xl text-bookmark-blue">一键收藏</h1>
                <p class="text-bookmark-grey my-4 text-center lg:text-left sm:w-3/4 lg:w-full">
                  将你的收藏整理成书签集，便于你随时查阅。
                </p>
                <a href="/bookmarks" type="button" class="btn btn-purple hover:bg-bookmark-white hover:text-black">更多信息</a>
              </div>
            </div>
            <!-- Rounded Rectangle -->
            <div
              class="
                hidden
                lg:block
                overflow-hidden
                bg-bookmark-purple
                rounded-r-full
                absolute
                h-80
                w-2/4
                -bottom-24
                -left-36
              "
            ></div>
          </div>
          <!-- Feature #2 -->
          <div class="relative mt-20 lg:mt-52">
            <div class="container flex flex-col lg:flex-row-reverse items-center justify-center gap-x-24">
              <!-- Image -->
              <div class="flex flex-1 justify-center z-10 mb-10 lg:mb-0">
                <img
                  class="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full"
                  :src="require('@/assets/image/illustration-features-tab-2.png')"
                  alt=""
                />
              </div>
              <!-- Content -->
              <div class="flex flex-1 flex-col items-center lg:items-start">
                <h1 class="text-3xl text-bookmark-blue">一键搜索</h1>
                <p class="text-bookmark-grey my-4 text-center lg:text-left sm:w-3/4 lg:w-full">
                  帮助你找到你需要的文章,解决你的技术难题。
                </p>
              </div>
            </div>
            <!-- Rounded Rectangle -->
            <div
              class="
                hidden
                lg:block
                overflow-hidden
                bg-bookmark-purple
                rounded-l-full
                absolute
                h-80
                w-2/4
                -bottom-24
                -right-36
              "
            ></div>
          </div>
          <!-- Feature #3 -->
          <div class="relative mt-20 mb-20 lg:mt-52">
            <div class="container flex flex-col lg:flex-row items-center justify-center gap-x-24">
              <!-- Image -->
              <div class="flex flex-1 justify-center z-10 mb-10 lg:mb-0">
                <img
                  class="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full"
                  :src="require('@/assets/image/illustration-features-tab-3.png')"
                  alt=""
                />
              </div>
              <!-- Content -->
              <div class="flex flex-1 flex-col items-center lg:items-start">
                <h1 class="text-3xl text-bookmark-blue">保存你的草稿</h1>
                <p class="text-bookmark-grey my-4 text-center lg:text-left sm:w-3/4 lg:w-full">
                  你可以随时保存你的草稿，以防丢失。
                </p>
                <a href="/drafts" type="button" class="btn btn-purple hover:bg-bookmark-white hover:text-black">更多信息</a>
              </div>
            </div>
            <!-- Rounded Rectangle -->
            <div
              class="
                hidden
                lg:block
                overflow-hidden
                bg-bookmark-purple
                rounded-r-full
                absolute
                h-80
                w-2/4
                -bottom-24
                -left-36
              "
            ></div>
          </div>
        </section>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexContent'
})
</script>
