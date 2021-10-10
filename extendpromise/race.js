// all 一个失败全部失败
// allSelled 既要成功又要失败
let p1 = new Promise((resolve, reject) => {
  resolve(1)
})
let p2 = new Promise((resolve, reject) => {
  reject(1)
})
Promise.allSettled([p1, p2]).then(res => {
  console.log(res)
  // [
  //   { status: 'fulfilled', value: 1 },
  //   { status: 'rejected', reason: 1 }
  // ]
})

Promise.race([p1, p2]).then(res => {
  console.log(res)
})