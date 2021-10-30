const http = require('http')
const path = require('path')
const fs = require('fs').promises
const {createReadStream,createWriteStream,readFileSync} = require('fs')
const url = require('url')
const ejs = require('ejs')
const mime = require('mime')
const chalk = require('chalk')


class Server{
  constructor(options){
    this.port = options.port
    this.directory = options.directory
    this.template = readFileSync(path.resolve(__dirname,'render.html'),'utf8')
  }
  cache(req,res,statObj,filePath){
    res.setHeader('Expires',new Date(Date.now()+10*1000).toGMTString())
    res.setHeader('Cache-control','no-cache')
       // res.setHeader('Cache-control','no-cache')
    // res.setHeader('Cache-control','no-store')
    // 过了10秒 文件还是没变 可以不用返回文件告诉浏览器找缓存 缓存中就是最新的
    // 协商缓存 上了一下 是否需要最新的如果不需要返回内容 直接给304的状态码便是缓存就可以了
    
    // 默认先走强制缓存10s 内不会请求到服务器而采用浏览器缓存但是10s之后再次发送请求后端要进行对比
    // 1） 文件没有变化直接返回304 浏览器会去缓存中找文件 之后的10s还是会走缓存 
    // 2）返回最新的之后10s中还是会走缓存不停的循环
 
    // 看文件是否变化

    // 设置缓存 默认强制缓存10s 10秒内不会向服务器发起请求 首页不会被强制缓存
    //  引用的资源可以被强制缓存



    // 根据修改事件来判断文件是否修改了 304 服务端设置
    // 缺陷 如果文件没变 修改时间修改了
    let ifModifiedSince = req.header['if-modified-since']
    let ctime = statObj.ctime.toGMTString()
    res.setHeader('Last-Modified',ctime);
    return ifModifiedSince==ctime
    

  }
  async handleRequest(req,res){
    let {pathname} =url.parse(req.url,true)
    // 可能路径含有中文
    pathname = decodeURIComponent(pathname)

    try {
      // resolve遇到 /会去找根路径
      let filePath = path.join(this.directory ,pathname)
      // favicon 浏览器发送的图标
      let statObj = await fs.stat(filePath)
      if(statObj.isFile()){ //mime 根据文件后缀来识别是什么类型
        this.sendFile(req,res,statObj,filePath)
      }else{
       let dirs =  await fs.readdir(filePath)
      //  根据文件名产生目录和href
        dirs =  dirs.map(item=>({
          dir:item,
          href:path.join(pathname,item)
        }))
        // console.log(this.template)
        let result = await ejs.render(this.template,{dirs},{async:true})
        console.log(result.toString())
        res.setHeader('Content-Type','text/html;charset=utf-8')
        res.end(result)
      }
    } catch (error) {
      this.sendError(error,req,res)
    }
  }
  sendFile(req,res,statObj,filePath){
    if(this.cache(req,res,statObj,filePath)){
      res.statusCode = 304 //包含首次访问的资源
      return res.end()
    }
    res.setHeader('Content-Type',mime.getType(filePath)+';charset=utf-8')
    createReadStream(filePath).pipe(res)
  }
  sendError(error,req,res){
    res.statusCode =404;
    res.end('Not Found')
  }
  start(){
    
    const server =  http.createServer(this.handleRequest.bind(this))
    server.listen(this.port,()=>{
      console.log('server starting:./',path.relative(process.cwd(),this.directory))
      console.log(`http://localhost:${chalk.green(this.port)}`)
    })
  }
}
module.exports = Server
