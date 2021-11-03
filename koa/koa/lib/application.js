const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')
const Stream = require('stream')
const EventEmitter = require('events')

class Application extends EventEmitter {
  constructor() {
    super()
    // 我们不能直接吧request赋值给context 如果其中一个改变了request和response
    this.context = Object.create(context) //一般用于继承 可以继承原本的属性 用户扩展到新创建的对象 不会影像原来的对象
    this.request = Object.create(request)
    this.response = Object.create(response)
    this.middleWare = []
  }
  use (fn) {
    this.middleWare.push(fn)
  }
  createContext (req, res) {
    // 每次请求之间都创建一个全新的上下文保证每次请求互不干扰
    let ctx = Object.create(this.context)
    let request = Object.create(this.request)
    let response = Object.create(this.response)
    ctx.request = request
    ctx.request.req = ctx.req = req
    ctx.response = response
    ctx.response.res = ctx.res = res
    return ctx
  }
  compose (ctx) {
    let index = -1
    const dispatch = (i) => {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      if (i == this.middleWare.length) return Promise.resolve() //终止
      let middleware = this.middleWare[i]
      if (!middleware) return Promise.resolve()
      // await next
      try {
        return Promise.resolve(middleware(ctx, dispatch.bind(null, i + 1)))
      } catch (e) {
        return Promise.reject(e)
      }
    }
    return dispatch(0)
  }
  handleRequest (req, res) {
    let ctx = this.createContext(req, res)
    res.statusCode = 404;
    this.compose(ctx).then(() => {
      let body = ctx.body
      if (typeof body == 'string' || Buffer.isBuffer(body)) {
        res.end(ctx.body)
      } else if (body instanceof Stream) {
        // res.setHeader('Content-Disposition', `attachment;filename=${encodeURIComponent('下载')}`)
        body.pipe(res)
      } else if (typeof body == 'object') {
        res.end(JSON.stringify(body))
      } else {
        res.end('Not Found')
      }
    }).catch(err => {
      this.emit('error', err)
    });
    this.on('error', () => {
      res.statusCode = 505
      res.end('Internal Error')
    })


  }
  listen (...args) {
    let server = http.createServer(this.handleRequest.bind(this))
    server.listen(...args)
  }
}
module.exports = Application