const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')
class Application{
  constructor(){
    // 我们不能直接吧request赋值给context 如果其中一个改变了request和response
    this.context = Object.create(context) //一般用于继承 可以继承原本的属性 用户扩展到新创建的对象 不会影像原来的对象
    this.request = Object.create(request)
    this.response = Object.create(response)
  }
  use(fn){
    this.fn = fn
  }
  createContext(req,res){
    // 每次请求之间都创建一个全新的上下文保证每次请求互不干扰
    let ctx = Object.create(this.context)
    let request = Object.create(this.request)
    let response = Object.create(this.response)
    ctx.request = request
    ctx.request.req = ctx.req = req
    ctx.response = response
    ctx.response.res =ctx.res = res
    return ctx
  }
  handleRequest(req,res){
    let ctx = this.createContext(req,res)
    this.fn(ctx)
  }
  listen(...args){
   let server =  http.createServer(this.handleRequest.bind(this))
   server.listen(...args)
  }
}
module.exports = Application