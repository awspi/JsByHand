const STATUS = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
}
/**
 * 根据宿主环境node/browser执行微任务
 * @param {*} callback 
 */
const runMicroTask = (callback) => {
  if (globalThis?.process?.globalThis) {
    //* nextTick
    process.nextTick(callback)
  } else if (globalThis.MutationObserver) {
    //* MutationObserver
    const p = document.createElement('p')
    const observer = new globalThis.MutationObserver(callback)
    observer.observe(p, { childList: true })
    p.innerHTML = '#'//触发MutationObserver 执行回调
  } else {
    //* setTimeout macroTask 不是微任务了 只是为了模拟
    setTimeout(callback, 0);
  }
}
/**
 * 判断是否是Promise 即1.是对象 2.存在then方法
 * @param {*} obj 
 * @returns 
 */
const isPromise = (obj) => !!obj && typeof obj === 'object' && typeof obj.then === 'function'

class MyPromise {
  constructor(executor) {
    this._state = STATUS.PENDING
    this._value = undefined
    this._handlersQueue = []
    try {
      executor(this._resolve.bind(this), this._reject.bind(this))
    } catch (error) {
      this._reject(error)
    }
  }
  /**
   * 执行1个任务
   * @param {*} param
   */
  _runOneHandler({ executor, state, resolve, reject }) {
    //! 执行微任务
    runMicroTask(() => {
      //? .then会在队列中放入2个任务 对应fulfilled和rejected两种情况
      //? 但是最终state只能是一个 执行promise的state对应的那一个
      //? 另一个直接return即可
      if (this._state !== state) return
      if (typeof executor !== 'function') {
        this.state = STATUS.FULFILLED ? resolve(this._value) : reject(this._value)
        return
      }
      try {
        const res = executor(this._value)
        if (isPromise(res)) {
          //* 如果执行结果还是一个promise 执行then方法
          res.then(resolve, reject)
        } else {
          resolve(res)
        }
      } catch (error) {
        reject(error)
      }
    })
  }
  /**
   * 运行任务队列
   *
   * @returns 
   */
  _runHandlers() {
    //* 如果任务还在挂起(pending) 就啥也不做
    if (this._state === STATUS.PENDING) return
    while (this._handlersQueue.length) {
      //* 每次从队首取出任务 交给执行函数
      this._runOneHandler(this._handlersQueue.shift())
    }
  }
  /**
   * 统一在这里修改promise的状态
   * @param {*} newState 新的状态
   * @param {*} value 结果
   */
  _changeStatus(newState, value) {
    //* 只有pending 可以修改状态
    if (this._state !== STATUS.PENDING) return
    this._state = newState
    this._value = value
    //? 状态改变-->执行任务队列
    this._runHandlers()
  }
  _resolve(value) {
    this._changeStatus(STATUS.FULFILLED, value)
  }
  _reject(reason) {
    this._changeStatus(STATUS.REJECTED, reason)
  }
  //?————————————————————————————————————————————————————————
  /**
   * 添加任务到任务队列中
   * @param {*} executor 
   * @param {*} state 
   * @param {*} resolve 
   * @param {*} reject 
   */
  _pushToHandlersQueue(executor, state, resolve, reject) {
    this._handlersQueue.push({
      executor, state, resolve, reject
    })
  }
  //? then 
  //todo 
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      //! .then会在队列中放入2个任务 在_runOneHandler方法中会执行对应状态的那一个
      this._pushToHandlersQueue(onFulfilled, STATUS.FULFILLED, resolve, reject)
      this._pushToHandlersQueue(onRejected, STATUS.REJECTED, resolve, reject)
      this._runHandlers()// 执行队列
    })
  }
  //? catch
  catch(onRejected) {
    return this.then(_, onRejected)
  }
  //? finally
  finally(onSettled) {
    const onFulfilled = (data) => {
      onSettled()
      return data
    }
    const onRejected = (reason) => {
      onSettled()
      throw reason
    }
    return this.then(onFulfilled, onRejected)
  }
}

//!——————————————————TEST——————————————————————————————

// const p = new Promise(resolve => {
//   setTimeout(() => {
//     resolve()
//   }, 1000)
// })
// p.then(() => {
//   console.log('onResolvedCallback的第一个函数')
// })
// p.then(() => {
//   console.log('onResolvedCallback的第二个函数')
// })
// p.finally(() => console.log('end'))


const p2 = new MyPromise(resolve => {
  setTimeout(() => {
    resolve()
  }, 1000)
})
p2.then(() => {
  console.log('onResolvedCallback的第1个函数')
})
p2.then(() => {
  console.log('onResolvedCallback的第2个函数')
}).then(() => console.log('onResolvedCallback的第3个函数'))
p2.finally(() => console.log('end'))
