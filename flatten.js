
const animals = ["🐷", ["🐶", "🐂"], ["🐎", ["🐑", ["🐲"]], "🐛"]];
const flatten = (arr) => arr.reduce((pre, cur) => [...pre, ...(Array.isArray(cur) ? flatten(cur) : cur)], [])
console.log(flatten(animals));

