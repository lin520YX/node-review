const fs = require('fs')

// fs fileSystem 和文件相关的方法 文件夹 文件 都在这里

// 里面的方法一般有两种类型
// 1）同步 sync 
// 2）异步 没有sync

// 如果是读取文件 读取到的结果默认都是buffer
// 写入的时候会清空文件内容然后以utf8格式写入
// 运行时采用相对路径 会以process.cwd()来切换路径 可能导致不同路径下结果不同
const path = require('path');
fs.readFile(path.resolve(__dirname,'note.md'),function(err,data){
  // flags r=read w=write a=>append (追加)
  fs.writeFile(path.resolve(__dirname,'note2.md'),data,
  {flag:'a'},
  function(err,data){
    console.log(data)
  })

  // fs.appendFile(path.resolve(__dirname,'note2.md'),data,
  // function(err,data){
  //   console.log(data)
  // })
})

// 1) 读取的内容都会放到内存中
// 2）如果文件过大会浪费内存 大型文件这样读取可能会淹没内存 不能此阿勇这种方式
// 64k以上的文件使用开背操作尽量不要用readFile


// 手动读写文件 fs.open fs.read fs.write fs.close
// 