const express = require('express');

const app = express()
// 路由要匹配路径和方法 但是中间件不需要匹配到方法 不写路径默认就是/
// 可以对req res 扩展 
// 可以决定是否向下执行 
// 针对某个路径做处理中间件必须在真实的处理路由之前声明
// 4 错误处理中间件
app.get('/a', (req, res, next) => {
  console.log(1)
  next()
})
app.use('/a', (req, res, next) => {
  console.log(2)
})

app.listen(3000)