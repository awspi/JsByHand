//? 实现 Promise.all

/**
 * @description Promise.all() 方法返回一个 Promise 实例
 * 此实例在 iterable 参数内所有的 promise 都“完成（resolved）”或参数中不包含 promise 时回调完成（resolve）
 * 如果参数中  promise 有一个失败（rejected），此实例回调失败（reject），失败原因的是第一个失败 promise 的结果。
 * @param {*} proms  promise数组
 * @returns   返回一个promise
 */
const promiseAll = (proms) => {
  const res = []
  let fulfilledCount = 0
  return new Promise((resolve, reject) => {
    proms.forEach((prom, idx) => {
      Promise.resolve(prom).then((val) => {
        res[idx] = val //? 不能使用push 因为要保证res的顺序
        fulfilledCount++
        if (fulfilledCount === proms.length) {
          resolve(res)
        }
      }, reject)
    })
  })
}

const sleep = (ms) => new Promise(r => void setTimeout(r, ms))


promiseAll([
  sleep(1000).then(d => new Promise(r => r(1))),
  sleep(2000).then(d => new Promise(r => r(2))),
  // sleep(3000).then(d => new Promise(r, j => j(3))),
  sleep(4000).then(d => new Promise(r => r(4))),
  5,
]).then(
  (data) => {
    // data:[1,2,3,4]
    // 传递[pro1,pro2,pro3,4]的话:内部默认处理Promise.resolve(4)
    console.log("--成功", data);
  },
  (reason) => {
    // reason:reason2
    console.log("--失败", reason);
  }
);
