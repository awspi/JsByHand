// !迭代器


//? es5 ————————————————————————————————————————————

// 所有的迭代器都有一个next方法
//    返回2个属性 value 和 done

function createIteratorES5(items) {
  let i = 0 //闭包
  return {
    next() {
      const done = (i >= items.length)
      const value = done ? undefined : items[i++]
      return {
        done,
        value
      }
    }
  }
}
const iteratorES5 = createIteratorES5([1, 2, 3, 4])

console.log(iteratorES5.next());// { done: false, value: 1 }
console.log(iteratorES5.next());// { done: false, value: 2 }
console.log(iteratorES5.next());// { done: false, value: 3 }
console.log(iteratorES5.next());// { done: false, value: 4 }
console.log(iteratorES5.next());// { done: true, value: undefined }

console.log('————————————————————————————————————————————————————————');

//? es6 ————————————————————————————————————————————
// 使用生成器 创建可迭代对象
//* 默认会为 Symbol.iterator 赋值  生成可迭代对象
function* createIteratorES6(items) {
  for (let i = 0; i < items.length; i++) {
    yield items[i]
  }
}

const iteratorES6 = createIteratorES6([1, 2, 3, 4])
console.log(iteratorES6[Symbol.iterator]); //* [Function: [Symbol.iterator]]
console.log(iteratorES6.next());// { done: false, value: 1 }
console.log(iteratorES6.next());// { done: false, value: 2 }
console.log(iteratorES6.next());// { done: false, value: 3 }
console.log(iteratorES6.next());// { done: false, value: 4 }
console.log(iteratorES6.next());// { done: true, value: undefined }




