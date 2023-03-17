import { createApp } from 'vue'
import AlertToast from '@/components/toast/AlertToast.vue'
import { MessageType } from '@/model/model'

// 组件的函数化调用

const createToast = (type: MessageType, message: string, timeout = 2500) => {
  const toastInstance = createApp(AlertToast, {
    message,
    type
  })
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  toastInstance.mount(mountNode)
  setTimeout(() => {
    toastInstance.unmount()
    document.body.removeChild(mountNode)
  }, timeout)
}

export default createToast
