// 深拷贝

const deepClone = (target, map = new WeakMap()) => {
  if (typeof target !== 'object' || target === null) return target
  //? 处理循环引用
  if (map.has(target)) return map.get(target)
  // 处理日期
  if (target instanceof Date) return new Date(target)
  // 处理正则
  if (target instanceof RegExp) return new RegExp(target)
  // 处理函数
  if (typeof target === 'function') return new Function(target)
  // 处理数组或对象
  const cloneTarget = Array.isArray(target) ? [] : {}
  map.set(target, cloneTarget)
  for (const key in target) {
    cloneTarget[key] = deepClone(target[key], map)
  }
  return cloneTarget
}

// test
const obj = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3
    }
  },
  e: new Date(),
  f: /abc/,
  g: function () { console.log(123); },
  h: [1, 2, 3],
}
// 测试循环引用
obj.i = obj

const obj2 = deepClone(obj)
obj2.b.d.e = 4
console.log(obj2)
console.log(obj)
