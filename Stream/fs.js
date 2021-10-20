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

// fs.open fs.read fs.close
let rs = fs.createReadStream(path.resolve(__dirname, 'name.txt'), {
  flags: 'r',
  encoding: null, //编码默认null buffer
  autoClose: true,
  start: 0, // 包前包后
  end: 5,
  highWaterMark: 2
})
rs.on('open', (fd) => {
  console.log(fd)
})
let arr = []
rs.on('data', (chunk) => {
  // 2禁止
  arr.push(chunk)

})
rs.on('end', () => {
  // 16进制
  console.log(Buffer.concat(arr).toString())
})
//  控制速度 rs.resume rs.pause

// 内部 new ReadStream 继承 Readable
// 内部先格式化
// 内部默认默认打开文件
// Readable.prototype.read ->ReadStream.prototype._read 