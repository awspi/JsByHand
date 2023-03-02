// 编写代码使得所有数组都具有元素转大写的方法（在自身上修改）
const arr = ['a', 'bc', 'def']
Array.prototype.toUpperCase = function () {
  return this.reduce((prev, curr) => [...prev, curr.split('').map(str => str.toUpperCase()).join('')]
    , [])
}

console.log(arr.toUpperCase()); //[ 'A', 'BC', 'DEF' ]
