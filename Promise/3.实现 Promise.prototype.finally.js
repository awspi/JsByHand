Promise.prototype._finally = function (onSettled) {
  const onFulfilled = (data) => {
    onSettled() // finally((x)=>...) 应该收不到参数 -> 不传参
    return data
  }
  const onRejected = (reason) => {
    onSettled();
    throw reason;
  }
  //finally 也是调用.then方法 封装了一层
  return this.then(onFulfilled, onRejected)
  // finally函数 返回结果应该是无效的
}

/******test finally*******/
// 无论什么结果，都会运行
const pro = new Promise((resolve, reject) => {
  resolve(1);
});
const pro2 = pro.finally((d) => {
  console.log("finally", d); // 收不到d参数
  // 本身不改变状态，但是抛出一个错误，数据就会变成它的错误
  // throw 123;
  return 123; //不起作用
});
setTimeout(() => {
  console.log(pro2);
});
