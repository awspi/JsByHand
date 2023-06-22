// Array.prototype.flat
const flatten = (arr) =>
  arr.reduce((prev, cur) =>
    [
      ...prev,
      ...Array.isArray(cur)
        ? flatten(cur)
        : cur
    ], [])

//
const animals = ["🐷", ["🐶", "🐂"], ["🐎", ["🐑", ["🐲"]], "🐛"]];

console.log(flatten(animals));
