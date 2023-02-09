// on(event,fn)：监听event事件，事件触发时调用fn函数；
// once(event,fn)：为指定事件注册一个单次监听器，单次监听器最多只触发一次，触发后立即解除监听器；
// emit(event,arg1,arg2,arg3...)：触发event事件，并把参数arg1,arg2,arg3....传给事件处理函数；
// off(event,fn)：停止监听某个事件

class EventEmitter {
  constructor() {
    this._events = {}
    // eventA:[fn1,fn2]
  }
  on(event, fn) {
    // 逻辑赋值结合空值合并 实现懒初始化
    (this._events[event] ??= []).push(fn)
    return this
  }
  // 注册一次就是执行完自己执行off
  once(event, fn) {
    let wrapFn = (...args) => {
      fn.apply(this, args)
      this.off(event, wrapFn)
    }
    this.on(event, wrapFn)
    return this
  }
  emit(event, ...args) {
    this._events[event]?.forEach(ev => ev.apply(this, args))
  }
  off(event, fn) {
    this._events[event] = this._events[event]?.filter(ev => ev !== fn)
  }
}

const ev = new EventEmitter()
const fn = (arg) => console.log(arg)
ev.on('1', fn)
ev.emit('1', 'qew') //
ev.off('1', fn)
ev.emit('1', 'asd')
ev.once('1', fn)
ev.emit('1', 'zcx')//
ev.emit('1', 'zcx2')
