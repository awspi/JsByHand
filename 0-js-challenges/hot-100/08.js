// Array.prototype.map
Array.prototype.map = function (fn) {
  const res = []
  for (let i = 0; i < this.length; i++) {
    // map的回调函数有三个参数，分别是当前项，当前项的索引，原数组
    res.push(fn(this[i], i, this))
  }
  return res
}

//test
const arr = [1, 2, 3]
console.log(arr.map(item => item * 2))
