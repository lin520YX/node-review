// 链表 常见的数据结构 队列 栈 链表 树
// 队列 先进先出 push shift 事件环
// 栈 路由 push pop 后进先出


// 数组的shift消耗性能 每执行依次 都要前挪
// 链表 用过指针链接起来 只需要移动指针

// 链表查找 删除的复杂度是On 可以使用链表 实现栈或者队列

// 节点
class Node{
  constructor(element,next){
    this.element = element
    this.next = next
  }
}
// 列表
class LinkedList{
  constructor(){
    this.head = null
    this.size = 0
    this.tail = null
  }
  add(index,element){
    if(arguments.length ==1){
      element = index
      index = this.size 
    }

    if(index<0||index>this.size){
      throw new Error('链表索引异常')
    }
    if(index ==0){
      let head = this.head
      this.head = new Node(element,head)
    }else{
      let prevNode = this.getNode(index-1)
      // console.log('prevNode',prevNode)
      prevNode.next = new Node(element,prevNode.next)
    }
    this.size++
  }
  remove(index){
    let oldNode
    if(index==0){
      oldNode = this.head
      this.head = oldNode&&oldNode.next
    }else{
      let prevNode = this.getNode(index-1)
      console.log('prevNode',prevNode)
      oldNode = prevNode.next
      prevNode.next = prevNode.next.next
    }
    this.size --
    return oldNode
  }
  getNode(_index){
    let current = this.head
    for(let i=0;i<_index;i++){
      current = current.next
    }
    return current
  }
  len(){
    return this.size
  }
}
// let ll = new LinkedList()
ll.add(0,100)
ll.add(1,200)
ll.add(2,300)
console.log(ll.getNode(0))
// console.log(ll.head)
// Node {
//   element: 100,
//   next: Node { element: 200, next: Node { element: 300, next: null } }
// }
/**
 * function a(){
 *  function b(){
 *  }
 *  b()
 * }
 * a()
 * 
 * */ 
module.exports = LinkedList