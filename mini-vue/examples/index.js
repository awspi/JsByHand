
console.log('script run');
import { reactive, computed } from '../src/reactivity/index.js'
let dummy
const counter = reactive({ num1: 1, num2: 2 })
effect(() => {
  dummy = counter.num1 + counter.num2
  console.log(dummy)// 每次counter.num1修改都会打印日志
})
setInterval(() => {
  counter.num1++
}, 1000)

// //! -————————————————————————————————————————————————————————
// const obj = reactive({ count: 1 })
// effect(() => {
//   console.log(obj.count)
// }, {
//   // 指定调度器为 queueJob
//   scheduler: queueJob
// })

// // 调度器实现
// const queue = []//: Function[]
// let isFlushing = false
// /**
// *
// * @param {Function} job () => void
// */
// function queueJob(job) {
//   if (!isFlushing) {
//     isFlushing = true
//     Promise.resolve().then(() => {
//       let fn
//       while (fn = queue.shift()) {
//         fn()
//       }
//     })
//   }
// }
