// 数据提交了 服务端应该接收数据 进行响应
// 获取用户数据进行操作

const koa = require('koa');
const app = new koa()
const bodyParser = require('./koa-bodyparser');
const static = require('./koa-static');
const path = require('path')

app.use(static(path.resolve(__dirname)))
app.use(bodyParser())
// app.use(async (ctx, next) => {
//   console.log('GET', ctx.path)
//   if (ctx.path == '/login' && ctx.method == 'GET') {
//     ctx.body = `
//       <form action="/login" method="post">
//       <input type="text" name='username'/>
//       <input type="text" name='password'/>
//         <button>提交</button>
//       </form>
//     `
//   } else {
//     await next()
//   }
// })

app.use(async (ctx, next) => {
  if (ctx.path == '/login' && ctx.method == 'POST') {
    ctx.set('Content-Type', 'text/html')
    ctx.body = ctx.request.body
  }
})
app.listen(1993, () => {
  console.log(1993)
})