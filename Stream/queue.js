let LinkedList = require('./LinkedList')
// 队列
class Queue{
  constructor(){
    this.ll = new LinkedList()
  }
  offer(element){
    this.ll.add(element)
  }
  poll(){
    return this.ll.remove(0)
  }
}
module.exports = Queue