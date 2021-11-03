const koa = require('koa')
const app = new koa()
const path = require('path')
const fs = require('fs')
//可以决定是否向下执行 做权限 统一的拦截 如果不合法 不必向下执行
// 默认可以在中间件中扩展属性和方法

//koa 中所有的use 传入的方法 都会被包装成promise
// 会把所有的promise 变成promise链 内部next 前面必须加await
// 所有的异步逻辑都要包装为promise
app.use((ctx, next) => { //handleRequest
  console.log(1)
  next()
  console.log(2)
})
app.use((ctx, next) => { //handleRequest
  console.log(3)
  next()
  console.log(4)

})
app.use((ctx, next) => { //handleRequest
  console.log(5)
  next()
  console.log(6)

})
app.listen(3001, () => {
  console.log('3001')
})

// use 注册函数
// ctx 上下文这里对原声的req res 进行了封装 封装除了一个新的对象request response