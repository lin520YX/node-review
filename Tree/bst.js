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
}

let bst = new BST()
let arr = [10,8,19,6,15,20,22]
arr.forEach(item=>{
  bst.add(item) //二叉搜索树中的内容必须有比较性
})
console.dir(bst,{depth:10})
