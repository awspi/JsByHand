// 类似与实现一个函数 find(obj, str)，满足:
// 如var obj = {a:{b:{c:1}}};
// find(obj,'a.b.c') //1
// find(obj,'a.d.c') //undefined

/**
 * 实现一个函数 find(obj, str)
 * @link https://www.bilibili.com/video/BV1qj411Q7uW
 * @param {*} obj 
 * @param {*} path 
 * @returns 
 */
const dlv = (obj, path) => {
  const arr = Array.isArray(path) ? path : path.split('.')
  return arr.reduce((acc, cur) => (
    acc?.[cur]
      ? acc[cur]
      : undefined)
    , obj)
}
console.log(dlv({ a: { b: { c: 1 } } }, 'a.b.c'));//1
console.log(dlv({ a: { b: { c: 1 } } }, 'a.d.c'));//undefined
