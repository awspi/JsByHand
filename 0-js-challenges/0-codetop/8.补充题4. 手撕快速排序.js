/**
 * @param {number[]} nums
 * @return {number[]}
 */
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
