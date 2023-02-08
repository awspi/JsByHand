// repeat(console.log, 5, 1000)
function repeat(fn, timer, wait) {
  return function callback(...args) {
    setTimeout(() => {
      fn(...args);
      timer--;
      if (timer > 0) callback(...args);
    }, wait);
  };
}

rep(console.log, 5, 1000)('123')


function rep(fn, times, timeout) {
  return function cb(...args) {
    setTimeout(() => {
      if (times-- <= 0) return
      fn(...args)//执行一次
      cb(...args)//times不为0 继续调用自身
    }, timeout);
  }
}
