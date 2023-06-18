/**
 * Diff算法
 * @param {*} n1  旧节点
 * @param {*} n2  新节点
 * @param {*} container   容器
 */
const patchKeyedChildren = (n1, n2, container) => {
  const newChildren = n2.children
  const oldChildren = n1.children
  //! 1. 对新旧children进行头尾比较 
  //  1.1 更新相同的前置节点
  let startIdx = 0 // 指向新旧两组节点的开头
  let oldVNode = oldChildren[startIdx]
  let newVNode = newChildren[startIdx]
  //  while 向后遍历
  while (oldVNode.key === newVNode.key) {
    patch(oldVNode, newVNode, container) // 更新节点
    startIdx++ // 更新索引 指向下一个节点
    oldVNode = oldChildren[startIdx]
    newVNode = newChildren[startIdx]
  }
  //  1.2 更新相同的后置节点
  //    新旧2组节点数量可能不同 所以新旧2组节点指向最后一个节点的索引也可能不同
  let oldEndIdx = oldChildren.length - 1
  let newEndIdx = newChildren.length - 1

  oldVNode = oldChildren[oldEndIdx]
  newVNode = newChildren[newEndIdx]
  //  while 向前遍历
  while (oldVNode.key === newVNode.key) {
    patch(oldVNode, newVNode, container) // 更新节点
    // 更新索引 指向下一个节点
    oldEndIdx--
    newEndIdx--
    oldVNode = oldChildren[oldEndIdx]
    newVNode = newChildren[newEndIdx]
  }

  //! 2.处理 新增/删除的节点
  if (startIdx > oldEndIdx && startIdx <= newEndIdx) {
    // startIdx > oldEndIdx 说明旧节点已经遍历完了
    // startIdx <= newEndIdx 说明新节点还没有遍历完 
    // 2.1 新增节点
    // 2.1.1 找到插入的位置
    const nextPos = newEndIdx + 1
    const anchor = nextPos < newChildren.length ? newChildren[nextPos].el : null
    // 2.1.2 循环插入节点
    while (startIdx <= newEndIdx) {
      // 从新节点的startIdx到newEndIdx都是需要插入的节点
      patch(null, newChildren[startIdx++], container, anchor)
    }
  } else if (startIdx <= oldEndIdx && startIdx > newEndIdx) {
    // startIdx<=oldEndIdx 说明旧节点还没有遍历完
    // startIdx>newEndIdx 说明新节点已经遍历完了
    // 2.2 删除节点
    while (startIdx <= oldEndIdx) {
      // 从旧节点的startIdx到oldEndIdx都是需要删除的节点
      unmount(oldChildren[startIdx++])
    }
  } else {
    //! 2.3 非理想情况
    const count = newEndIdx - startIdx + 1 // 需要处理的节点数量
    // 2.3.1 构建新节点的索引表 source
    //? 用于存储新的一组子节点在旧的一组的子节点中的位置索引 用于计算最长递增子序列
    const source = new Array(count) // 用于存储新节点的索引
    source.fill(-1) // 初始化为-1

    // 2.3.2 构建key->index的映射表用于快速查找新子节点中是否存在旧子节点

    const newStartIdx = startIdx // 新子节点的开始索引
    const oldStartIdx = startIdx // 旧子节点的开始索引

    let moved = false // 是否需要移动节点
    let pos = 0 // 遍历旧子节点的最大索引 （ 遍历过程中索引值递增趋势 则说明不需要移动节点）

    // 结构 {keyName:新子节点的索引}
    const keyToNewIndexMap = new Map() //初始化表
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      const currentChild = newChildren[i]
      keyToNewIndexMap.set(currentChild.key, i)
    }

    let patched = 0 // 记录已经处理的节点数量 
    // (如果<=count 正常更新 每次更新完自增，如果>count 说明剩余节点都是多余的，直接卸载)

    // 遍历旧的子节点剩余未处理的节点 填充source数组
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      // i 旧节点的索引
      const oldVNode = oldChildren[i]
      if (patched <= count) {
        // 如果已经处理的节点数量小于需要处理的节点数量 正常更新
        const newIdx = keyToNewIndexMap.get(oldVNode.key) // 获取旧节点在新节点中的索引
        if (newIdx === undefined) {
          // 旧节点在新节点中不存在
          unmount(oldVNode) // 卸载旧节点
        } else {
          // 旧节点在新节点中存在 
          //  旧节点在新节点中的位置索引 = 旧节点在新节点中的索引 - 新节点的开始索引
          source[newIdx - newStartIdx] = i // 记录新节点在旧节点中的索引
          const newVNode = newChildren[newIdx] // 获取新节点
          patch(oldVNode, newVNode, container) // 更新节点
          // 判断是否需要移动节点
          if (newIdx < pos) {
            // 说明需要移动节点
            moved = true
          } else {
            // 否则更新pos
            pos = newIdx
          }
        }
      } else {
        // 说明剩余节点都是多余的 直接卸载
        unmount(oldVNode)

      }
    }

    // 
    if (moved) {
      // 如果moved为true 说明需要移动节点
      // 2.3.3 计算最长递增子序列
      const seq = lis(source)
      // 指向新的一组子元素的最后一个节点
      let s = seq.length - 1
      // 指向最长递增子序列的最后一个元素
      let i = count - 1
      // 从后往前遍历 i递减 
      for (i; i >= 0; i--) {
        if (source[i] === -1) {
          // 如果source[i]===-1 说明这个元素是全新的元素 应该挂载
          const pos = i + newStartIdx // 获取挂载的位置 
          //  (i是重新编号后的索引 真实索引值要加上新节点的开始索引)
          const newVNode = newChildren[pos] // 获取挂载的节点
          const nextPos = pos + 1 // 获取下一个位置
          const anchor = nextPos < newChildren.length ? newChildren[nextPos].el : null // 获取下一个位置的节点
          patch(null, newVNode, container, anchor) // 挂载节点

        } else if (i !== seq[s]) {
          // 如果i不等于seq[s] 说明这个元素需要移动
        } else {
          // 如果i等于seq[s] 说明这个元素不需要移动
          // 只用让s指向下一个位置
          s--
        }
      }
    }

  }

}

/**
 * 用于计算最长递增子序列
 * @param {*} arr 
 * @returns 
 */
function lis(arr) {
  const p = arr.slice() // 复制一份数组
  const result = [0] // 用于存储索引
  let i, j, u, v, c
  const len = arr.length
  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      j = result[result.length - 1]
      if (arr[j] < arrI) {
        p[i] = j
        result.push(i)
        continue
      }
      u = 0
      v = result.length - 1
      while (u < v) {
        c = ((u + v) / 2) | 0 // 向下取整
        if (arr[result[c]] < arrI) {
          u = c + 1
        } else {
          v = c
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1]
        }
        result[u] = i
      }
    }
  }
  u = result.length
  v = result[u - 1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}


const patch = (n1, n2, container, anchor = null) => {
  console.log('patch', n1, n2, container, anchor);
}
const unmount = (vnode) => {
  console.log('unmount', vnode);
}

// use case


const n1 = {
  children: [
    {
      key: 'B'
    },
    {
      key: 'A'
    },
    {
      key: 'C'
    },
  ]
}
const n2 = {
  children: [

    {
      key: 'A'
    },
    {
      key: 'D'
    },
    {
      key: 'B'
    },
  ]
}
const container = 'container'
patchKeyedChildren(n1, n2, container)
