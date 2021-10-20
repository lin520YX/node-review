// 文件基于流进行了封装 封装了基于文件的可读流 可写流
const fs = require('fs')
const path = require('path')
/**
 * function createReadStream(path: PathLike, options?: string | {
    flags?: string;
    encoding?: BufferEncoding;
    fd?: number;
    mode?: number;
    autoClose?: boolean;
    emitClose?: boolean;
    start?: number;
    end?: number;
    highWaterMark?: number;
}): ReadStream (+1 overload)
*/
fs.createReadStream(path.resolve(__dirname,'name.txt'),{
  flags:'r',
  encoding:null, //编码默认null buffer
   
})