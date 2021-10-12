// promise 中有很多问题 内部还是采用回调的方式 如果逻辑过多还是可能导致回调地狱
//  generator
// koa 1.0 用的就是generator koa2 async+await

// generator 函数可以实现暂停功能 

// yield 表示产出 * generator 迭代器函数
// function* gen () {
//   yield 1
//   yield 2
//   yield 3
//   yield 4
//   return 100
// }
// let it = gen()
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())



// const context = {
//   prev: 0, //当前 
//   next: 0, //下一次
//   done: false,
//   stop () {
//     this.done = true //更改完成状态
//   }
// }

// function gen$ (context) {
//   switch (context.prev = context.next) {
//     case 0:
//       context.next = 1;
//       return 1
//     case 1:
//       context.next = 2;
//       return 2
//     case 2:
//       context.next = 3;
//       return 3
//     case 3:
//       context.stop;
//       return 100
//   }
// }

// let gen = function () {
//   return {
//     next () {
//       //传入上下文
//       return {
//         value: gen$(context),
//         done: context.done
//       }
//     }
//   }
// }
// let it = gen()
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())



function* read () {
  let name = yield new Promise((resolve, reject) => {
    resolve(1)
  })
  let age = yield new Promise((resolve, reject) => {
    resolve(2222)
  })
  return age
}

// let it = read()
// it.next().value.then(res => {
//   let { value } = it.next()
//   value(res).then(data => {
//     console.log(data)
//   })
// })

function co (it) {
  return new Promise((resolve, reject) => {
    function next (data) {
      let { value, done } = it.next(data)
      if (!done) {
        Promise.resolve(value).then(res => {
          next(res)
        }, reject)
      } else {
        resolve(value)
      }
    }
    next()
  })
}
co(read()).then(res => {
  console.log('co', res)
})