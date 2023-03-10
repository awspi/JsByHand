; (async () => {
  console.log(1)
  setTimeout(() => console.log(2))
  await new Promise(resolve => {
    console.log(3)
    resolve()
  }).then(() => {
    console.log(4)
  })

  console.log(5)
})()
//13452，注意then返回的一定不是pending的promise
