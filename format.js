// 将浮点数格式化成每 3 位添加一个逗号 不使用正则
const format = num => num.toLocaleString('en-US')

//test
const num = 123456789.123456789
console.log(format(num))

