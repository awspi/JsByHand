
// 迭代 可迭代对象的 值 ---> for...of

const values = [1, 2, 3]
for (const val of values) {
  //* for 每执行一次都调用可迭代对象的next方法
  // 当 done为true时退出 所以val不会为undefined
  console.log(val);
}


console.log('————————————————————————————————————————————————————————');
//? 访问对象默认的迭代器
const iterator = values[Symbol.iterator]() //执行 获取迭代器

console.log(iterator.next())// { value: 1, done: false }
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())// { value: undefined, done: true }


console.log('————————————————————————————————————————————————————————');
//? 检测是否为可迭代对象
const isIterator = (obj) => typeof obj[Symbol.iterator] === 'function'

console.log(isIterator('hello'))
console.log(isIterator([1, 2, 3]))
console.log(isIterator(new Map()))
console.log(isIterator(new Set()))
console.log(isIterator(new WeakMap()))//false
console.log(isIterator(new WeakSet()))//false

console.log('————————————————————————————————————————————————————————');

//? 创建可迭代对象
//* HOW? 给对象的[Symbol.iterator]属性添加生成器
//*                             或者是一个含有next方法的对象

const collection = {
  items: [],
  *[Symbol.iterator]() {
    for (let item of this.items) {
      yield item
    }
  }
}
collection.items.push('a')
collection.items.push('b')
collection.items.push('c')
for (let x of collection) {
  console.log(x);
}



