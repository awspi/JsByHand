// 25. K 个一组翻转链表

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  //! 模拟栈 入栈再出栈 自然就翻转
  const stack = []
  // 哑节点 为了方便操作
  const dummy = new ListNode()
  // 当前节点
  let curr = dummy //弱引用
  // 遍历链表
  let temp = head
  while (temp) {
    // 入栈
    stack.push(temp)
    // 指针后移
    temp = temp.next
    // 如果栈的长度等于k 
    if (stack.length === k) {
      // 每满足k个元素处理栈内元素
      // 遍历完栈内元素
      while (stack.length) {
        // 出栈的元素就是翻转后的元素
        curr.next = stack.pop() //把当前栈顶的元素放到链表中
        // 指针后移
        curr = curr.next
      }
      // 处理完k个元素后，把curr.next指向下一个元素
      // 因为如果最后一组元素不足k个，就不会进入上面的while循环 就会丢失最后一组元素
      curr.next = temp // 翻转完的元素的next指向下一个元素
    }
  }
  // 返回哑节点的下一个节点 即翻转后的链表
  return dummy.next //dummy本身是个空节点
};
