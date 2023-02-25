// 1- on和once 注册并存储函数
// 2- emit 找到并执行相应的函数
// 3- off 找到并删除相应的函数
// 4- on和once on绑定的事件可以多次执行，除非off; 
//  once绑定的函数emit一次即删除，也可以未执行而被off;所以需要在数据结构中标明on、once
// 5- 事件是有序的，有执行先后顺序

class EventEmitter {
  constructor() {
    this._cache = {}
    // {
    //   eventName: [
    //     {
    //       isOnce,
    //       fn
    //     }
    //   ]
    // }
  }
  on(eventName, fn, isOnce = false) {
    if (!this._cache[eventName]) {
      this._cache[eventName] = []
    }
    this._cache[eventName].push({ fn, isOnce })
  }

  once(eventName, fn) {
    this.on(eventName, fn, true)
  }
  emit(eventName, ...args) {
    if (!this._cache[eventName]) return
    this._cache[eventName].forEach(evt => {
      evt.fn(...args)
      if (evt.isOnce) {
        this.off(eventName, evt.fn)
      }
    })
  }
  off(eventName, fn) {
    // this._cache[eventName] = this._cache[eventName].filter(evt => evt.fn !== fn)
    //*等价于
    const index = this._cache[eventName].findIndex(evt => evt.fn === fn)
    this._cache[eventName].splice(index, 1)
  }
}


//!————————————————————
const e = new EventEmitter();

function fn1(a, b) {
  console.log("fn1", a, b);
}
function fn2(a, b) {
  console.log("fn2", a, b);
}
function fn3(a, b) {
  console.log("fn3", a, b);
}

e.on("key1", fn1);
e.on("key1", fn2);
e.once("key1", fn3); // 只会被触发一次
e.on("key2", fn3);

e.emit("key1", 10, 20); // 触发 fn1、fn2、fn3
console.log('——————————');
e.emit("key1", 11, 22); // 触发 fn1、fn2
console.log('——————————');
e.off("key1", fn1); // 解绑 fn1

e.emit("key1", 100, 200); // 触发 fn2
console.log('——————————');
