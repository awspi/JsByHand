//map 处理循环引用
const deepClone = (target, map = new Map()) => {
  //todo 处理: null||基本类型||函数 日期Date 正则RegExp symbol 数组
  //* null || 基础类型 || 函数类型 直接返回
  if (target === null || typeof target !== 'object') return target
  //* 日期
  if (target.constructor === Date) return new Date(target)
  //* 正则
  if (target.constructor === RegExp) return new RegExp(target)
  //* 数组
  if (Array.isArray(target)) {
    const arr = []
    target.forEach(item => void arr.push(deepClone(item, map)))
    return arr
  }
  //* 处理对象类型
  //* 处理循环引用
  if (map.has(target)) return map.get(target)
  //? 浅拷贝一个对象 保证原型链与属性的特性一致
  const clone = Object.create(Object.getPrototypeOf(target), Object.getOwnPropertyDescriptors(target))
  // 添加到map
  map.set(target, clone)

  //* 遍历属性 
  // getOwnPropertyNames 所有自身属性的属性名 包括可枚举和不可枚举 但是不包括symbol
  const keys = Object.getOwnPropertyNames(target)
  const symbols = Object.getOwnPropertySymbols(target);
  //对每个属性进行deepclone 递归
  [...keys, ...symbols].forEach(property => clone[property] = deepClone(clone[property], map))
  return clone
}



//!TEST
const obj = [{
  name: '123',
  age: 22,
  obj2: {
    asd: '123s',
    zxc: 11
  },
}, 2, 3]
const a = deepClone(obj)
console.log(a);

