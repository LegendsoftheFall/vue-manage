<template>
  <div class="flex items-center mt-2 w-full rounded-lg border border-gray-400 focus-within:shadow-lg focus-within:border-orange-500" >
      <div class="flex justify-center items-center pl-6">
          <img class="w-6 h-6 font-light pointer-events-none" :src="icons" alt="">
      </div>
      <input v-bind="$attrs" name="email"
      class="px-4 py-4.5 w-full focus:outline-none font-light border-0 focus:ring-0"
      :value="inputRef.val" @input="updateValue" @blur="validateInput">
  </div>
  <span class="text-red-500" v-if="inputRef.error">{{inputRef.message}}</span>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, onMounted } from 'vue'
import { RulesProp } from '@/model/model'
import { emitter } from './ValidateForm.vue'
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,20}$/
// 定义规则

export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    icons: String
  },
  inheritAttrs: false,
  setup (props, context) {
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })
    const updateValue = (e: Event) => {
      // 更新字段
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      // 发送事件
      context.emit('update:modelValue', targetValue)
    }
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = (inputRef.val.trim() !== '')
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            case 'password':
              passed = passwordReg.test(inputRef.val)
              break
            case 'custom':
              passed = rule.validator ? rule.validator() : true
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }
    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })
    return { inputRef, validateInput, updateValue }
  }
})
</script>

<!-- Form组件需要Input组件的数据,是消息的订阅者.Input是消息的提供者.
  Input发布消息,emitter.emit('form-item-created', validateInput),
  From中的callback触发调用
-->
