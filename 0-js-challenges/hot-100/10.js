// lodash.get

const dlv = (obj, str) => {
  const arr = Array.isArray(str) ? str : str.split('.')
  return arr.reduce((prev, cur) =>
  // obj 逐渐缩窄
  (prev?.[cur]
    ? prev[cur]
    : undefined)
    , obj)
}

// test
console.log(dlv({ a: { b: { c: 1 } } }, 'a.b.c'));//1
console.log(dlv({ a: { b: { c: 1 } } }, 'a.d.c'));//undefined
