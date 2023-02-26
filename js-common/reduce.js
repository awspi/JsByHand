// reduce() 方法对数组中的每个元素按序执行一个由您提供的 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。
// reduce接受两个参数，一个是回调函数，另一个就是初始值。而回调函数又有四个参数，分别是：
// ● accumulator 累加器
// ● currentValue 当前值
// ● index 当前索引
// ● array 调用reduce的数组

Array.prototype._reduce = function (callbackFn, initialValue) {
  if (typeof callbackFn !== 'function') return
  let accumulator = initialValue || 0
  //? 传入初始值的时候，reduce中的index 是从0开始，没有传入初始值为1
  let currentIndex = initialValue ? 0 : 1
  for (; currentIndex < this.length; currentIndex++) {
    accumulator = callbackFn(accumulator, this[currentIndex], currentIndex, this)
  }
  return accumulator
}

//!————————————————————————

const animals = ["🐷", ["🐶", "🐂"], ["🐎", ["🐑", ["🐲"]], "🐛"]];

const flatten = (arr) => arr._reduce((prev, curr) => [...prev, ...Array.isArray(curr) ? flatten(curr) : curr], [])

console.log(flatten(animals));
