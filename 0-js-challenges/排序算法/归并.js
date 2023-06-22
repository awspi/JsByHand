// 归并
// 时间复杂度 O(nlogn)
// 空间复杂度 O(n)

// 思想：将数组分成两个子数组，分别对子数组进行排序，然后将排序后的子数组合并成一个有序数组
// 递归实现

const mergeSort = (arr) => {
  if (arr.length < 2) return arr
  const mid = Math.floor(arr.length / 2)
  const left = arr.slice(0, mid)
  const right = arr.slice(mid)
  return merge(mergeSort(left), mergeSort(right))
}
const merge = (left, right) => {
  const res = []
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      res.push(left.shift())
    } else {
      res.push(right.shift())
    }
  }
  // left或者right可能还有剩余元素
  // 将剩余元素放到res中
  return [...res, ...left, ...right]
}

// 测试
const arr = [1, 5, 2, 3, 4, 6, 7, 8, 9, 10]
console.log(mergeSort(arr));
