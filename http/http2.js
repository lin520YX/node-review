// 1 返回静态文件 2 返回数据


const http = require('http');
const path = require('path')
const url = require('url')
const fs = require('fs').promises
const {createReadStream} = require('fs')
class StaticServer{
  async handleRequest(req,res){
    console.log(req.url)
    let {pathname} =url.parse(req.url,true)
    console.log(pathname)// /

    // resolve遇到 /会去找根路径
    let filePath = path.join(__dirname,pathname)
    console.log(filePath)
    let statObj = await fs.stat(filePath)
    if(statObj.isFile()){
      createReadStream(filePath).pipe(res)
    
    }else{

    }
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
