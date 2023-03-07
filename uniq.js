let a = { "a": 1, "b": undefined };
let b = { "a": 1 };
let c = { "b": 2 };
let nums = [a, b, c, a, c, { "a": 1 }];

// [{"a": 1, "b": undefined}, {"a": 1}, {"b": 2}]

function uniq(nums) {

  // nums = nums.map(num => JSON.stringify(num))
  //! undefined
  // nums
  const arr = [...new Set(nums)]
  console.log(arr.map(item => JSON.parse(item)));
}



function unique(nums) {
  const set = new Set();
  const res = [];

  for (let i = 0; i < nums.length; i++) {
    const item = nums[i];
    const keys = Object.keys(item);
    const keyStr = keys.map(key => `${key}:${item[key]}`).join(','); // 将对象转换成字符串，用于比较去重

    if (!set.has(keyStr)) {
      set.add(keyStr);
      res.push(item);
    }
  }

  return res;
}
console.log(unique(nums));
