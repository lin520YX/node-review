// promise  ie可能不支持
// 用法 生态 原理
// 1.解决了那些问题
// 1) 异步并发问题 Promise.all
// 2) 回调地狱问题 链式操作
// 3）错误处理方便

// 2.缺陷依旧是基础回调函数
// Promise a +


// 浏览器默认提供的一个类

// Promise(executor: (resolve: (value: any) => void, reject: (reason?: any) => void) => void): Promise<any>
// executor 默认就会执行
// 默认创建一个promise 状态就是pending
// 每一个promise实例都有then
const MyPromise = require('./mypromise.js')

let p = new MyPromise((resolve, reject) => {
  // throw new Error('1111')
  resolve('123') // fulfilled
  // reject('123') //rejected
})
p.then((res) => {
  console.log(res)
}, (err) => {
  console.log(err)
})
console.log(1)