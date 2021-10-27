const fs = require('fs')
const path = require('path')
function rmdir(dir,cb){ 
  fs.stat(dir,(err,stat)=>{
    if(stat.isFile())return fs.unlink(dir,cb)
    fs.readdir(dir,(err,dirs)=>{
      dirs = dirs.map(item=>path.join(dir,item))
      // 先删除子节点 在删除父节点
      // 并发删除多个儿子 删除完毕通知父节点
      // 并行
      if(dirs.length==0){
        return fs.rmdir(dir,cb)
      }
      let idx = 0
      function done(){
        if(++idx==dirs.length){
          fs.rmdir(dir,cb)
        }
      }
      for(let i=0;i<dirs.length;i++){
        let dir = dirs[i]
        rmdir(dir,done)
      }
    })
  })
}
rmdir('a',function(){
  console.log('删除成功')
})