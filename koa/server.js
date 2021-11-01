const koa = require('./koa')
const app = new koa()
// 实例上比较核心的方法有三个 listen use on('error',(e)=>{]})
app.use((ctx)=>{ //handleRequest
// ctx 上下文对象
  // ctx 是koa的上下文 req,res 是原生的 request response 是封装的
  // ctx.body('hello')
  console.log(ctx)
  // 自己封装的request 上有原生封装的req属性 
  // let {pathname} = url.parse() =>path
  // console.log(ctx.req.url) //原生的
  // console.log(ctx.request.req.url) //原生的
  // console.log(ctx.request.url) //自己封装的
  // console.log(ctx.url)//自己封装的
 
})
app.listen(3000,()=>{
  console.log('3000')
})

// use 注册函数
// ctx 上下文这里对原声的req res 进行了封装 封装除了一个新的对象request response