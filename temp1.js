function gettreenodeDeep(tree, name) {
  const res = {}
  const dfs = (tree, name) => {
    if (!tree) {
      return
    }
    if (tree.name === name) {
      res.name = tree.name
      res.code = tree.code
      return
    }
    if (tree.children) {
      for (let item of tree.children) {
        dfs(item, name)
      }
    }

  }

  dfs(tree, name)

  return res

}
