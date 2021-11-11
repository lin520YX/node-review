const Layer = require('./Layer')
const methods = require('methods')

function Route () {
  this.stack = []
  this.methods = {}
}
Route.prototype.dispatch = function (req, res, out) {
  let idx = 0
  const next = (err) => {
    if (err) return out(err)
    if (idx === this.stack.length) return out()
    let layer = this.stack[idx++]
    if (layer.method === req.method.toLowerCase()) {
      layer.handler(req, res, next)
    } else {
      next()
    }
  }
  next()
}
Route.prototype.use = function (path, handler) {
  if (typeof path === 'function') {
    handler = path
    path = '/'
  }
  let layer = new Layer(path, handler)
  // 中间件没有路由属性
  layer.route = undefined
  this.stack.push(layer)
}
Route.prototype.match_method = function (method) {
  console.log(method)
  return this.methods[method.toLowerCase()]
}
methods.forEach(method => {
  Route.prototype[method] = function (handlers) {
    handlers.forEach(handler => {
      const layer = new Layer('', handler)
      layer.method = method
      this.methods[method] = true;
      this.stack.push(layer)
    });
  }
})


module.exports = Route