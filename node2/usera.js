let aa = require('./a')
console.log(aa)

// 默认省略 .js .json

// webpack 的模块化思路机制一样的
// 1 先去读取 a文件 拿到  a文件的内容
/**
 * function (){
 *   module.exports = 'aaa'
 *   return module.export
 * }(export,module,require,__dirname,__filename)
 * */

// 2 让函数执行 传入export,module,require,__dirname,__filename  使用vm让函数执行 
// 代码调试如何做到 node --inspect-brk 文件名  借助浏览器调试
// chrome://inspect

// vscode调试 nodejs 调试远吗 必须创建一个json文件


// module.prototype.require
// validateString()
// 相对路径转绝对路径
// new module创建一个模块 id文件名 exports 是一个对象 存放的是模块的导出结果
// module.load 加载模块
// 最终返回 module.exports