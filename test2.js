// function Parent(name) {
//   this.arr = [1, 2, 3]
//   this.name = name
// }
// function Child(name, age) {
//   Parent.call(this, name, age)
//   this.age = age
// }

// function extend(p, c) {

// }

// const p1 = new Parent('name1')

// const child1 = new Parent('name2', 2)

//
const arr = ['a', ['b', ['c']], 'd', ['e', 'f'], 'g']

const flatten1 = (arr) => arr.reduce(
  (prev, curr) => [...prev,
  ...(Array.isArray(curr)
    ? flatten1(curr)
    : curr)],
  [])

const flatten = (arr) => {
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
console.log(flatten(arr));
