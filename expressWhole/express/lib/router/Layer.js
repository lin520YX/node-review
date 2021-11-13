const pathToRegExp = require('path-to-regexp'); // 第三方
function Layer (path, handler) {
  this.path = path;
  this.handler = handler;
  // /user/:id/:name => [id,name]
  this.regExp = pathToRegExp(this.path, this.keys = [], true);
}
Layer.prototype.match = function (pathname) { // 当请求路径到来时pathname   用户配置的是带:name/:id
  // 匹配路径时  需要看一下是路由还是中间件，中间件需要匹配 是否以他开头
  // / /
  // /  如果是/表示都匹配
  // /user/  /user/a
  if (this.path === pathname) {
    return true
  };
  if (this.keys.length > 0) { // 如果时路由 我就看一下当前请求的路径 是否能和我转换出的正则进行匹配
    let matches = pathname.match(this.regExp);
    if (matches) {
      let values = matches.slice(1);
      this.params = {};
      this.keys.forEach((item, index) => {
        this.params[item.name] = values[index];
      });
      return true;
    }
  }
  if (!this.route) { // 中间件
    if (this.path == '/') {
      return true;
    }
    return pathname.startsWith(this.path + '/')
  }
  return false
}
Layer.prototype.handle_error = function (err, req, res, next) {
  if (this.handler.length == 4) {
    return this.handler(err, req, res, next);
  }
  next(err); // 不是错误处理中间件继续向下执行
}
Layer.prototype.handle_request = function (req, res, next) {
  this.handler(req, res, next)
}
module.exports = Layer;