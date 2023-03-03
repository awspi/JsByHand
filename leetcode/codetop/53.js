/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let max = nums[0]
  let current = nums[0] // 上次相加的值 或 比‘上次相加的值’都大的nums[i]
  //从1开始
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i])
    // 对比current和max得到最大值
    max = Math.max(current, max)
  }
  return max
};
