// call apply bind
// 他们的区别在于传参的方式不同
// call: 依次传入参数
// apply: 传入数组

// bind: 只改变this指向，不执行函数 返回一个this指向改变后的函数

Function.prototype.myCall = function (ctx, ...args) {
  const fn = Symbol()
  ctx[fn] = this
  const res = args.length > 0 ? ctx[fn](...args) : ctx[fn]()
  delete ctx[fn]
  return res
}

Function.prototype.myApply = function (ctx, args) {
  const fn = Symbol()
  ctx[fn] = this
  const res = args ? ctx[fn](...args) : ctx[fn]()
  delete ctx[fn]
  return res
}

Function.prototype.myBind = function (ctx, ...args) {
  const fn = Symbol()
  ctx[fn] = this
  return function (...args2) {
    const res = ctx[fn](...args, ...args2)
    delete ctx[fn]
    return res
  }
}
