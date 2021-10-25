const ReadStream = require('./myReadStream')
const WriteStream = require('./myWriteStream')

const rs = new ReadStream('./name.txt',{
  highWaterMark:4
})
rs.on('data',(chunk)=>{
  console.log(chunk.toString())
})
rs.on('end',()=>{
  console.log(111)
})