// views 关于模版引擎的页面
// routes 路由 koa-router 根据不同功能来划分陆游
// model 数据库相关
// controller 每个路由都应该有一个控制器
// services 提供服务 控制其中可以使用服务中的数据


const Koa = require('koa')
const app = new Koa()
const bodyparser = require('koa-bodyparser')
const static = require('koa-static')
const views = require('koa-views')
const path = require('path')
const router = require('./routes/index')

app.use(bodyparser())
app.use(views(path.resolve(__dirname, 'views'), {
  map: {
    'html': 'ejs'
  }
}))
app.use(static(path.resolve(__dirname, 'public')))
app.use(router())
app.listen(3004, () => {
  console.log('server port:3004')
})