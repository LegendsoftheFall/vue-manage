<template>
    <form>
        <!-- 其他的模板放在默认插槽 -->
        <slot name="default"></slot>
        <slot name="sumbit">
            <!-- 登录按钮 -->
            <div class="pt-8" @click.prevent="submitForm">
                <button type="submit"
                class="py-4 px-8 w-full text-white bg-orange-500 hover:bg-orange-600
                 focus:ring-red-100 focus:outline-none rounded-lg shadow-lg">{{label}}</button>
            </div>
        </slot>
    </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
// 创建监听器
type ValidateFunc = () => boolean
type Events = {
  'form-item-created': ValidateFunc
}
// 实例化 mitt
export const emitter = mitt<Events>()
export default defineComponent({
  name: 'ValidateForm',
  props: {
    label: String
  },
  emits: ['form-submit'],
  setup (props, context) {
    let funcArr: ValidateFunc[] = []
    const submitForm = () => {
      // 循环执行数组 得到最后的验证结果
      const result = funcArr.map(func => func()).every(result => result)
      context.emit('form-submit', result)
    }
    // 将得到的验证函数都存到一个数组中
    const callback = (func: ValidateFunc) => {
      funcArr.push(func)
    }
    // 订阅一个自定义事件
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      // 取消订阅事件
      emitter.off('form-item-created', callback)
      funcArr = []
    })
    return { submitForm }
  }
})
</script>

<!-- Form组件需要Input组件的数据,是消息的订阅者.Input是消息的提供者.
  Form中订阅'form-item-created'事件,一个callback回调函数
-->
