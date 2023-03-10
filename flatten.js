
const animals = ["🐷", ["🐶", "🐂"], ["🐎", ["🐑", ["🐲"]], "🐛"]];


const flatten = (arr) => arr.reduce((prev, curr) => [...prev, ...Array.isArray(curr) ? flatten(curr) : curr], [])

// const flatten = (arr) =>
//   arr.reduce((pre, cur) =>
//     [...pre, ...Array.isArray(cur)
//       ? flatten(cur)
//       : cur]
//     , [])

console.log(flatten(animals));

// const flatten = (arr) => arr.reduce((pre, cur) => [...pre, ...(Array.isArray(cur) ? flatten(cur) : cur)], [])

