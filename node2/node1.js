// node 中的全局对象 this ->global
// 默认访问文件中的this 不是global 而是module.exports
 

// 全局属性
// global
// clearInterval: [Function: clearInterval],
//   clearTimeout: [Function: clearTimeout],
//   setInterval: [Function: setInterval],
//   setTimeout: [Function: setTimeout] {
//     [Symbol(nodejs.util.promisify.custom)]: [Function]
//   },
//   queueMicrotask: [Function: queueMicrotask], //v8
//   clearImmediate: [Function: clearImmediate],
//   setImmediate: [Function: setImmediate] {
//     [Symbol(nodejs.util.promisify.custom)]: [Function]
//   }

// console.dir(global,{showHidden:true})
// 全局变量 可以在文件中不声明而直接访问到的 
// process Buffer
// require module __dirname __filename

// console.log(Reflect.ownKeys(process))
// console.log(process.version)
// console.log(process.platform) //区分操作系统
// console.log(process.cwd()) ///Users/linyunfu/Documents/node-review 当前执行命令的目录

// console.log(process.env)

// 如何设置环境变量
// EXPORT xx = xx 
// win Set

// cross-env //第三方包
// console.log(require)
console.log(process.argv) //当前用户传入参数
let config = process.argv.slice(2).reduce((prev,current,index,arr)=>{
  console.log('current',current)
  if(current.startsWith('--')){
    prev[current.slice(2)] = arr[++index]
  }
  return prev
},{})
console.log(config)
// [
//   '/usr/local/bin/node', 
//   '/Users/linyunfu/Documents/node-review/node2/node1.js', //运行文件
//   'a',
//   'b',
//   'c'
// ]
// commander node 命令行界面问题

