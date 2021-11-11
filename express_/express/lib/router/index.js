const url = require('url');
const Layer = require('./layer');
const Route = require('./route');
const methods = require('methods');

function Router () { // 如果一个类返回的不是基本数据类型那么这个类中的this 会指向这个返回值
  let router = (req, res, next) => { // express.Router() = 这个中间件函数
    console.log(req.url)
    // 请求时会走到此函数中
    // 怎么去处理对应的stack中的内容
    // router.handle(req, res, next)

  }
  router.stack = [];
  router.__proto__ = proto;
  return router; // router 会作为实例
}

// 1.创建route 和 layer  layer上要有一个route属性
let proto = {}
proto.route = function (path) {
  let route = new Route();
  // 每次调用get方法时 都产生一个layer （路径，对应route的dispatch方法）
  let layer = new Layer(path, route.dispatch.bind(route)); // layer(path,dispatch)
  layer.route = route;
  this.stack.push(layer); // 将这一层放到stack中
  return route;
}
methods.forEach(method => {
  proto[method] = function (path, handlers) {
    let route = this.route(path); // 产生route
    route[method](handlers); // 将用户传入的真实回调 全部传到route中
  }
})
proto.use = function (path, handler) {
  if (typeof path === 'function') { // 如果只传递一个参数是函数
    handler = path; // handler就是这个函数
    path = '/' // 路径默认就是 /
  }
  let layer = new Layer(path, handler);
  layer.route = undefined; // 只是提示 中间件没有route属性
  this.stack.push(layer);
}
// 请求到来的时候 会触发此方法
proto.handle = function (req, res, out) {
  let { pathname } = url.parse(req.url);
  // 先遍历外层数组
  let idx = 0;
  let removed = '';
  const next = (err) => {
    if (this.stack.length === idx) return out()
    let layer = this.stack[idx++];
    // 出错找错误处理中间件
    if (removed) {
      req.url = removed + pathname; // 当调用next时 会从上一层跑到下一次去, 这时要把删除的路径加上
      removed = '';
    }
    if (err) {
      if (!layer.route) { // 中间件
        layer.handle_error(err, req, res, next)
      } else {
        next(err); // 路由
      }
    } else {
      if (layer.match(pathname)) { // 无论是中间件还是路由 都要匹配路径
        req.params = layer.params;
        // 有可能是中间件 
        if (layer.route) {
          if (layer.route.match_method(req.method)) {
            layer.handle_request(req, res, next); // dispatch 里面处理完毕了 调用next方法
          } else {
            next();
          }
        } else {
          // 如果参数是4个参数 说明是错误处理中间件 ，正常逻辑不应该走错误处理逻辑
          if (layer.handler.length != 4) {
            if (layer.path !== '/') {
              removed = layer.path; // /add
              req.url = pathname.slice(removed.length)
            }

            layer.handle_request(req, res, next);
          } else {
            next()
          }
        }
      } else {
        next();
      }
    }

  }
  next();
}
module.exports = Router;