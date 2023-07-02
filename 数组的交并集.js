const intersection = (arr1, arr2) =>
  arr1.filter(item => arr2.includes(item))

const union = (arr1, arr2) => [...new Set([...arr1, ...arr2])]

// 示例数据
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [4, 5, 6, 7, 8];

// 求交集
const intersectionResult = intersection(arr1, arr2);
console.log("交集:", intersectionResult);

// 求并集
const unionResult = union(arr1, arr2);
console.log("并集:", unionResult);
