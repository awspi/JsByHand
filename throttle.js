function throttle(fn, delay) {
  let timer
  return function (...args) {
    //? 如果定时器还在,说明这段时间还没有执行 需要等执行完 忽略本次调用
    if (timer) return
    timer = setTimeout(() => {
      fn(...args)
      timer = null
      //? 执行完 timer置为null 好让下一个任务可以调用
    }, delay)
  }
}
const throttleFn = throttle((arg) => console.log(arg), 1000)

throttleFn('hello')

