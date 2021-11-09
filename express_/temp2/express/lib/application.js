const http = require('http')

const Router = require('./router')
// 应用系统和路由系统分离
function Application () {
  // 在创建应用时候会多一个路由系统中
  this._router = new Router()
}
Application.prototype.get = function (path, cb) {
  this._router.get(path, cb)
}
Application.prototype.listen = function (...args) {
  const server = http.createServer((req, res) => {
    // 如果路由系统无法处理
    function done (req, res) {
      res.end(`Cannot ${req.method}`)
    }
    this._router.handle(req, res, done)
  })
  server.listen(...args)
}
module.exports = Application