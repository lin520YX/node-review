const fs = require('fs')
const path = require('path')
const EventEmitter = require('events')
class MyReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super()
    this.path = path
    this.flags = options.flags || 'r'
    this.encoding = options.encoding || null;
    if (typeof options.autoClose == "undefined") {
      this.autoClose = true;
    } else {
      this.autoClose = options.autoClose;
    }
    this.start = options.start || 0;
    this.end = options.end || Infinity;
    this.highWaterMark = options.highWaterMark || 64 * 1024 //64k
    this.open()
    this.offset = this.start
    this.flowing = false // 默认非流动模式
    this.on('newListener', (type) => {
      if (type == 'data') {
        this.flowing = true
        this.read()
      }
    })
  }
  open () {
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) return this.emit('error', err)
      this.fd = fd
      this.emit('open', fd)
    })
  }
  read () {
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this.read())
    }
    const buffer = Buffer.alloc(this.highWaterMark)
    let howMuchToRead = Math.min((this.end - this.offset + 1), this.highWaterMark)
    // fd:通过 fs.open() 方法返回的文件描述符。
    // buffer:数据写入的缓冲区;
    // offset:缓冲区写入的写入偏移量;
    // length:要从文件中读取的字节数;
    // position:文件读取的起始位置;
    // callback:(err,bytes,buffer);bytes:读取的字节数,buffer 为缓冲区对象;
    fs.read(this.fd, buffer, 0, howMuchToRead, this.offset, (err, bytesRead) => {
      if (bytesRead) {
        this.offset += bytesRead
        this.emit('data', buffer.slice(0, bytesRead))
        if (this.flowing) {
          this.read()
        }
      } else {
        this.emit('end')
        this.flowing = true
        if (this.autoClose) {
          fs.close(this.fd, () => {

          })
        }
      }
    })
  }
  resume () {
    if (!this.flowing) {
      this.flowing = true
      this.read()
    }
  }
  pause () {
    this.flowing = false
  }
  // 异步的 内部采用发布订阅
  pipe(ws){
    this.on('data',(chunk)=>{
      let flag = ws.write(chunk)
      if(!flag){
        this.pause()
      }
    })
    ws.on('drain',()=>{
      this.resume()
    })
  }

}
module.exports = MyReadStream


// 文件可读流 可读流
