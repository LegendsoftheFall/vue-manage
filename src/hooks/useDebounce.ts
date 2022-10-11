function debounce (fn: () => void, time = 300) {
  let timeout: number | null = null
  return function () {
    timeout && clearTimeout(timeout)
    timeout = setTimeout(fn, time)
  }
}

export default debounce
