async function async1() {
  console.log('a1 s')
  await async2()
  console.log('a1 e')
}
async function async2() {
  console.log('a2')
}
console.log('s s')
async1()
new Promise(function (resolve) {
  console.log('p1')
  resolve()
}).then(() => {
  console.log('p2')
}).then(() => {
  console.log('p3')
})
console.log('s e')

/*
s s
a1 s
a2
p1
s e
a1 e
p2
p3
*/
