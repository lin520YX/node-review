const path = require('path')
const fs = require('fs')
const url = require('url')


module.exports = (req,res,next)=>{
  res.sendFile=function(filename,option={}){
    if(option.root){
      fs.createReadStream(path.resolve(option.root,filename)).pipe(res)
    }
  }
  res.redirect=function(url){
    res.setHeader('Location',url)
    res.statusCode = 302;
    res.end()
  }
  res.render = function(name,options){
    res.app.render(name,options,(err,html)=>{
        if(err){
          return res.end('Error')
        }
        res.setHeader('Content-Type','text/html;charset=utf-8')
        res.end(html)
    })
  }
  res.send = function(value){
    if(typeof value =='string' || Buffer.isBuffer(value)){
      res.setHeader('Content-Type','text/html;charset=utf-8')
      res.end(value)
    }else if(typeof value == 'object'){
      res.setHeader('Content-Type','application/json')
      res.end(JSON.stringify(value))
    }
  }
  next()
}