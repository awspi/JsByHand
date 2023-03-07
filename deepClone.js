const deepClone = (target, map = new Map()) => {
  //? 需要考虑函数、正则、日期、ES6新对象
  //* 基础类型 或者是 函数类型
  if (target === null || typeof target !== 'object') return target
  //* 日期
  if (target.constructor === Date) return new Date(target)
  //* 正则
  if (target.constructor === RegExp) return new RegExp(target)
  //* 循环引用
  if (map.has(target)) return map.get(target)//* 如果在map中已经存在,就直接取出之前的拷贝
  // 设置一个拷贝 保证原型链与属性的特性一致
  const clone = Object.create(Object.getPrototypeOf(target), Object.getOwnPropertyDescriptors(target))

  // 添加到map
  map.set(target, clone)
  //* 遍历属性 
  // getOwnPropertyNames 所有自身属性的属性名 包括可枚举和不可枚举 但是不包括symbol
  const keys = Object.getOwnPropertyNames(target)
  // symbol
  const symbols = Object.getOwnPropertySymbols(target);//加个;
  //对每个属性进行deepclone 递归
  [...keys, ...symbols].forEach(key => clone[key] = deepClone(clone[key], map))
  return clone
}

const obj = {
  name: '123',
  age: 22,
  obj2: {
    asd: '123s',
    zxc: 11
  },
}


const a = deepClone(obj)
console.log(a);
