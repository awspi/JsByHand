// 枚举所有SKU
// 已知商品
const spu = 'iPhone13';
// 已知规格数据
const specList = [
  ["white", "black", "gold"],
  ["64GiB", "128GiB", "256GiB"],
  ['a1', 'a2'],
  ['b1', 'b2'],
];

/** 
  输出结果：
  iPhone13-white-64GiB-a1-b1
  iPhone13-white-64GiB-a1-b2
  iPhone13-white-64GiB-a2-b1
  iPhone13-white-64GiB-a2-b2
  iPhone13-white-128GiB-a1-b1
  iPhone13-white-128GiB-a1-b2
  iPhone13-white-128GiB-a2-b1
  iPhone13-white-128GiB-a1-b2
  ……
*/

function forInAll(spu, specList, index, res) {

  for (let i = 0; i < specList.length; i++) { // 最外层
    let temp = []
    for (let color = 0; color < specList[i].length; color++) { // 颜色层
    }
    if (i == 1)
      res.push(temp)
  }

  for (let i = 0; i < specList[index].length; i++) {
    res.push(specList[index][i])
    forInAll(spu, specList, index + 1, res)

  }
}
const res = []
forInAll(spu, specList, 0, res)
console.log(res);
