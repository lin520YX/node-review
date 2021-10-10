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
// const MyPromise = require('./mypromise.js')

// let p = new MyPromise((resolve, reject) => {
//   // throw new Error('1111')
//   setTimeout(() => {
//     resolve('123') // fulfilled
//   }, 1000)
//   // reject('123') //rejected
// })
// p.then((res) => {
//   console.log(res)
// }, (err) => {
//   console.log(err)
// })
// console.log(1)
// promise的链式调用问题
// 1）如果then 方法中（成功或失败）返回的不是一个promise 会将这个值传递给外层下一次then的成功结果

// const fs = require('fs')
// function read (...args) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(...args, function (err, data) {
//       if (err) reject(err)
//       resolve(data)
//     })
//   })
// }
// read('promise2/age.txt', 'utf8').then(
//   data => {
//     return 1000
//   },
//   err => {
//     console.log(err)
//   }
// ).then(data => {
//   console.log(data) ///10000
// }, err => {
//   console.log('err', err)
// })

// 2）如果执行then方法中的方法出错抛出异常 会走到当前的失败中

// const fs = require('fs')
// function read (...args) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(...args, function (err, data) {
//       if (err) reject(err)
//       resolve(data)
//     })
//   })
// }
// read('promise2/age.txt', 'utf8').then(
//   data => {
//     throw new Error('222')
//   },
//   err => {
//     console.log(err)
//   }
// ).then(data => {
//   console.log(data)
// }, err => {
//   console.log('err', err)
// })

// 如果返回的是一个promise 会用这个promise的结果作为下一次then的成功或者失败
const fs = require('fs')
const MyPromise = require('./mypromise')
function read (...args) {
  return new MyPromise((resolve, reject) => {
    fs.readFile(...args, function (err, data) {
      if (err) reject(err)
      resolve(data)
    })
  })
}
read('promise2/age.txt', 'utf8').then(
  data => {
    return new MyPromise((resolve, reject) => {
      resolve(1111111)
    })
  },
  err => {
    console.log(err)
  }
).then(data => {
  console.log('2', data)
}, err => {
  console.log('err', err)
}).then(data => {
  console.log('3', data)
}, err => {
  console.log('err', err)
})

// 1 出错会失败 返回的promise会失败
// then  为什么可以链式调用 每次都会返回一个新的promise

