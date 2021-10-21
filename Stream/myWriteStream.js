// const fs = require('fs')
// const path = require('path')

// const ws = fs.createWriteStream(path.resolve(__dirname,'name.txt'),{
//   flags:'w',
//   // fd:'111',
//   encoding:'utf8',
//   autoClose:true,
//   highWaterMark:2, //默认流水线16k
// })
// ws.write('z')
// ws.write('z')
// ws.write('z')
// ws.write('z')
// ws.write('z')
// ws.on('drain',()=>{
//   console.log('11')
// })


// 1) 格式化传入的数据 默认打开文件
// 2）用户调用write方法 Writable接口实现write 内部调用_write fs.write
// 3) 区分是第一次写入 还是后续写入
const EventEmitter = require('event')

class WriteStream extends EventEmitter{
  constructor(path,options){
    super()
    this.path = path,
    this.flags = options.flags ||'w';
    this.autoClose = options.autoClose||true;
    this.encoding = options.encoding||null;

  }
  
}