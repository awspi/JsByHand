//closure 应用
function curry(fn) {
  let judge = (...args) => {
    // Function.length
    // length 属性指明函数的形参个数
    // fn.length 永远是当初传入的那个函数的形参个数
    if (args.length === fn.length) return fn(...args)
    return (...restArgs) => judge(...args, ...restArgs)
  }
  return judge
}

//!——)————————————

let addCurry = curry(add)
function add(a, b, c) {
  return a + b + c
}


const res1 = addCurry(1, 2)(3)
const res2 = addCurry(1)(2)(3)
console.log(res1);
console.log(res2);
