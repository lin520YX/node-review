const url = require('url');
const Layer = require('./Layer');
const Route = require('./route');
function Router () {
  this.stack = []
}
Router.prototype.route = function (path) {
  let route = new Route()
  // 每次调用 都产生一个layer （path，对应route的dispatch）
  let layer = new Layer(path, route.dispatch.bind(route))
  layer.route = route
  this.stack.push(layer)
  return route
}
Router.prototype.get = function (path, callbacks) {
  let route = this.route(path)
  route.get(callbacks)
}
Router.prototype.handle = function (req, res, done) {
  let { pathname } = url.parse(req.url);
  let requestMethod = req.method.toLowerCase();
  let idx = 0
  const next = () => {
    if (this.stack.length === idx) return done()
    let layer = this.stack[idx++];
    if (layer.match(pathname)) {
      layer.handler(req, res, next)
    } else {
      next()
    }
  }
  next()
}
module.exports = Router;