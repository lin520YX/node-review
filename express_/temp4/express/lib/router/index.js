const url = require('url');
const Layer = require('./Layer');
const Route = require('./route');
const methods = require('methods')
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
methods.forEach(method => {
  Router.prototype[method] = function (path, callbacks) {
    let route = this.route(path)
    route[method](callbacks)
  }
})

Router.prototype.handle = function (req, res, done) {
  let { pathname } = url.parse(req.url);
  let idx = 0
  const next = () => {
    if (this.stack.length === idx) return done()
    let layer = this.stack[idx++];
    if (layer.match(pathname)) {
      if (layer.route.match_method(req.method.toLowerCase())) {
        layer.handle_request(req, res, next); // dispatch 里面处理完毕了 调用next方法
      } else {
        next();
      }
    } else {
      next()
    }
  }
  next()
}
module.exports = Router;