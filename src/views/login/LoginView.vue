<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
    <div class="flex justify-beetween min-h-screen font-sans">
        <!-- 插图 -->
        <div class="w-1/2">
            <img class="w-full" src="@/assets/image/Login.svg" alt="">
        </div>
        <!-- 登录 -->
        <div class="w-1/2">
            <div class="flex flex-col px-24 py-18">
                <!-- logo -->
                <div class="self-end flex justify-center items-center mt-8">
                    <img src="@/assets/icons/logo.svg" alt="logo">
                    <span class="font-black text-2xl tracking-tight font-mono">manage</span>
                </div>
                <div class="pt-20 pb-6">
                    <h1 class="text-3xl font-bold tracking-wide leading-loose">嗨,欢迎回来！</h1>
                    <span class="font-light text-gray-500">为开发者与技术人员打造的博客社区</span>
                </div>
                <!-- 登录表单 -->
                <ValidateForm @form-submit="onFormSubmit" :label="label">
                    <!-- 邮箱地址 -->
                    <div class="pt-6 pb-3">
                        <label for="email" class="font-light">邮箱地址</label>
                        <ValidateInput type="text" :rules="emailRules" placeholder="请输入邮箱"
                         :icons="require('@/assets/icons/email.svg')" ref="inputRef"/>
                    </div>
                    <!-- 密码 -->
                    <div class="pb-3">
                        <label for="password" class="font-light">密码</label>
                        <ValidateInput type="password" :rules="passwordRules" placeholder="请输入密码"
                        :icons="require('@/assets/icons/lock.svg')"/>
                    </div>
                    <div class="flex justify-between items-center pt-4">
                        <div class="flex items-center">
                            <input type="checkbox" name="remember" id="remember"
                            class="w-5 h-5 rounded bg-white text-orange-500 border border-gray-400 focus:outline-none focus:ring-orange-400">
                            <label for="remember" class="pl-4 font-light text-gray-900">记住我</label>
                        </div>
                        <a class="text-teal-500 hover:text-teal-600" href="#">忘记密码?</a>
                    </div>
                    <!-- 登录按钮 -->
                    <!-- <div class="pt-8">
                        <button type="submit"
                        class="py-4 px-8 w-full text-white bg-orange-500 hover:bg-orange-600 focus:ring-red-100 focus:outline-none rounded-lg shadow-lg">登录</button>
                    </div> -->
                </ValidateForm>
                <div class="pt-4">
                    <div class="font-light text-center text-gray-500">
                        还未注册？
                        <router-link :to="{ name: 'Signup'}" class="font-normal text-teal-500 hover:text-teal-600">创建账户</router-link>
                    </div>
                </div>
                <!-- 分割线 -->
                <div class="flex justify-center items-center pt-6">
                    <hr class="w-full border-gray-400">
                    <span class="px-4 font-light text-gray-500">或</span>
                    <hr class="w-full border-gray-400">
                </div>
                <!-- 微信QQ登录 -->
                <div class="flex justify-between items-center pt-10 space-x-6">
                    <button class="flex justify-center items-center w-1/2 py-4.5 rounded-lg
                     bg-white border border-gray-400 whitespace-nowrap hover:bg-gray-50 focus:outline-none focus:ring-gray-100 focus:ring-4">
                        <img class="pl-3 font-medium" src="@/assets/icons/wechat.svg" alt="">
                        <span>微信登录</span>
                    </button>
                    <button class="flex justify-center items-center w-1/2 py-4.5 rounded-lg bg-blue-500 whitespace-nowrap hover:bg-blue-600 focus:ring-gray-100 focus:ring-4">
                        <img class="pl-3 font-medium" src="@/assets/icons/qq.svg" alt="">
                        <span class="text-white">QQ登录</span>
                    </button>
                </div>
                <div class="flex justify-between items-center pt-14 text-gray-500">
                    <span class="text-gray-500">© 2022 保留所有权利.</span>
                    <span class="flex items-center space-x-1">
                        <a href="" class="text-gray-500 hover:text-gray-400">服务条款</a>
                        <span>&#183;</span>
                        <a href="" class="text-gray-500 hover:text-gray-400">隐私政策</a>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateInput from '@/components/form/ValidateInput.vue'
import ValidateForm from '@/components/form/ValidateForm.vue'
import { RulesProp } from '@/model/model'

export default defineComponent({
  name: 'LoginView',
  components: { ValidateInput, ValidateForm },
  setup () {
    const router = useRouter()
    const store = useStore()

    const label = '登录'
    const emailRules: RulesProp = [
      { type: 'required', message: '邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的邮箱地址格式' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inputRef = ref<any>()
    // 监听提交事件
    const onFormSubmit = (result: boolean) => {
      // 通过验证,下一步动作
      if (result) {
        router.push({ name: 'Recommend' }) // 跳转页面
        store.commit('login') // 改变用户状态
        // localStorage.setItem('isLogin', store.state.user.isLogin)
      }
    }
    return { label, emailRules, passwordRules, inputRef, onFormSubmit }
  }
})
</script>
