// 这个问题可以通过控制 Promise 的并发数量来实现，具体实现方式如下：

// 1. 定义一个数组 `queue`，用来存储待执行的 Promise。
// 2. 定义一个变量 `concurrency`，表示当前正在执行的 Promise 数量。
// 3. 定义一个函数 `enqueue`，用来将 Promise 加入队列中。
// 4. 定义一个函数 `dequeue`，用来执行队列中的 Promise。
// 5. 在 `enqueue` 函数中，将 Promise 加入队列中，并调用 `dequeue` 函数。
// 6. 在 `dequeue` 函数中，如果当前正在执行的 Promise 数量小于最大并发数 `m`，则从队列中取出一个 Promise 并执行；否则不执行。
// 7. 在 Promise 执行完毕后，无论是成功还是失败，都要将当前正在执行的 Promise 数量减 1，并调用 `dequeue` 函数。

// 具体实现代码如下：


const queue = [];
let concurrency = 0;
const m = 3; // 最大并发数

function enqueue(promise) {
  queue.push(promise);
  dequeue();
}

function dequeue() {
  // 并发数量达到最大值或者队列为空时，不做任何处理
  if (concurrency >= m || queue.length === 0) {
    return;
  }
  // 并发数量加 1
  concurrency++;
  // 从队列中取出一个 Promise 执行
  const promise = queue.shift();
  promise.finally(() => {
    // Promise 执行完毕后，将并发数量减 1
    concurrency--;
    // 递归执行队列中的 Promise
    dequeue();
  })
}

// 使用示例
enqueue(new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
}
));
