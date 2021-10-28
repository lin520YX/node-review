const http = require('http');
// 解析请求路径
const url = require('url')
/**
 *  uri （uniform resource indentifier） 统一资源标识符
 *  url  统一资源定位符
 *  urn  统一资源命中符
 *  hostname 主机名
 *  pathname 请求路径
 *  query 查询参数
 * */ 
// curl -v -X GET -d a=1 http://localhost:4001?a=1
const path = require('path')
let server = http.createServer((req,res)=>{
  // console.log(req)
  // 请求部分
  // console.log(req.method)
  // console.log(req.url) //后面的# 前面的 希望获取用户的参数  
  // const realPath = path.join(req.hos)
  // console.log(url.parse(req.url,true)) //查询参数变成对象
  let {pathname,query} = url.parse(req.url,true)
  console.log(pathname)
  console.log(query)
  let arr = []
  // 如果流中的数据为空 内部会调用push(null) 只要调用就一定触发end
  req.on('data',(chunk)=>{
    arr.push(chunk)
  })
  req.on('end',()=>{ //如果没有数据也会触发end 方法
    console.log(Buffer.concat(arr).toString(),'11111')
  })
  // let query = {}
  // req.url.replace(/([^&?=]+)=([^&?=]+)/gi,function(){
  //   console.log(arguments)
  //   query[arguments[1]]=arguments[2]
  // })
  // console.log(query)
  
  // console.log(req.httpVersion)
  // console.log(req.headers)
})
// server.on('request',(req,res)=>{

// })
let port =4001
server.listen(port,()=>{
  console.log(`server port ${port}`)
})
server.on('error',(err)=>{
  if(err.errno === 'EADDRINUSE'){
    server.listen(++port)
  }
})

// 服务端代码改变必须重新执行

// nodemon node monintor 