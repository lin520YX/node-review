// 订阅 发布模式
const fs = require('fs')
let Objevent = {
  arr: [],
  emit () {
    this.arr.forEach(fn => fn())
  },
  on (fn) {
    this.arr.push(fn)
  }
}
let obj = {}
Objevent.on(() => {
  if (Object.keys(obj).length == 2) {
    console.log('来了', obj)
  }
})

fs.readFile('node1/curring.js', 'utf8', function (error, data) {
  if (error) return
  obj.a = data
  Objevent.emit()
})
fs.readFile('node1/highOrderFunc.js', 'utf8', function (error, data) {
  if (error) return
  obj.b = data
  Objevent.emit()
})



