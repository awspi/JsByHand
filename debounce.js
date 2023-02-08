function debounce(fn, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      //? setTimeout默认指向window 使用箭头函数
      fn(...args)
    }, delay);
  }
}
const debounceFn = debounce((arg) => console.log(arg), 1000)

debounceFn('hello')

