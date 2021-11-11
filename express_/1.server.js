const express = require('express');
const PathToRegExp = require('path-to-regexp')
const app = express()
// 路由要匹配路径和方法 但是中间件不需要匹配到方法 不写路径默认就是/
// 可以对req res 扩展 
// 可以决定是否向下执行 
// 针对某个路径做处理中间件必须在真实的处理路由之前声明
// 4 错误处理中间件
let str ='/a/:id/:name/a'.replace(/:([^/]+)/g,function(){
  return '([^/]+)'
})
let key = []
const res = PathToRegExp('/a/:id/:name/a',key)
console.log(res,key)
app.get('/a/:id/:name', (req, res, next) => {
  res.end(JSON.stringify(req.params))

})



// 错误处理中间件
app.use((err, req, res, next) => {

})
app.listen(3000)