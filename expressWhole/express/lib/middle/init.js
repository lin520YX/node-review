module.exports = (req,res,next)=>{
  res.render = function(name,options){
    res.app.render(name,options,(err,html)=>{
        if(err){
          return res.end('Error')
        }
        res.setHeader('Content-Type','text/html;charset=utf-8')
        res.end(html)
    })
  }
  next()
}