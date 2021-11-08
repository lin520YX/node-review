const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
app.keys = ['hahaha']
router.get('/visit', (ctx, next) => {
  ctx.cookies.get('visit', { signed: true })
})
app.use(Router.routes())
app.listen(4002, () => {
  console.log(4002)
})