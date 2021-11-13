const http = require('http')

const Router = require('./router')
const path = require('path')
const methods = require('methods')
const init = require('./middle/init')
// 应用系统和路由系统分离
function Application () {
  // 在创建应用时候会多一个路由系统中
  this.settings = {}
  this.engines = {}
}
Application.prototype.set = function (key,value) {
  if(arguments.length==1){
    return this.settings[key]
  }
  this.settings[key] = value
  return this
}
Application.prototype.engine = function (ext,fn) {
  this.engines[ext] = fn
  return this
}
Application.prototype.render = function (name,options,cb) {
  let engines = this.engines
  let type = this.get('view engine')
  let render = engines[type];
  let file = path.resolve(this.get('views'),name)
  render(file,options,cb)

}
Application.prototype.lazy_route = function () {
  if (!this._router) {
    this._router = new Router()
    this.use(init)
  }
}

methods.forEach(method => {
  Application.prototype[method] = function (path, ...cb) {
    if(method =='get'&&arguments.length == 1){
      return this.set(arguments[0])
    }
    this.lazy_route()
    this._router[method](path, [...cb])
  }
})

Application.prototype.use = function (path, handler) {
  this.lazy_route()
  this._router.use(path, handler)
}


Application.prototype.listen = function (...args) {
  const server = http.createServer((req, res) => {
    res.app = this;
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