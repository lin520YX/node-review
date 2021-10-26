// bst binary search tree
class Node{ // 节点必须又一个parent
  constructor(element,parent){
    this.element = element
    this.parent = parent
    this.left = null
    this.right = null
  }
}

class BST{
  constructor(){
    this.root = null
    this.size = 0
  }
  add(element){
    if(this.root == null){
      this.root = new Node(element,null)
      this.size ++
      return 
    }
    // 根据根的值比较拆入
    // 根据条件不停的找 找到节点为空时 将上一次的值保存起来将节点插入到保存的节点中
    let currentNode = this.root
    let parent = null
    let compare = null
    while(currentNode){
     compare =  element - currentNode.element
     parent = currentNode //在进入左右子树之前保存的节点
     if(compare>0){
      currentNode = currentNode.right
     }else{
      currentNode = currentNode.left
     }
    }
    let newNode =  new Node(element,parent)
    if(compare>0){
      parent.right = newNode
    }else{
      parent.left = newNode
    }
    this.size ++
  }
  preOrderTraversal(visitor){
    const traversal = (node)=>{
      if(node==null)return 
      visitor.visit(node.element)
      traversal(node.left)
      traversal(node.right)
    }
    traversal(this.root)
  }
  inOrderTraversal(visitor){
    const traversal = (node)=>{
      if(node==null)return 
      traversal(node.left) // 10 8 6 先进后出
      visitor.visit(node.element)
      traversal(node.right)
    }
    traversal(this.root)
  }
  // 根据parent属性 一般情况下都可以用栈结构来避免递归
  postOrderTraversal(visitor){
    const traversal = (node)=>{
      if(node==null)return 
      traversal(node.left)
      traversal(node.right)
      visitor.visit(node.element)
    }
    traversal(this.root)
  }
  levelOrderTraversal(visitor){
    if(this.root==null)return;
    let stack = [this.root];
    let index = 0
    let currentNode = null
    while(currentNode=stack[index++]){
      visitor.visit(currentNode)
      if(currentNode.left){
        stack.push(currentNode.left)
      }
      if(currentNode.right){
        stack.push(currentNode.right)
      }
    }
  }
  // 左右互换
  invertTree(){
    if(this.root==null)return;
    let stack = [this.root];
    let index = 0
    let currentNode = null
    while(currentNode=stack[index++]){
      let temp = currentNode.left
      currentNode.left = currentNode.right
      currentNode.right = temp
      if(currentNode.left){
        stack.push(currentNode.left)
      }
      if(currentNode.right){
        stack.push(currentNode.right)
      }
    }
  }
 
}
let bst = new BST()
let arr = [10,8,19,6,15,20,22]
arr.forEach(item=>{
  bst.add(item) //二叉搜索树中的内容必须有比较性
})
// console.dir(bst,{depth:10})

// 访问者模式 
bst.levelOrderTraversal({
  visit(e){
    console.log(e.element)
  }
})

// 常见的遍历方式 前中后层
// 





