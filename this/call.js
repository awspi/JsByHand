Function.prototype._call = function (thisArg, ...args) {
  // 显式绑定 到ctx上
  const ctx = thisArg || window
  const arg = args || []
  const func = Symbol()
  ctx[func] = this
  const res = arg.length ? ctx[func](...args) : ctx[func]()
  delete ctx[func]
  return res
}

const obj = {
  name: "pithy",
  age: 22
}

function add(a, b) {
  return {
    name: this.name,
    'a+b': a + b
  }
}

const res = add._call(obj, 3, 6)
console.log(res);


