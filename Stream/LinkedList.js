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
    this.size++
  }
  remove(){

  }
  getNode(){

  }
  size(){

  }
}
/**
 * function a(){
 *  function b(){
 *  }
 *  b()
 * }
 * a()
 * 
 * */ 