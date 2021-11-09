const url = require('url');
function Router () {
  this.stack = []
}
Router.prototype.get = function (path, callback) {
  this.stack.push({
    path,
    method: 'get',
    handler: callback
  })
}
Router.prototype.handle = function (req, res, done) {
  let { pathname } = url.parse(req.url);
  let requestMethod = req.method.toLowerCase();
  for (let i = 0; i < this.stack.length; i++) {
    let { path, method, handler } = this._router[i]
    if ((pathname == path) && method === requestMethod) {
      return handler(req, res);
    }
  }
  done(req, res);
}
module.exports = Router;