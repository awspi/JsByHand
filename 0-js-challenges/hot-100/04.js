const arr = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 },
  { id: 6, name: '部门6', pid: 0 },
]

const listToTree = (list) => {
  // map 用来记录每个节点的id和对应的节点在数组中的位置
  const map = list.reduce((prev, cur) => {
    prev[cur.id] = cur;
    return prev;
  }, {})
  console.log(map);
  return list.reduce((prev, cur) => {
    const parent = map[cur.pid]; //? 通过pid找到父节点
    if (parent) {
      //? 如果存在父节点
      if (!parent.children) {
        // 如果父节点没有children属性，就创建一个
        parent.children = [];
      }
      parent.children.push(cur);
    } else {
      //? 如果不存在父节点，说明是根节点
      prev.push(cur);
    }
    return prev;
  }, [])
}
console.log(listToTree(arr));
