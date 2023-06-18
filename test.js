console.log('script start')
async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  return new Promise((resolve, reject) => {
    console.log('async2 end')
    resolve('okk')
  })
}

async1(1)

setTimeout(() => console.log('setTimeout'), 0)
new Promise(resolve => {
  console.log('promise')
  resolve()
})
  .then(() => console.log('p1'))
  .then(() => console.log('p2'))

console.log('script end')
