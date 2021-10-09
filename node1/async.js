// 异步 数据处理
const fs = require('fs')

let obj = {}
function after (times, cb) {
  return () => {
    --times == 0 && cb()
  }
}
let fn = after(2, () => {
  console.log(obj)
})
fs.readFile('node1/curring.js', 'utf8', function (error, data) {
  obj.a = data
  fn()
})
fs.readFile('node1/highOrderFunc.js', 'utf8', function (error, data) {
  obj.b = data
  fn()
})

// 解决异步问题
