const Layer = require('./Layer')
function Route () {
  this.stack = []
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
Route.prototype.get = function (handlers) {
  handlers.forEach(handler => {
    const layer = new Layer('', handler)
    layer.method = 'get'
    this.stack.push(layer)
  });
}

module.exports = Route