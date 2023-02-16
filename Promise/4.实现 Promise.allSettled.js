/**
   * 等待所有的Promise有结果后
   * 该方法返回的Promise完成
   * 并且按照顺序将所有结果汇总
   * @param {Iterable} proms
   */
//* 和promise.all的区别:不会因为一个reject全部reject
//* how:把所有的promise都用Promise.resolve()包裹一层
//*     再调用.then(onFulfilled, onRejected)) 处理rejected的值
//? 与 Promise.all 不同的是，当 promise 被 reject 之后，不会直接 reject 
//? 而是记录下该 reject 的值和对应的状态 'rejected' ；
//!依赖Promise.all
Promise._allSettled = (proms) => {
  if (proms === null || typeof proms[Symbol.iterator] !== 'function') {
    return Error('not iterator')
  }
  const arr = []
  const onFulfilled = (value) => ({
    status: 'fulfilled',
    value
  })
  const onRejected = (reason) => ({
    status: 'rejected',
    reason
  })
  for (const p of proms) {
    arr.push(Promise.resolve(p).then(onFulfilled, onRejected))
  }
  return Promise.all(arr)
}
//!————————————————————test

const pro = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(3);
  }, 1000);
});
Promise._allSettled([pro, Promise.resolve(1), Promise.reject(2)]).then(
  (data) => {
    console.log(data);
  }
);
// ---
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promises = [promise1, promise2];
Promise._allSettled(promises).then(
  (data) => {
    console.log(data);
  }
);
