const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
app.keys = ['hahaha']
// koa 专门用了一个字段来描述签名

// const crypto = require('crypto')
// crypto.createHash('sha1', 'hahah').update('visit=9').digest('base64')
app.keys = ['hahah']
let session = {} //记录映射关系 如果刷新会丢失数据,可以用redis 或者mongo 存储session

const cardName = 'connect.sid'
router.get('/visit', (ctx, next) => {
  let _card = ctx.cookies.get(cardName)
  if (_card && session[_card]) {
    session[_card].money -= 10
    ctx.body = `${session[_card].money}`
  } else {
    let cardId = Math.random() + Date.now().toString()
    ctx.cookies.set(cardName, cardId)
    session[cardId] = { money: 100 }
    ctx.body = '100'
  }
  // console.log(ctx)
  // let visit = ctx.cookies.get('visit', { signed: true })
  // if (visit) {
  //   visit++;
  // } else {
  //   visit = 1
  // }
  // console.log(visit)
  // ctx.cookies.set('visit', visit, { signed: true })
  // ctx.body = `当前第${visit}次访问`
})
app.use(router.routes())
app.listen(4002, () => {
  console.log(4002)
})