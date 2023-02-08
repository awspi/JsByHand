function toRGB(color) {
  var regex = /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/ //匹配十六进制的正则
  match = color.match(regex)  // 判断是否是十六进制颜色值
  console.log(match); //从1开始
  //parseInt(match[1],16) 16进制转位整数
  return match
    ? `rgb(${parseInt(match[1], 16)},${parseInt(match[2], 16)},${parseInt(match[3], 16)})`
    : color
}

console.log(toRGB('#00ffee'));
