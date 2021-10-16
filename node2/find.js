// node 当中还有一些
let r = require('./a1') // 尽量保证文件夹不要重名

console.log(r)
// 默认先查找文件夹中的js 然后json  然后找文件夹中的 index.js 如果没有 则会查找 package.json 中main字段 找到对应的结果


// 如果文件不是绝对路径或者相对路径（不是核心模块），会去当前文件夹下的node_modules下查找
// 找不到会继续上层查找直到根目录