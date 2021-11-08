const http = require('http')
const url = require('url')

const routers = [{
  path: '*', method: 'all', handler: (req, res) => {
    res.end('Not Found')
  }
}]
const createApplication = function () {
  return {
    get (path, cb) {
      routers.push({
        path, method: 'get', handler: cb
      })
    },
    listen (...args) {
      const server = http.createServer((req, res) => {
        let { pathname } = url.parse(req.url)
        let requestMethod = req.method.toLowerCase()
        for (i = 0; i < routers.length; i++) {
          let { path, method, handler } = routers[i]
          if (pathname == path && method == requestMethod) {
            return handler(req, res)
          }
        }
        routers[0].handler(req, res)
      })
      server.listen(...args)
    }
  }
}
module.exports = createApplication