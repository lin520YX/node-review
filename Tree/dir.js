const fs = require('fs')
const path = require('path')
//1 如何创建文件夹 
// 2 如何删除文件夹
// 3 如何判断是不是文件夹
// 4 文件夹放的内容

// 这些方法也分为同步和异步

// 创建目录 父目录必须存在
/**
 * [Error: ENOENT: no such file or directory, mkdir 'a/b/c'] {
  errno: -2,
  code: 'ENOENT',
  syscall: 'mkdir',
  path: 'a/b/c'
}
 * */ 
// fs.mkdir('a',(err)=>{
//   console.log(err)
// })

// 删除目录时候需要保证目录当中的内容是空的
// fs.rmdir('a',(err)=>{
//   console.log(err)
// })

// 只读取儿子这一层
// 文件目录读取
// 查看状态 fs.stat
// 删除文件 unlink
fs.readdir('a',(err,dirs)=>{
  // [ 'a.js' ]
  dirs = dirs.map(item=>{
    const p = path.join('a',item)
    fs.stat(p,(err,stat)=>{
        if(stat.isFile()){
          fs.unlink(p,()=>{})
        }
    })
    return  p
  })  
})

