let activeEffect = null
const wrapper = (fn) => {
  const warpped = (...arg) => {
    activeEffect = fn
    fn(...arg)
  }
  return warpped
}
