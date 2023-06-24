
const animals = ["🐷", ["🐶", "🐂"], ["🐎", ["🐑", ["🐲"]], "🐛"]];


const flatten = (arr) =>
  arr.reduce((prev, curr) =>
    [
      ...prev,
      ...Array.isArray(curr)
        ? flatten(curr)
        : curr
    ]
    , [])

// 递归
const flatten2 = (arr) => {
  let res = []
  const len = arr.length
  for (let i = 0; i < len; i++) {
    if (Array.isArray(arr[i])) {
      res = [...res, ...flatten(arr[i])]
    } else {
      res.push(arr[i])
    }
  }
  return res
}
// const flatten = (arr) =>
//   arr.reduce((pre, cur) =>
//     [...pre, ...Array.isArray(cur)
//       ? flatten(cur)
//       : cur]
//     , [])

console.log(flatten(animals));

// const flatten = (arr) => arr.reduce((pre, cur) => [...pre, ...(Array.isArray(cur) ? flatten(cur) : cur)], [])
