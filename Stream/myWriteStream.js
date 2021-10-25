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
const EventEmitter = require('events')
const fs = require('fs')
const path = require('path')
const Queue = require('./queue')
// class Writable extends EventEmitter{
//   constructor(){
//     super()
//     this.len = 0; //统计的长度

//   }
//   write(){
//     this._write()
//   }
// }
class WriteStream extends EventEmitter{
  constructor(path,options){
    super()
    this.path = path,
    this.flags = options.flags ||'w';
    this.autoClose = options.autoClose||true;
    this.encoding = options.encoding||'utf8';
    this.highWaterMark = options.highWaterMark||16*1024
    this.open()
    // 判断是第一次写入还是第二次
    this.writing = false; // 用来描述当前是否有正在写入的操作
    this.len = 0; //统计的长度
    this.needDrain = false; //是否触发drain 事件
    this.offset = 0 //每次写入的偏移量
    this.cache = new Queue() //用来实现缓存
  }
  open(){
    fs.open(this.path,this.flags,(err,fd)=>{
      if(err) return this.emit('error',err)
      this.fd = fd;
      this.emit('open',fd)
    })
  }
  write(chunk,encoding= this.encoding,cb=()=>{}){
    // 用户调用的 可能写入 可能放入缓存
   chunk =  Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk);
   this.len = chunk.length
   let ret = this.len <this.highWaterMark
   if(!ret){ //触发drain 事件
     this.needDrain = true
   }else{
     this.needDrain = false
   }
  //  1）如果当前正在写入 稍后再去写入
  if(this.writing){
    this.cache.offer({
      chunk,encoding,cb
    })
  }else{
    this.writing = true
    this._write(chunk,encoding,()=>{
      cb() // 用户传入的回调
      this.clearBuffer()
    })
  }
   return ret
  }
  _write(chunk,encoding,cb){
    if(typeof this.fd != 'number'){
      return this.once('open',()=>this._write)
    }
    fs.write(this.fd,chunk,0,chunk.length,this.offset,(err,written)=>{
      if(err) return this.emit('error',err)
      this.len -=written
      this.offset+=written
      cb()
    })
    // 系统写入
  }
  clearBuffer(){ //对于多个异步并发 可以靠队列来实现依次清空
   let data =  this.cache.poll()
   if(data){
     let {chunk,encoding,cb} = data
    this._write(chunk,encoding,()=>{
      cb()
    })
   }else{
    this.writing = false ; // 缓存写完了
    if(this.needDrain){
      this.needDrain = false
      this.emit('drain')
    }
   }
   
  }
  
}
module.exports = WriteStream