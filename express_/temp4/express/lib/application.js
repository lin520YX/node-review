const http = require('http')

const Router = require('./router')

const methods = require('methods')
// 应用系统和路由系统分离
function Application () {
  // 在创建应用时候会多一个路由系统中
}
Application.prototype.lazy_route = function () {
  if (!this._router) {
    this._router = new Router()
  }
}
methods.forEach(method => {
  Application.prototype[method] = function (path, ...cb) {
    this.lazy_route()
    this._router[method](path, [...cb])
  }
})


Application.prototype.listen = function (...args) {
  const server = http.createServer((req, res) => {
    // 如果路由系统无法处理
    function done () {
      res.end(`Cannot ${req.method}`)
    }
    this.lazy_route()
    this._router.handle(req, res, done)
  })
  server.listen(...args)
}
module.exports = Application