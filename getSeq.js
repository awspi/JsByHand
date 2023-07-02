/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  // dp[i] 表示以 nums[i] 结尾的最长上升子序列的长度
  let dp = new Array(nums.length).fill(1); // 初始化为 1
  let max = 1;
  // 从第二个数开始遍历
  for (let i = 1; i < nums.length; i++) {
    // 从第一个数开始遍历
    for (let j = 0; j < i; j++) {
      // 如果 nums[i] > nums[j]，
      // 说明 nums[i] 可以接在 nums[j] 后面形成一个比 dp[i] 更长的上升子序列
      if (nums[i] > nums[j]) {
        // 更新 dp[i]
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    // 更新最大值
    max = Math.max(max, dp[i]);
  }
  return max;
};
