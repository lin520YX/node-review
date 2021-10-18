// 服务器中是可以操作二进制的 buffer 可以和字符串随意转化
// 1 buffer 的声明方式 不能随意改变
// 数据结构中 动态数组 前段数组是可以扩容的
// const buffer = Buffer.alloc(6) // 字节数、
// const buffer = Buffer.from('是字节数') 
// 默认后端声明大小的数量 都是字节数
// buffer.toString() //默认utf8
// console.log(buffer) // <Buffer 00 00 00 00 00 00>
// 二进制 0b
// 八进制 0o
// 16禁止 0x

//  想改buffer 
// 1)通过索引修改
// 更改buffer的大小是无法更改了 可以声明一个其他的空间把内容考进去
const buffer = Buffer.alloc(12)
Buffer.prototype.copy=function(targetBuffer,targetStart,
  sourceStart=0,sourceEnd=this.length
  ){
    for (let i = sourceStart; i < sourceEnd; i++){
      console.log('targetStart',targetStart)
      targetBuffer[targetStart++]=this[i]
    }

}
const buffer1 = Buffer.from('哈哈')
const buffer2 = Buffer.from('呵呵')
buffer1.copy(buffer,0,0,6)
buffer2.copy(buffer,6,0,6)
console.log(buffer.toString())
Buffer.concat=function(bufferList,length=bufferList.reduce((a,b)=>a+b.length,0)){
  const buf = Buffer.alloc(length)
  let offset = 0
  bufferList.forEach(item => {
    item.copy(buf,offset)
    offset += item.length
  });
  return buf.slice(0,offset)
}

Buffer.concat([buffer1,buffer2])
