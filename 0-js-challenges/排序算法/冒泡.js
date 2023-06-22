// 冒泡排序
// 时间复杂度：O(n^2)
// 空间复杂度：O(1)

const bubbleSort = (arr) => {
  const len = arr.length
  // 外层代表轮数 
  // i < len - 1是因为最后一轮只剩一个数，不需要比较
  for (let i = 0; i < len - 1; i++) {
    // 内层代表比较的次数
    // j < len - 1 - i是因为每一轮比较后，最后一个数已经是最大的了，不需要再比较
    for (let j = 0; j < len - 1 - i; j++) {
      //如果 前一个数 大于 后一个数，则交换位置
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      } else {
      }
    }
  }
  return arr
}

// 测试
const arr = [1, 5, 2, 3, 4, 6, 7, 8, 9, 10]
console.log(bubbleSort(arr));

