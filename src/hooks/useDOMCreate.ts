import { onUnmounted } from 'vue'

// 防止渲染在应用 DOM 结构里很深的地方
function useDOMCreate (nodeID: string) {
  const node = document.createElement('div')
  node.id = nodeID
  document.body.appendChild(node)
  onUnmounted(() => {
    document.body.removeChild(node)
  })
}

export default useDOMCreate
