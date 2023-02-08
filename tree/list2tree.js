let arr = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 },
  { id: 6, name: '部门6', pid: 0 },
]

const list2Tree = (list) => {
  const map = {}
  const res = []
  //先根据pid排个序,,这是个树形结构,pid越小说明越上层,
  list.sort((a, b) => a.pid - b.pid)
  for (const item of list) {
    map[item.id] = item
    if (item.pid === 0) {//顶级 别人只可能是是他的children
      res.push(item)
    } else {
      if (map[item.pid].children) {
        //父节点存在children 直接加入
        map[item.pid].children.push(item)
      } else {
        //父节点不存在children 就新建children把自己加进去
        map[item.pid].children = [item]
      }
    }
  }
  return res
}

console.log(JSON.stringify(list2Tree(arr)));
