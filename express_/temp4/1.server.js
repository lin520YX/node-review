const express = require('./express');

const app = express()
// 可以在函数中增加一些中间件 将一个功能拆分成若干个
// 每个路由都有一个layer （path,dispatch）组成
// 每个layer 都有一个route 这个route 存放着真是的毁掉 但是要给每个人增加一个方法 get post delete
// 请求来的时候外层匹配路径执行对应的route的dispatch
app.get('/', function (req, res, next) {

  next()
}, function (req, res, next) {
  setTimeout(() => {
    next()
  }, 2000)
}, function (req, res, next) {
  res.end('home')
})
app.get('/about', function (req, res, next) {
  res.end('about')
})
app.post('/', function (req, res, next) {
  console.log(2)
  next()
});
app.listen(3000)