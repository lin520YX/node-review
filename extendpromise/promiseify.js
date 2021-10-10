// const fs = require('fs').promises
// const fs = require('fs')
// const bluebird = require('bluebird')
// function promisify (fn) {
//   return function (...args) {
//     return new Promise((resolve, reject) => {
//       fn(...args, (err, data) => {
//         if (err) return reject(err)
//         resolve(data)
//       })
//     })
//   }
// }
// let readFilePromise = promisify(fs.readFile)
// readFilePromise('extendpromise/promiseify.js', 'utf8').then(data => {
//   console.log(data)
// })

// let obj = bluebird.promisifyAll(fs)
// obj.readFileAsync
// 异步api 转换为promise
// function promisifyAll (fs) {
//   Reflect.ownKeys(fs).forEach(key => {
//     if (typeof fs[key] == 'function') {
//       fs[key + 'Async'] = promisify(fs[key])
//     }
//   })
//   return fs
// }