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
  highWaterMark:2, //默认流水线16k
})
// ws.write ws.end ws.on('open') ws.on('close')
let flag = ws.write('1'); //只能写入string 或者buffer类型
// 放入链表 多个异步任务排队执行
ws.write('2');
ws.write('3');
ws.write('4');
// console.log('----flag',flag)


// 为什么要采用链表 （数组，栈，队列，链表，树）
// 用链表 可以实现栈或者队列 性能会比数组高些（取头）

// 第一次写是的往文件中写入 后续的操作都缓存到链表 中
// flag限制是否读取 rs.pause rs.resume