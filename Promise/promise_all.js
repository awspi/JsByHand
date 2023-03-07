Promise._all = function (proms) {

  return new Promise((resolve, reject) => {
    try {
      const results = []
      let index = 0
      let fulfilledCount = 0
      for (const prom of proms) {
        const i = index++ //在 promise的executor的外部
        Promise.resolve(prom).then((res) => {
          fulfilledCount++
          results[i] = res
          if (fulfilledCount === index) {
            resolve(results)
          }
        }, reject)
      }
      if (index === 0) resolve(results)
    } catch (err) {
      reject(err)
    }
  })
}

const sleep = (ms) => new Promise(r => void setTimeout(r, ms))


Promise._all([
  sleep(1000).then(d => new Promise(r => r(1))),
  sleep(2000).then(d => new Promise(r => r(2))),
  sleep(3000).then(d => new Promise(r, j => j(3))),
  sleep(4000).then(d => new Promise(r => r(4))),
  5,
]).then(
  (data) => {
    // data:[1,2,3,4]
    // 传递[pro1,pro2,pro3,4]的话:内部默认处理Promise.resolve(4)
    console.log("成功", data);
  },
  (reason) => {
    // reason:reason2
    console.log("失败", reason);
  }
);
