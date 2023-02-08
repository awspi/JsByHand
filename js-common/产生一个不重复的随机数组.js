

function randomUniqueArr(len = 100, min = 0, max = 200) {
  if (max - min < len) {
    // 可生成数的范围小于数组长度
    return null;
  }
  const set = new Set();
  while (set.size < len) {
    const num = Math.floor(Math.random() * max);
    if (num < min ) continue;
    set.add(num);
  }
  return [...set];
}

console.log(randomUniqueArr());
console.log(randomUniqueArr(20, 10, 31));
