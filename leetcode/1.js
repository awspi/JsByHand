var twoSum = function (nums, target) {
  const map = new Map()
  nums.forEach((num, index) => {
    const x = target - num
    if (map.has(x)) {
      return [x, index]
    } else {
      map.set(num, index)
    }
  })
};

const nums = [2, 7, 11, 15]
const res = twoSum(nums, 9)
console.log(res);
