/**
   * 得到一个新的Promise，该Promise的状态取决于proms的执行
   * proms是一个迭代器，包含多个Promise
   * 全部Promise成功，返回的Promise才成功，数据为所有Promise成功的数据，并且顺序时按照传入的顺序排列
   * 只要有一个Promise失败，则返回的Promise失败，原因是第一个Promise失败的原因
   * @param {iterator} proms
   */


Promise._all = (proms) => {
  //* proms需要可迭代 通过for...of 遍历value
  if (proms === null || typeof proms[Symbol.iterator] !== 'function') {
    throw new TypeError(`${proms} is not a iterable`)
  } else {
    //! 返回一个promise 
    //! 只有当全部proms都fulfilled才resolve
    //! 只要有1个rejected就reject
    return new Promise((resolve, reject) => {
      try {
        const results = [] //每个promise 成功 后的结果
        let total = 0 // Promise计数总数 同时作为保存prom的下标
        let fulfilledCount = 0 // 已完成的数量
        for (const prom of proms) {
          //* 思考：如何保证数组是有序的? 如何知道啥时候所有promise都完成?
          //* 临时保存下标 在then方法中使用该下标保存在results数组中
          let i = total++ //* 保存一下当前下标 并+1
          //resolve包一下prom,处理有直接写返回值的情况
          Promise.resolve(prom).then((data) => {
            fulfilledCount++
            results[i] = data//* 保存在results数组中
            // results.push(data);不能用push 因为返回顺序不一定 
            console.log('完成了一个promise', '完成总数', fulfilledCount, '下标', i, '返回值', data)
            //————————————————————————————————————————————————————
            //* 全部返回之后 才resolve
            if (fulfilledCount === total) {
              resolve(results)
              console.log('全部完成', results)
            }
          }, reject)//.then的第二个参数也可以传reject 相对于.catch(reject)
        }
        //? 特殊情况1：传递空数组
        if (total === 0) resolve(results)

      } catch (error) {
        reject(error)
        console.error(error)
      }
    })
  }
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
Promise._all([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
  Promise.resolve(4),
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

// Promise._all(1).then(
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



