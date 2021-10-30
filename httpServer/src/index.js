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
        res.setHeader('Content-Type',mime.getType(filePath)+';charset=utf-8')
        createReadStream(filePath).pipe(res)
      }else{
       let dirs =  await fs.readdir(filePath)
        // dirs =  dirs.map(item=>path.join(filePath,item))
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
