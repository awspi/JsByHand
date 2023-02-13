// 并发控制 p-limit

/**
 * 并发控制
 * @param {*} concurrency 并发数
 * @returns 添加并发任务的函数
 */
const pLimit = (concurrency) => {
  const queue = [] //? 排队队列
  let activeCount = 0 //? 进行中的任务数

  const next = () => {
    // 活跃任务数量减一
    activeCount--
    // 如果还有未执行的任务 就取出执行
    if (queue.length > 0) queue.shift()()
  }
  // 运行函数
  const run = async (fn, resolve, ...args) => {
    activeCount++
    //todo 
    //promise包裹一层 执行
    const result = (async () => {
      const promise = fn(...args)
      return promise
    })()
    //执行resolve传入promise 
    resolve(result)
    try {
      // 改变最后返回的 promise 的状态
      await result
    } catch { }
    next()
  }

  //* 入队
  const enqueue = (fn, resolve, ...args) => {
    queue.push(run.bind(null, fn, resolve, ...args))

    if (activeCount < concurrency && queue.length > 0) {
      queue.shift()()// 入队时未满 直接取出执行
    }
  }



  const generator = (fn, ...args) => new Promise((resolve) => {
    enqueue(fn, resolve, ...args)
  })
  return generator
}

//!TEST

const limit = pLimit(2);

function asyncFun(value, delay) {
  return new Promise((resolve) => {
    console.log('start ' + value);
    setTimeout(() => resolve(value), delay);
  });
}

(async function () {
  const arr = [
    limit(() => asyncFun('aaa', 2000)),
    limit(() => asyncFun('bbb', 3000)),
    limit(() => asyncFun('ccc', 1000)),
    limit(() => asyncFun('ddd', 1000)),
    limit(() => asyncFun('eee', 1000))
  ];

  const result = await Promise.all(arr);
  console.log(result);
})();
