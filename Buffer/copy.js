// 实现读取一点写一点


const fs = require('fs')
const path = require('path')
// i/o 输入输出
// 参照物 内存 要将一个文件的内容 读取到内存  其实是执行了写的操作

// 向文件中写入 其实是做了读的操作
// const buffer = Buffer.alloc(3)
// fs.open(path.resolve(__dirname,'note.md'),'r',function(err,fd){
//   fs.read(fd,buffer,0,3,0,(err,bytesRead)=>{ //真是的读取个数
//     console.log(buffer.toString())
//     fs.close(fd,()=>{
//       console.log('wc')
//     })
//   })
// })
// 权限 chmod -R 7 7 7 
const buffer = Buffer.from('哈哈哈')
// fs.open(path.resolve(__dirname,'note2.md'),'w',function(err,fd){
//   fs.write(fd,buffer,0,3,0,function(err,written){
//     console.log(written)
//   })
// })

// node采用流的方式简化了代码 通过发布订阅进行解藕
function copy(source,target,cb){
  const BufferLength = 3
  const buffer = Buffer.alloc(BufferLength)
  let read_position = 0
  let write_position = 0
  fs.open(source,'r',function(err,rfd){
    fs.open(target,'w',function(err,wfd){
      function next(){
        fs.read(rfd,buffer,0,BufferLength,read_position,(err,bytesRead)=>{
          if(err)return cb(err)
          if(bytesRead){
            fs.write(wfd,buffer,0,bytesRead,write_position,function(err,written){
              read_position +=BufferLength
              write_position +=BufferLength
              next()
            })
          }else{
            fs.close(rfd,()=>{

            })
            fs.close(wfd,()=>{
              
            })
            cb()
          }
          
        })
      }
      next()
    })
  })
}
copy(path.resolve(__dirname,'note.md'),path.resolve(__dirname,'note3.md'),()=>{
console.log(111) 
})
