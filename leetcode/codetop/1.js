/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */


// 返回两个下标
var twoSum = function (nums, target) {
  const map = new Map()
  // {
  // key当前元素的值:val是当前元素的差值
  // }
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]
    const x = target - num
    if (map.has(x)) {
      return [map.get(x), i]
    } else {
      map.set(num, i)
    }
  }
};
