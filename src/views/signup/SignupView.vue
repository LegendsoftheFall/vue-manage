<template>
    <div class="flex justify-beetween min-h-screen font-sans">
        <!-- 登录 -->
        <div class="w-1/2">
            <div class="flex flex-col px-24 py-18">
                <!-- logo -->
                <div class="self-end flex justify-center items-center mt-8">
                    <img src="@/assets/icons/logo.svg" alt="logo">
                    <span class="font-black text-2xl tracking-tight font-mono">manage</span>
                </div>
                <div class=" pb-6">
                    <p class="text-3xl font-bold tracking-wide leading-loose">加入我们！</p>
                    <span class="font-light text-gray-500">为开发者与技术人员打造的博客社区</span>
                </div>
                <!-- 注册表单 -->
                <ValidateForm @form-submit="onFormSubmit" :label="label">
                    <!-- 昵称 -->
                    <div class="pt-6 pb-3">
                        <label for="name" class="font-light">昵称</label>
                        <ValidateInput type="text" :rules="nameRules" placeholder="请输入昵称"
                        :icons="require('@/assets/icons/user.svg')"
                        v-model="formData.name"/>
                    </div>
                    <!-- 邮箱地址 -->
                    <div class="pb-3">
                        <label for="email" class="font-light">邮箱地址</label>
                        <ValidateInput type="text" :rules="emailRules" placeholder="请输入邮箱"
                        :icons="require('@/assets/icons/email.svg')"
                        v-model="formData.email"/>
                    </div>
                    <!-- 密码 -->
                    <div class="pb-3">
                        <label for="password" class="font-light">密码</label>
                        <ValidateInput type="password" :rules="passwordRules" placeholder="请输入密码"
                        :icons="require('@/assets/icons/lock.svg')"
                        v-model="formData.password"/>
                    </div>
                    <!-- 确认密码 -->
                    <div class="pb-3">
                        <label for="password" class="font-light">确认密码</label>
                        <ValidateInput type="password" :rules="rePasswordRules" placeholder="请再次输入密码"
                        :icons="require('@/assets/icons/lock.svg')"
                        v-model="formData.rePassword"/>
                    </div>
                    <!-- 注册按钮
                    <div class="pt-8">
                        <button type="submit"
                        class="py-4 px-8 w-full text-white bg-orange-500 hover:bg-orange-600 focus:ring-red-100 focus:outline-none rounded-lg shadow-lg">注册</button>
                    </div> -->
                </ValidateForm>
                <div class="pt-4">
                    <div class="font-light text-center text-gray-500">
                        已注册
                        <router-link :to="{ name: 'Login'}" class="font-normal text-teal-500 hover:text-teal-600">去登录</router-link>
                    </div>
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
        <!-- 插图 -->
        <div class="w-1/2">
            <img class="w-full" src="@/assets/image/SignUp.svg" alt="">
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateInput from '@/components/form/ValidateInput.vue'
import { RulesProp, GlobalDataProps } from '@/model/model'
import ValidateForm from '@/components/form/ValidateForm.vue'
import axios from 'axios'
import createToast from '@/hooks/useCreateToast'

export default defineComponent({
  name: 'SignupView',
  components: { ValidateInput, ValidateForm },
  setup () {
    const router = useRouter()
    const store = useStore<GlobalDataProps>()
    const label = '注册'
    const formData = reactive({
      email: '',
      name: '',
      password: '',
      rePassword: ''
    })
    const nameRules: RulesProp = [
      { type: 'required', message: '昵称不能为空' }
    ]
    const emailRules: RulesProp = [
      { type: 'required', message: '邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的邮箱地址格式' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    //   { type: 'password', message: '密码必须是由4-20位字母+数字组合' }
    ]
    const rePasswordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' },
      {
        type: 'custom',
        validator: () => {
          return formData.password === formData.rePassword
        },
        message: '两次密码不相同'
      }
    ]
    // 监听提交事件
    const onFormSubmit = (result: boolean) => {
      // 通过验证
      if (result) {
        const payload = {
          username: formData.name,
          email: formData.email,
          password: formData.password
        }
        axios.post('/signup', payload).then(() => {
          if (!(store.state.error.code === 1002)) {
            createToast('success', '注册成功')
            setTimeout(() => {
              router.push({ name: 'Login' })
            }, 2000)
          }
        })
      }
    }
    return { label, nameRules, emailRules, passwordRules, rePasswordRules, formData, onFormSubmit }
  }
})
</script>

<!-- const emailRef = reactive({
    val: '',
    error: false,
    message: ''
})
const validateEmail = () => {
    if (emailRef.val.trim() === '') {
    emailRef.error = true
    emailRef.message = '邮箱地址不能为空'
    } else if (!emailReg.test(emailRef.val)) {
    emailRef.error = true
    emailRef.message = '不是有效的邮箱地址'
    }
} -->
