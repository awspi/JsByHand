json = {
  id: 1,
  children: [
    { id: 2, children: [{ id: 3, children: [] }] },
    {
      id: 4,
      children: [
        { id: 5, children: [] },
        { id: 6, children: [] },
      ],
    },
    { id: 7, children: [] },
  ],
}
// 已知每个节点id唯一，编写findNode(id)，返回路径，如findNode(5)
//  输出 1->4->5
function findNode(obj, id) {
  //先找到路径 再拼接
  const res = []
  let resStr = ''
  const dfs = (obj, id) => {
    if (!obj) return
    res.push(obj.id)
    if (obj.id === id) resStr = res.join('->')

    obj.children.forEach(o => dfs(o, id))
    res.pop()
  }
  dfs(obj, id)
  return resStr
}
console.log(findNode(json, 7));
