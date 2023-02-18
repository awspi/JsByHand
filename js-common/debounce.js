
// 你一直点 他就一直等 直到你停下来 他才开始计时 计时结束就执行

function debounce(fn, delay) {
  //! 防抖和节流都是利用闭包保存一个timer
  //? 防抖: 每次重复执行 timer存在 就清除timer并更新timer为最新  <--
  //? 节流: 每次重复执行 timer存在 就返回 执行完要把timer置为null
  let timer
  return function (...args) {
    //? 如果定时器还没有结束 就清除 再重新设置定时器
    if (timer) {
      clearTimeout(timer)
    }
    //* setTimeout默认指向window 使用箭头函数
    timer = setTimeout(() => void fn(...args), delay);
  }
}

const debounceFn = debounce((arg) => console.log(arg), 1000)
debounceFn('hello')
