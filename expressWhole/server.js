const express = require('./express')
const app = express()
const path = require('path')
app.set('views',path.resolve('view'))
app.set('view engine','html')
app.engine('html',require('ejs').__express)
app.get('/',(req,res)=>{
  console.log(res.render)
  res.render('index.ejs',{name:'lyf'})
})
app.listen(3009,function(){
  console.log(3009)
})