// https://www.bilibili.com/video/BV1fp4y1D7cj

// 大顶堆
// 父节点 >= 左孩子/右孩子
// 使用数组存储大顶堆
// ? 
// 下标为i的节点的父节点的下标为 Math.floor((i-1)/2) 
// 下标为i的节点的左子节点的下标为2i+1
// 下标为i的节点的右子节点的下标为2i+2


// 维护堆的性质



class maxHeap {
  constructor() {
    this.heap = []
  }

  // 建堆
  buildHeap(arr) {
    for (let i = Math.floor(this.heap.length / 2); i >= 0; i--) {
      heapify(i)
    }
  }

  /**
   * 
   * @param {*} i  待维护的节点下标
   */
  heapify(i) {
    const len = this.heap.length
    // 获取左右子节点
    const left = 2 * i + 1
    const right = 2 * i + 2
    // 假设当前节点是最大值
    let max = i
    if (left < len && this.heap[left] > this.heap[max]) {
      max = left
    }
    if (right < len && this.heap[right] > this.heap[max]) {
      max = right
    }
    // 如果当前节点不是最大值，就交换
    if (max !== i) {
      this.swap(i, max)
      // 交换完了可能还需要继续维护
      this.heapify(max)
    }
  }
  /**
   * 交换元素
   * @param {*} i1 下标
   * @param {*} i2 下标
   */
  swap(i1, i2) {
    [this.heap[i1], this.heap[i2]]
      = [this.heap[i2], this.heap[i1]]
  }
}


// test
const h = new maxHeap()
h.heap = [1, 2, 3, 4, 5, 6, 7]
h.heapify(0)
console.log(h.heap); // [ 7, 4, 6, 1, 5, 2, 3 ]
