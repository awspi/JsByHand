let url = "http://www.domain.com/?user=jack&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled";

// 实现一个函数： parseParam
// 输入解析后的结果为:

// {
//   user: 'jack',
//   id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
//   city: '北京', // 中文需解码
//   enabled: true, // 未指定值得 key 约定为 false
// }

function parseParam(url) {
  const arr = url.split('/?').at(-1)
    .split('&') // [ 'user=jack', 'id=123', 'id=456', 'city=%E5%8C%97%E4%BA%AC', 'enabled' ]
  return arr.reduce((pre, curr) => {
    const [key, value] = curr.split('=')
    console.log(key, value);
    if (pre[key]) {
      if (Array.isArray(pre[key])) {
        pre[key].push(decodeURIComponent(value))
      } else {
        pre[key] = [pre[key], decodeURIComponent(value)]
      }
    } else {
      pre[key] = value === undefined
        ? true
        : decodeURIComponent(value)
    }
    return pre
  }, {})
}

console.log(parseParam(url));


let a = { "a": 1, "b": undefined };
let b = { "a": 1 };
let c = { "b": 2 };
let nums = [a, b, c, a, c, { "a": 1 }];

// [{"a": 1, "b": undefined}, {"a": 1}, {"b": 2}]

function uniq(nums) {
  let res = []
  nums.forEach(item => {
    if (!res.some(i =>
      JSON.stringify(i) === JSON.stringify(item))
    ) {
      //如果在结果里不存在现在遍历中的对象的任何一个属性 则push
      res.push(item)
    }
  })
  return res
}

console.log(uniq(nums));
