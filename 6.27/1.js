// 全排列 
const permute = (str) => {
  if (str.length === 1) return [str]
  const res = []
  for (let i = 0; i < str.length; i++) {
    const curr = str[i]
    const rest = [...str].filter((s) => s !== curr).join('')
    const sub = permute(rest)
    sub.forEach((s) => {
      res.push(curr + s)
    }
    )
  }
  return res
}

console.log(permute('abc'));

//! instanceof

const _instanceof = (left, right) => {
  let proto = left.__proto__
  let prototype = right.prototype
  while (proto) {
    if (proto === prototype) return true
    proto = proto.__proto__
  }
  return false
}
// test
console.log(_instanceof([], Array));

// ————————————————————————————
Function.prototype._call = function (ctx, ...arg) {
  const func = Symbol()
  ctx[func] = this
  const res = arg.length
    ? ctx[func](...arg)
    : ctx[func]()
  delete ctx[func]
  return res
}
// test
const obj = {
  name: 'obj',
  sayName(arg) {
    console.log(this.name, arg);
  }
}
const obj2 = {
  name: 'obj2'
}
obj.sayName._call(obj2)


Function.prototype._bind = function (ctx, args) {
  return (restArgs) => this.apply(ctx, [...args, ...restArgs])
}

// _____

const _new = function (consFn, ...args) {
  const obj = new Object()
  obj.__proto__ = consFn.prototype
  // 执行构造函数
  const res = consFn.apply(obj, args)
  return res instanceof Object
    ? res
    : obj

}
function Animal(name) {
  this.name = name;
}
let animal = _new(Animal, 'dog')
console.log(animal);


function inherit(sub, sup) {
  const prototype = Object.create(sup.prototype)
  prototype.constructor = sub
  sub.prototype = prototype
}


const flatten = (arr) => arr.reduce((pre, cur) => [
  ...pre,
  ...Array.isArray(cur)
    ? flatten(cur)
    : cur
], [])

// test
const animals = ["🐷", ["🐶", "🐂"], ["🐎", ["🐑", ["🐲"]], "🐛"]];

console.log(flatten(animals));


// 


const yellow = () => console.log('yellow')
const red = () => console.log('red')
const green = () => console.log('green')

const task = (time, lightFn) => new Promise((r, _) => {
  setTimeout(() => {
    lightFn()
    r()
  }, time)
})

const runner = async () => {
  await task(3000, yellow)
  await task(1000, red)
  await task(2000, green)
  // runner()
}
runner()
