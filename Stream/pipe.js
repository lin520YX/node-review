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