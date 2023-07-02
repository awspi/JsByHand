// 快排
// 时间复杂度 O(nlogn)
// 空间复杂度 O(logn)

const quickSort = (arr) => {
  if (arr.length < 2) return arr
  const pivot = arr[0]
  const left = []
  const right = []
  // 终止条件
  //! 因为哨兵是第一个元素，所以从第二个元素开始遍历
  // 如果误从第一个元素开始遍历，会导致死循环
  // 每次循环都会将第一个元素放到left或者right中，导致left或者right中的元素永远不会为空
  // 从而导致递归永远不会终止
  // 递归终止条件是left或者right为空
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)]
}

// 测试
const arr = [1, 5, 2]
console.log(quickSort(arr));



var sortArray = function (nums) {
  if (nums.length < 2) return nums
  const left = []
  const right = []
  //! 随机选取一个元素作为哨兵
  const rand = Math.floor(Math.random() * nums.length)
  console.log(rand);
  const p = nums[rand]
  nums.splice(rand, 1)
  console.log(nums);
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > p) {
      right.push(nums[i])
    } else {
      left.push(nums[i])
    }
  }
  return [...sortArray(left), p, ...sortArray(right)]
};

// test
console.log(sortArray([5, 2, 3, 1]));// [ 1, 2, 3, 5 ]
