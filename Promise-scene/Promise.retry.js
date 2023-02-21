// 请求失败后，加入失败重试功能，
// 如果5次全部失败，则返回失败结果，只要5次尝试中有任意一次成功，则返回成功
/**
 * 
 * @param {*} fn  请求的函数 返回promise
 * @param {*} times 重试次数
 */
Promise.retry = function (fn, times = 5) {
  return new Promise((resolve, reject) => {
    (function run() {
      console.warn('剩余重试次数', times)
      fn().then(resolve).catch(err => {
        if (times--) {
          // 如果重试次数>0 就再次调用
          run()
        } else {
          reject(err)
        }
      })
    })()
  })
}

//! TEST
Promise.retry(retryDemo, 5).then(res => {
  console.log('成功：' + res)
}).catch(err => {
  console.log(err)
})


// 每隔一秒生成一个随机数，大于0.9才resolve
function retryDemo() {
  return new Promise((resolve, reject) => {
    let r = Math.random()
    setTimeout(() => {
      console.log('error', r)
      if (r > 0.7) {
        resolve(r)
      } else {
        reject('error:' + r)
      }
    }, 1000)
  })
}
