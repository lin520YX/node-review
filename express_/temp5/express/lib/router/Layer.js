function Layer (path, handler) {
  this.path = path;
  this.handler = handler;
}
Layer.prototype.match = function (pathname) {
  // 区分是路由还是中间件 中间件需要匹配是否以他开头
  if (this.path == pathname) {
    return true
  }
  if (!this.route) {
    if (this.path == '/') return true
    return pathname.startsWith(this.path + '/')
  }
}
Layer.prototype.handle_request = function (req, res, next) {
  this.handler(req, res, next)
}
Layer.prototype.handle_error = function (err, req, res, next) {
  if (this.handler.length == 4) {
    return this.handler(err, req, res, next)
  } else {
    next(err)
  }
}

module.exports = Layer;