// 添加 查询


let Router = require('koa-router')
const ArticleController = require('../controller/articleController')
const router = new Router({ prefix: '/article' })
const articleCtrl = new ArticleController()
router.get('/add', articleCtrl.add)
router.get('/list', articleCtrl.list)
module.exports = router