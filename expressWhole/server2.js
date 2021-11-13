const express = require('express')
const app = express()
// const bodyParser = require('body-parser')
const bodyParser={
  json(){
    return function(req,res,next){
      if(req.headers['Content-Type']=== 'application/json'){
        let arr = []
        req.on('data',function(chunk){
          arr.push(chunk)
        })
        req.on('end',()=>{
          req.body = JSON.parse(Buffer.concat(arr))
          next()
        })
      }else{
        next()
      }
     
    }
  },
  urlencoded(){
    return function(req,res,next){
      if(req.headers['Content-Type']=== 'application/x-www-form-urlencoded'){
        let arr = []
        req.on('data',function(chunk){
          arr.push(chunk)
        })
        req.on('end',()=>{
          req.body = require('querystring').parse(Buffer.concat(arr).toString(),'&','=')
          next()
        })
      }else{
        next
      }
    }
  } 
}


app.use(bodyParser.json({extended:false}))
app.use(bodyParser.urlencoded({extended:false}))

app.post('/login',(req,res)=>{
  console.log(res.body)
})
app.listen(3010,function(){
  console.log(3010)
})