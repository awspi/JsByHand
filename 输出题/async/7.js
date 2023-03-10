setTimeout(() => {
  console.log('1')
}, 3000)
new Promise((resolve) => {
  console.log(2)
  let a = 12

  //? 这么多执行只有两毫秒
  for (let i = 0; i < 100000; i++) {
    a += 1
  }
  const now = Date.now()
  resolve()
}).then(() => {
  setTimeout(() => {
    console.log(3)
  })
  console.log(4)
})
console.log(5)
//2 5 4 3 1
