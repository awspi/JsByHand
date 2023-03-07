/**
 * 一旦迭代器中的某个 promise 解决或拒绝，返回的 promise 就会解决或拒绝。
 * 返回的Promise与第一个有结果的一致
 * 内部按传入数组顺序进行Promise.resolve即可
 * @param {iterator} proms
*/
Promise._race = (proms) => new Promise((resolve, reject) => {
  //todo 是否可迭代
  // 按顺序执行 传入外层的resolve方法 首先出结果的就会先返回
  proms.forEach(p => void Promise.resolve(p).then(resolve, reject))
})


//!——————————————————————————TEST
let p1 = new Promise(resolve => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(2)
  }, 2000)
})
let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3)
  }, 3000)
})

Promise._race([p1, p2, p3]).then(res => {
  console.log(res);
}).catch(err => {
  console.log('err', err);
})

