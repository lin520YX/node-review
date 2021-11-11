const PathToRegExp = require('path-to-regexp')
function Layer (path, handler) {
  this.path = path;
  this.handler = handler;
  this.regExp = PathToRegExp(this.path,this.keys=[],true)
}
Layer.prototype.match = function (pathname) {
  // 区分是路由还是中间件 中间件需要匹配是否以他开头

  // 当请求路径到来时 我需要拿到请求路径 用户配置的是带：
  if (this.path == pathname) {
    return true
  }
  if(this.keys.length>0){
    let matches = pathname.match(this.regExp)
    if(matches){
      const values = matches.slices(1)
      this.params = {}
      this.keys.forEach((item,index)=>{
        this.params[item.name] = values
      })
      return true

    }
  }
  if (!this.route) {
    if (this.path == '/') return true
    return pathname.startsWith(this.path + '/')
  }
  return false
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