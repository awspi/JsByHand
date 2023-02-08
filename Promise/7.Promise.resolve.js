// 方法返回一个以给定值解析后的 Promise 对象
Promise._resolve = (data) => data instanceof Promise
  //参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例
  ? data
  : new Promise((resolve, reject) => {
    // Promise.resolve方法会将这个thenable对象转为 Promise 对象，然后就立即执行thenable对象的then方法
    if (isPromise(data)) {
      data.then(resolve, reject)
    } else {
      // 参数不是具有then方法的对象
      // 则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved
      resolve(data)
    }
  })
//判断是否thenable
const isPromise = (obj) => !!obj && typeof obj.then === 'function'
