function throttle (fn: () => void, time = 2500) {
  let state = false
  return function () {
    if (state) return
    fn()
    state = true
    setTimeout(() => {
      state = false
    }, time)
  }
}

export default throttle
