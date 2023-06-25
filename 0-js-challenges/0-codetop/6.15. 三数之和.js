// 15. 三数之和
// https://leetcode.cn/problems/3sum/description/
var threeSum = function (nums) {
  const len = nums.length
  const res = []
  if (len < 3) return [] // 如果数组长度小于3，直接返回[]
  nums.sort((a, b) => a - b) // 先排序
  for (let i = 0; i < len; i++) { // 遍历数组
    // nums[i] 是三数之和的第一个数
    // 如果nums[i]大于0，那么三数之和一定大于0，直接返回
    if (nums[i] > 0) return res
    // 如果nums[i]和nums[i-1]相等，那么会出现重复结果，直接跳过
    if (i > 0 && nums[i] === nums[i - 1]) continue
    // 定义左指针和右指针
    let l = i + 1
    let r = len - 1
    // 如果左指针小于右指针，就一直循环
    while (l < r) {
      // 如果三数之和等于0，就把结果放入res中
      if (nums[i] + nums[l] + nums[r] === 0) {
        res.push([nums[i], nums[l], nums[r]])
        // 如果nums[l]和nums[l+1]相等，就跳过
        while (l < r && nums[l] === nums[l + 1]) l = l + 1
        while (l < r && nums[r] === nums[r - 1]) r = r - 1
        // 左指针右移，右指针左移 继续寻找
        l++
        r--
      } else if (nums[i] + nums[l] + nums[r] > 0) {
        // 如果三数之和大于0，说明右指针的数太大，右指针左移
        r--
      } else {
        // 如果三数之和小于0，说明左指针的数太小，左指针右移
        l++
      }
    }
  }
  return res
};
// test
console.log(threeSum([-1, 0, 1, 2, -1, -4]))// [ [ -1, -1, 2 ], [ -1, 0, 1 ] ]


// for of 和 for in 的区别 
// for in 遍历的是对象的属性名，for of 遍历的是对象的属性值
// for in 遍历的是可枚举属性，for of 遍历的是可迭代对象
// 使用场景
// for in 用来遍历对象，for of 用来遍历数组
