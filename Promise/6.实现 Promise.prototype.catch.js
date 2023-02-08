/**
   * *本质就是then，只是少传了一个onFulfilled
   * 所以仅处理失败的场景
   * @param {*} onRejected
   */
Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
}
