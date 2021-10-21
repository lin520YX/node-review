const {Writable} = require('stream')

class WriteStream extends Writable{
  _write(chunk,encoding,cb){
    console.log(chunk)
    cb()
  }
  
}
let wr = new WriteStream()
wr.write('ok')
wr.write('bk')


// 不同的人实现的可写流是不同的