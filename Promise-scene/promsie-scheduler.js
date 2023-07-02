//! 实现有并行限制的 Promise 调度器
class Scheduler {
  constructor(max) {
    this._max = max//最大并发
    this._count = 0//当前并发数
    this._queue = []//阻塞中的任务队列
  }
  async add(fn) {
    if (this._count >= this._max) {
      // 若当前正在执行的任务，达到最大容量max
      // 阻塞在队列 resolve才能继续运行 由执行结束的任务从队首执行resolve
      // console.log('加入到阻塞队列:', fn);
      await new Promise((resolve) => this._queue.push(resolve))
    }
    this._count++
    // 使用await执行此函数
    console.log('_count', this._count);
    const res = await fn()
    this._count--
    this._queue.length && this._queue.shift()()//执行resolve 释放阻塞的promise
    // 返回函数执行的结果
    return res
  }
}

//延迟函数
const sleep = time => new Promise(resolve => setTimeout(resolve, time))

// 添加异步任务
// time: 任务执行的时间
// val: 参数
const scheduler = new Scheduler(2)
const addTask = (time, val) => {
  //传入add的函数一定要是个promis 因为需要await执行
  scheduler.add(() => sleep(time).then(() => console.log(val)))
}

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(1000, '4');
addTask(1000, '4');
addTask(1000, '4');
addTask(1000, '4');

