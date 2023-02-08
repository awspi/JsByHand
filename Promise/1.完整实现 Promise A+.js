// 记录Promise的三种状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";


/**
 * 1. new Promise时，需要传递一个 executor 执行器，执行器立刻执行
 * 2. executor 接受两个参数，分别是 resolve 和 reject
 * 3. promise 只能从 pending 到 rejected, 或者从 pending 到 fulfilled
 * 4. promise 的状态一旦确认，就不会再改变
 * 5. promise 都有 then 方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled, 
 *      和 promise 失败的回调 onRejected
 * 6. 如果调用 then 时，promise已经成功，则执行 onFulfilled，并将promise的值作为参数传递进去。
 *      如果promise已经失败，那么执行 onRejected, 并将 promise 失败的原因作为参数传递进去。
 *      如果promise的状态是pending，需要将onFulfilled和onRejected函数存放起来，等待状态确定后，再依次将对应的函数执行(发布订阅)
 * 7. then 的参数 onFulfilled 和 onRejected 可以缺省
 * 8. promise 可以then多次，promise 的then 方法返回一个 promise
 * 9. 如果 then 返回的是一个结果，那么就会把这个结果作为参数，传递给下一个then的成功的回调(onFulfilled)
 * 10. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败的回调(onRejected)
 * 11.如果 then 返回的是一个promise，那么会等这个promise执行完，promise如果成功，
 *   就走下一个then的成功，如果失败，就走下一个then的失败
 */

class MyPromise {
  constructor(executor) {
    this._state = PENDING
    this._value = undefined
    this._handlers = [] //? 处理函数形成的队列
    try {
      executor(this._resolve.bind(this), this._reject.bind(this))//(resolve reject)=>
    } catch (err) {
      this._reject(err)
      console.error(err)
    }
  }

  _changeState(newState, value) {
    if (this._state !== PENDING) return
    this._state = newState
    this._value = value
    this._runHandlers()//todo 状态变化，执行队列
  }
  // resolve(100)
  _resolve(data) {
    this._changeState(FULFILLED, data)
  }
  // resolve(100)
  _reject(reason) {
    this._changeState(REJECTED, reason)
  }
  // 执行队列
  _runHandlers() {
    // 目前任务仍在挂起
    if (this._state === PENDING) return

    while (this._handlers[0]) {
      // 从队首开始执行
      this._runOneHandler(this._handlers.shift())
    }
  }
  // 处理一个handler
  _runOneHandler({ executor, state, resolve, reject }) {
    // 执行微任务
    runMicroTask(() => {
      //? 函数的状态和promise的状态相等才会执行
      if (this._state !== state) return
      if (typeof executor !== 'function') {
        //? 传递后续处理并非一个函数
        this._state === FULFILLED ? resolve(this._value) : reject(this._value)
        return
      }
      try {
        const res = executor(this._value)
        // 如果执行结果还是一个promise
        if (isPromise(res)) {
          res.then(resolve, reject)
        } else {
          resolve(res)
        }
      } catch (err) {
        reject(err)
        console.error(err);
      }
    })
  }

  // 向处理队列中添加一个函数
  _pushHandler(executor, state, resolve, reject) {
    this._handlers.push({
      executor,
      state,
      resolve,
      reject
    })
  }

  //then
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this._pushHandler(onFulfilled, FULFILLED, resolve, reject);
      this._pushHandler(onRejected, REJECTED, resolve, reject);
      this._runHandlers()// 执行队列
    })
  }

  // catch
  catch(onRejected) {
    return this.then(null, onRejected)
  }

  // finally
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

//判断是否是Promise 即1.是对象 2.存在then方法
const isPromise = (obj) => !!obj && typeof obj === 'object' && typeof obj.then === 'function'

// 运行微任务
const runMicroTask = (cb) => {
  if (globalThis.process && globalThis.process.nextTick) {
    // nextTick microTask
    process.nextTick(cb)
  } else if (globalThis.MutationObserver) {
    // MutationObserver microTask
    const p = document.createElement('p')
    const observer = new globalThis.MutationObserver(cb) //new ~
    observer.observe(p, {
      childList: true// 观察该元素内部的变化
    })
    p.innerHTML = '@'//变化 cb加入到微任务队列
  } else {
    //setTimeout macroTask 不是微任务了 只是为了模拟
    setTimeout(cb, 0)
  }
}

// const p =new Promise(resolve => {
//   setTimeout(() => {
//   resolve()
//   }, 1000)
//   })
//   p.then(() => {
//   console.log('onResolvedCallback的第一个函数')
//   })
//   p.then(() => {
//   console.log('onResolvedCallback的第二个函数')
//   })

const p2 = new MyPromise(resolve => {
  setTimeout(() => {
    resolve()
  }, 1000)
})
p2.then(() => {
  console.log('onResolvedCallback的第一个函数')
})
p2.then(() => {
  console.log('onResolvedCallback的第二个函数')
})
