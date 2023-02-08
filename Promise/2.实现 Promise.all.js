/**
   * 得到一个新的Promise，该Promise的状态取决于proms的执行
   * proms是一个迭代器，包含多个Promise
   * 全部Promise成功，返回的Promise才成功，数据为所有Promise成功的数据，并且顺序时按照传入的顺序排列
   * 只要有一个Promise失败，则返回的Promise失败，原因是第一个Promise失败的原因
   * @param {iterator} proms
   */
Promise._all = (proms) => {
  if (proms == null || typeof proms[Symbol.iterator] !== "function") {
    throw new TypeError(`${proms} is not a iterable`)
  } else {
    return new Promise((resolve, reject) => {
      // 该方法的参数需为一个可迭代对象
      try {
        const results = []//每个promise 成功 后的结果
        let count = 0// Promise计数总数
        let fulfilledCount = 0// 已完成的数量
        for (prom of proms) {
          //* 思考：如何保证数组是有序的? 如何知道啥时候所有promise都完成?
          let i = count  // 保存一下当前下标
          count++
          // resolve包一下prom,处理有直接写数字的情况
          Promise.resolve(prom).then((data) => {
            //.then在微任务队列 此时promise已经完成
            fulfilledCount++
            results[i] = data
            // results.push(data);不能用push 因为返回顺序不一定 
            console.log('fulfilledCount', fulfilledCount, data)
            if (fulfilledCount === count) {
              resolve(results)
              console.log('全部完成')
            }
          }, reject)
        }
        // 特殊情况1：传递空数组
        if (count === 0) {
          resolve(results);
        }
      } catch (err) {
        reject(err)
        console.error(err);
      }
    })
  }
}

// Promise._all([
//   Promise.resolve(1),
//   Promise.resolve(2),
//   Promise.resolve(3),
//   4,
// ]).then(
//   (data) => {
//     // data:[1,2,3,4]
//     // 传递[pro1,pro2,pro3,4]的话:内部默认处理Promise.resolve(4)
//     console.log("成功", data);
//   },
//   (reason) => {
//     // reason:reason2
//     console.log("失败", reason);
//   }
// );

Promise._all(1).then(
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

