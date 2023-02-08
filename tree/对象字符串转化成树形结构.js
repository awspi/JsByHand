// 对象字符串转化成树形结构
//from
let strarr = {
  'a-b-c-d': 1,
  'a-b-c-e': 2,
  'a-b-f': 3,
  'a-j': 4
}
//to
let obj = {
  a: {
    b: {
      c: {
        d: 1,
        e: 2
      },
      f: 3
    },
    j: 4
  }
}

const fn = (strArr) => {
  let objTree = {}

  const dfs = (arr, obj, val) => {
    //只便利到倒数第二个 最后一个需要设置val
    for (let i = 0; i < arr.length - 1; i++) {
      console.log(arr[i]);
      if (!obj[arr[i]]) obj[arr[i]] = {}//不存在 新建议1个
      obj = obj[arr[i]]//obj变成倒数第二个对象的引用
    }
    console.log('_____________________');
    console.log(obj, arr.at(-1), val);
    // arr的最后一个fu zhi
    obj[arr.at(-1)] = val
  }

  for (let str in strArr) {
    console.log(str);
    // 获取key
    dfs(str.split('-'), objTree, strArr[str])
  }
  return objTree
}
console.log(fn(strarr))
