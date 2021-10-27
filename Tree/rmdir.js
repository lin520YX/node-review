const fs = require('fs')
const path = require('path')
function rmdir(dir,cb){
  fs.stat(dir,(err,stat)=>{
    if(stat.isFile())return fs.unlink(dir,cb)
    fs.readdir(dir,(err,dirs)=>{
      dirs = dirs.map(item=>path.join(dir,item))
      // 先删除子节点 在删除父节点
      let idx = 0
      function next(){
        if(idx==dirs.length) return fs.rmdir(dir,cb)
        let current = dirs[idx++]
        rmdir(current,next)
      }
      next()
    })
  })
}
rmdir('a',function(){
  console.log('删除成功')
})