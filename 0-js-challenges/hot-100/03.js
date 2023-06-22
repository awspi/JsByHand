const data = [
  {
    id: '1',
    name: '父节点1',
    children: [
      {
        id: '1-1',
        name: '子节点1-1',
        children: [
          {
            id: '1-1-1',
            name: '子节点1-1-1'
          },
          {
            id: '1-1-2',
            name: '子节点1-1-2'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: '父节点2',
    children: [
      {
        id: '2-1',
        name: '子节点2-1'
      }
    ]
  }
]
function treeToList(data) {
  // 如果不是数组或者数组长度为0，直接返回
  if (!Array.isArray(data) && data.length === 0) return;

  return data.reduce((prev, cur) => {
    const { children } = cur;
    // delete cur.children; //? 如果不保留children，可以删除
    return Array.isArray(children) && children.length > 0
      // 如果有子节点，递归调用
      ? [...prev, cur, ...treeToList(children)]
      // 如果没有子节点，直接拼接cur
      : [...prev, cur]
  }, [])
}
console.log(treeToList(data));
