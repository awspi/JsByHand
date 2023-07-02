const moveZerosToEnd = (arr) => {
  const arr1 = []
  const arr2 = []
  arr.forEach(item => item === 0
    ? arr1.push(item)
    : arr2.push(item)
  )
  return [...arr2, ...arr1]
}
//test
const arr = [1, 2, 3, 0, 4, 0, 5, 6, 0, 7, 8]
// console.log(moveZerosToEnd(arr))


const moveZerosToEnd2 = (arr) => {
  arr.forEach((item, index) => {
    if (item === 0) {
      arr.splice(index, 1)
      arr.push(0)
    }
  })
  return arr
}
console.log(moveZerosToEnd2(arr))
