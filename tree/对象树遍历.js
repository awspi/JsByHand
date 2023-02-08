const tree = {
  name: 'root',
  children: [
    {
      name: 'c1',
      children: [
        {
          name: 'c11',
          children: []
        },
        {
          name: 'c12',
          children: []
        }
      ]
    },
    {
      name: 'c2',
      children: [
        {
          name: 'c21',
          children: []
        },
        {
          name: 'c22',
          children: []
        }
      ]
    }
  ]
}

const run = (root) => {
  const res = []
  const dfs = (root) => {
    for (const key in root) { //for in 遍历 key
      if (key === 'name') {
        res.push(root[key])
      } else if (key === 'children') {
        root[key].forEach(el => {
          dfs(el)
        })
      }
    }
  }
  dfs(root)
  return res
}

console.log(run(tree));
