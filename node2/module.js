// node 中的模块 核心
// 模块规范有哪些 为什么有这些规范
// 开发时会有命名冲突的问题  命名空间防止冲突  调用的时候不方便
// 闭包的方式实现模块化 但是不太好实现模块化 请求的处理 seajs(CMD)  requirejs(AMD)


// （es6Module commonjs规范）为主 umd模块（统一模块规范） amd模块
// es6Module  import export
// commonjs require module.exports 如果想在node中使用es6module需要使用babel编译



// commonjs规范的定义 
// 所有的文件都是一个模块
// 要通过module.exports 导出需要给别人使用的结果
// 导入需要的模块

// node中的模块划分了
// 核心模块（eg:fs） 内置模块
// require 文件模块 自定义模块
// 第三方模块 需要安装


// 内置模块
// fs
// path
// vm

// require 内部是同步的
const fs = require('fs') // 同步，异步

const result = fs.readFileSync('./remain.md', 'utf8')
console.log(result)
// 判断文件是否存在
const boolean = fs.existsSync('./remain.md')
console.log(boolean)

const path = require('path')
// 给一个相对路径 返回一个绝对路径
// __dirname 当前文件所在目录
// resolve 有拼接的功能
console.log(path.resolve(__dirname, 'remain.md', '/a')) // /a
console.log(__dirname) // /Users/lyf/Documents/node-review/node2

console.log(path.join(__dirname, 'a'))

// 如果遇到带 /的路径 resolve 会认为是根路径 join 是拼接在一起


// 取后缀名
console.log(path.extname('a.min.js'))
// 取后缀名
console.log(path.relative('a', 'a/a.js')) //去掉相同的部分

console.log(path.dirname(__dirname)) // __dirname = path.dirname



// vm 虚拟机模块
const vm = require('vm')
const a = 1000
const log = `console.log(a)`
let fn = new Function(log) //new Function 也会产生一个执行环境 不依赖于外层作用域必须包一层函数
console.log(fn.toString())


vm.runInContext(log) //可以让字符串在沙箱环境中执行