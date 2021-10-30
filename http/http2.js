// 1 返回静态文件 2 返回数据


const http = require('http');
const path = require('path')
const url = require('url')
const fs = require('fs').promises
const {createReadStream} = require('fs')
const mime = require('mime')
class StaticServer{
  async handleRequest(req,res){
    console.log(req.url)
    let {pathname} =url.parse(req.url,true)
    console.log(pathname)// /

  try {
    // resolve遇到 /会去找根路径
    let filePath = path.join(__dirname,pathname)
    // favicon 浏览器发送的图标
    let statObj = await fs.stat(filePath)
    if(statObj.isFile()){ //mime 根据文件后缀来识别是什么类型
      res.setHeader('Content-Type',mime.getType(filePath)+';charset=utf-8')
      createReadStream(filePath).pipe(res)
    
    }else{
      filePath =  path.join(filePath,'index.html')
      await fs.access(filePath)
      res.setHeader('Content-Type','text/html;charset=utf-8')
      createReadStream(filePath).pipe(res)
    }
  } catch (error) {
    this.sendError(error,req,res)
  }
  }
  sendError(error,req,res){
    res.statusCode =404;
    res.end('Not Found')
  }
  start(port,cb){
    const server = http.createServer(this.handleRequest.bind(this))
    server.listen(port,()=>{
      cb(port)
    })
  }
}

new StaticServer().start(3899,(port)=>{
  console.log('server start 3899')
})
