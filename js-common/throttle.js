function throttle(fn, delay) {
  //! 防抖和节流都是利用闭包保存一个timer
  //? 防抖: 每次重复执行 timer存在 就清除timer并更新timer为最新 
  //? 节流: 每次重复执行 timer存在 就返回 执行完要把timer置为null <--
  let timer
  return function (...args) {
    //* 如果定时器还在,说明当前有一个任务正在等待执行 执行结束之前需要忽略其他调用
    if (timer) return
    setTimeout(() => {
      fn(...args)
      //* 执行完 timer置为null 以便下一个任务可以调用
      timer = null
    }, delay)
  }
}

const throttleFn = throttle((arg) => console.log(arg), 1000)
throttleFn('hello')

function throttle(fn, delay) {
  let timer
  return function (...args) {
    if (timer) return
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, delay);
  }
}
