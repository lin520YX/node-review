let Router = require('koa-router')
const UserController = require('../controller/userController')
const router = new Router({ prefix: '/user' })
const userCtrl = new UserController()
router.get('/add', userCtrl.add)
router.get('/list', userCtrl.list)
module.exports = router