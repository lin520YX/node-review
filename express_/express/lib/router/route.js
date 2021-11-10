const Layer = require('./Layer')
const methods = require('methods')

function Route () {
  this.stack = []
  this.methods = {}
}
Route.prototype.dispatch = function (req, res, out) {
  let idx = 0
  const next = () => {
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
Route.prototype.match_method = function (method) {
  return this.methods[method.toLowerCase()]
}
methods.forEach(method => {
  Route.prototype[method] = function (handlers) {
    handlers.forEach(handler => {
      const layer = new Layer('', handler)
      layer.method = method
      this.stack.push(layer)
    });
  }
})


module.exports = Route