const fs = require('fs')
const path = require('path')
/**
 * function createWriteStream(path: PathLike, options?: string | {
    flags?: string;
    encoding?: BufferEncoding;
    fd?: number;
    mode?: number;
    autoClose?: boolean;
    emitClose?: boolean;
    start?: number;
    highWaterMark?: number;
}): WriteStream (+1 overload)
*/ 
const ws = fs.createWriteStream(path.resolve(__dirname,'name.txt'),{
  flags:'w',
  // fd:'111',
  encoding:'utf8',
  autoClose:true,
  highWaterMark:1, //默认流水线16k
})
let i =0;
function write(){
  let flag = true
  while(i<10&&flag){
    flag = ws.write(''+i++);
  }
}
write()
// 内容到达预期 或者超过会触发
ws.on('drain',()=>{
  console.log(i)
  write()
})