// 215. 数组中的第K个最大元素

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  // 1. 排序
  // 2. 取第k个
  // (a, b) => b - a 是降序
  return nums.sort((a, b) => b - a)[k - 1]
};



//! 最小堆

class MinHeap {
  constructor() {
    this.heap = []
  }
  /**
   * 交换元素
   * @param {*} i1
   * @param {*} i2 
   */
  swap(i1, i2) {
    [this.heap[i1], this.heap[i2]]
      = [this.heap[i2], this.heap[i1]]
  }
  /**
   * 获取父节点
   * @param {*} i 
   * @returns 
   */
  getParentIndex(i) {
    // return (i - 1) >> 1
    return Math.floor((i - 1) / 2)
  }
  /**
   * 获取左子节点
   * @param {*} i 
   * @returns 
   */
  getLeftIndex(i) {
    // return i * 2 + 1
    return (i + 1) * 2 - 1
  }
  /**
   * 获取右子节点
   * @param {*} i 
   * @returns 
   */
  getRightIndex(i) {
    // return i * 2 + 2
    return (i + 1) * 2
  }
  /**
   * 上移
   * @param {*} index 
   * @returns 
   */
  shiftUp(index) {
    // 如果是根节点，就不用上移了
    if (index === 0) return
    // 获取父节点
    const parentIndex = this.getParentIndex(index)
    // 如果父节点的值大于当前节点的值，就交换
    if (this.heap[parentIndex] > this.heap[index]) {
      // 交换
      this.swap(parentIndex, index)
      // 递归
      this.shiftUp(parentIndex)
    }
  }
  /**
   * 下移
   * @param {*} index 
   */
  shiftDown(index) {
    // 获取左右子节点
    const leftIndex = this.getLeftIndex(index)
    const rightIndex = this.getRightIndex(index)
    // 如果左子节点的值小于当前节点的值，就交换
    if (this.heap[leftIndex] < this.heap[index]) {
      this.swap(leftIndex, index)
      // 递归
      this.shiftDown(leftIndex)
    }
    // 如果右子节点的值小于当前节点的值，就交换
    if (this.heap[rightIndex] < this.heap[index]) {
      this.swap(rightIndex, index)
      // 递归
      this.shiftDown(rightIndex)
    }
  }
  /**
   * 插入
   * @param {*} value 
   */
  insert(value) {
    // 插入到最后
    this.heap.push(value)
    // 上移到正确的位置
    this.shiftUp(this.heap.length - 1)
  }
  /**
   * 删除堆顶
   */
  pop() {
    // 把最后一个元素放到堆顶
    this.heap[0] = this.heap.pop()
    // 下移到正确的位置
    this.shiftDown(0)
  }
  /**
   * 获取堆顶
   * @returns 
   */
  peek() {
    // 返回堆顶
    return this.heap[0]
  }
  /**
   * 获取堆的大小
   * @returns 
   */
  size() {
    return this.heap.length
  }
}

var findKthLargest2 = function (nums, k) {
  let arr = new MinHeap()

  for (let i = 0; i < nums.length; i++) {
    if (i < k) {
      // 如果堆的大小小于k，就直接插入
      arr.insert(nums[i])
    } else {
      // 如果堆的大小大于k，就替换堆顶元素
      // 如果当前元素大于堆顶元素，就替换堆顶元素
      if (nums[i] >= arr.heap[0]) {
        // 替换堆顶元素
        arr.heap[0] = nums[i]
        // 下移到正确的位置
        arr.shiftDown(0)
      }
    }
  }


  return arr.heap[0]
};




