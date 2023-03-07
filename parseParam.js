let url = "http://www.domain.com/?user=jack&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled";
// 实现一个函数： parseParam
// 输入解析后的结果为:

// {
//   user: 'jack',
//   id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
//   city: '北京', // 中文需解码
//   enabled: true, // 未指定值得 key 约定为 false
// }
const parseParams = (url) => {
  const obj = {}
  const s = url.split('?')[1]
  // user=jack&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled
  const params = s.split('&')
  params.forEach(param => {
    let [key, val] = param.split('=')
    val = parseVal(val)
    if (obj[key]) {
      if (Array.isArray(obj[key])) {
        obj[key].push(val)
      } else {
        obj[key] = [obj[key], val]
      }
    } else {
      obj[key] = val
    }
  })
  return obj
}

const parseVal = (val) => {
  if (val === undefined) { // 处理未指定值的情况
    return true
  }
  const decodedVal = decodeURI(val); // 解码中文字符
  return isNaN(decodedVal) ? decodedVal : Number(decodedVal); // 如果可以转换成数字则转换
}
console.log(parseParams(url))

