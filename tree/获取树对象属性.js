var tree = {
  name: '中国',
  children: [
    {
      name: '北京',
      children: [
        {
          name: '朝阳群众'
        },
        {
          name: '海淀区'
        },
        {
          name: '昌平区'
        }
      ]
    },
    {
      name: '浙江省',
      children: [
        {
          name: '杭州市',
          code: '0571',
        },
        {
          name: '嘉兴市'
        },
        {
          name: '绍兴市'
        },
        {
          name: '宁波市'
        }
      ]
    }
  ]
};

const run = (tree, targetName) => {
  const res = {}

  const dfs = (tree, name) => {
    if (!tree) return
    if (tree.name === name) {
      res.name = name
      if (tree.code) res.code = tree.code
      return
    }
    if (tree.children) {
      for (const node of tree.children) {
        dfs(node, name)
      }
    }
  }
  dfs(tree, targetName)
  return res
}
console.log(run(tree, '昌平区'));
