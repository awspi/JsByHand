const promise = new Promise((resolve, reject) => {
  resolve('hhh')
  const promise = new Promise((resolve, reject) => {
    console.log(999);
    resolve(888)
  }).then((res) => {
    console.log(res)
    return 0;
  }).then((res) => {
    console.log('res1', res)
    return 9;
  })
    .then((res) => {
      console.log('res2', res)
      return 8;
    })
    .then((res) => {
      console.log('res3', res)
    })
})
