// 方法返回一个以给定值解析后的 Promise 对象
//* 传入一个promise/thenable 或者是被promise解析的参数
Promise._resolve = (data) => data instanceof Promise
  //* 参数是 Promise 实例，原封不动地返回这个实例
  ? data
  : new Promise((resolve, reject) => {
    //? Promise.resolve方法会将这个thenable对象转为 Promise 对象
    //? 然后就立即执行thenable对象的then方法
    if (isPromise(data)) { // thenable
      data.then(resolve, reject)
    } else {
      //* 被 Promise 对象解析的参数
      //* 返回一个新的 Promise 对象，状态为resolved
      resolve(data)
    }
  })

//? 判断是否thenable
//1. 对象不为null
//2. 存在 .then方法
const isPromise = (obj) => !!obj && typeof obj.then === 'function'

//!————————————————TEST
const pRes = Promise._resolve('succcccccess')
pRes.then(console.log)
