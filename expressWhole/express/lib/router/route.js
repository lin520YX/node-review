const Layer = require('./layer');
const methods = require('methods');
function Route () {
  this.stack = [];
  this.methods = {};
}
Route.prototype.dispatch = function (req, res, out) {
  // 循环当前route中的layer 让他依次执行
  let idx = 0;
  const next = (err) => {
    if (err) return out(err);
    if (idx === this.stack.length) return out();
    let layer = this.stack[idx++];
    // 匹配 方法 可以直接写判断 不用封装了 因为method属性是自定义的
    if (layer.method === req.method.toLowerCase()) {
      layer.handle_request(req, res, next);
    } else {
      next();
    }
  }
  next();
}
Route.prototype.match_method = function (method) {
  return this.methods[method.toLowerCase()]
}
methods.forEach(method => {
  Route.prototype[method] = function (handlers) {
    if (!Array.isArray(handlers)) handlers = [handlers]
    handlers.forEach(handler => {
      const layer = new Layer('', handler);
      layer.method = method; // 给每一层都增加了自定义属性 用来标识方法
      this.methods[method] = true; // {get:true,post:true}
      this.stack.push(layer);
    });
  }
})

module.exports = Route