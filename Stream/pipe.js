const ReadStream = require('./myReadStream')
const WriteStream = require('./myWriteStream')

const rs = new ReadStream('./name.txt',{
  highWaterMark:4
})
const ws = new WriteStream('./copy.txt',{
  highWaterMark:1
})
rs.on('data',(chunk)=>{
  let flag = ws.write(chunk)
  if(!flag){
    rs.pause()
  }
})
ws.on('drain',()=>{
  rs.resume()
})
rs.on('end',()=>{
  console.log(111)
})

// 可读流 可写流 双工流（能读能写）
// const {Duplex} = require('stream')
// class MyDuplex extends Duplex{
//   _read(){
//     this.push('123')
//     this.push(null)
//   }
//   _write(chunk){

//   }
// }

// 转化流 可以用于加密压缩 可以把可写流转换为可读流
const {Transform} = require('stream')
class MyTransform extends Transform{
  _transform(chunk,encoding,cb){
    console.log(chunk)
    cb()
  }
}
let mytranform = new MyTransform()
// process.stdin.on('data',function(chunk){ //监听用户输入
//   process.stdout.write(chunk)
// })
process.stdin.pipe(mytranform).pipe(process.stdout)