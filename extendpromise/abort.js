// abort 就是不要promise这次的成功结果

let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 3000)
})
function warp (emit) {
  let abort;
  let p2 = new Promise((resolve, reject) => {
    abort = reject
  })
  // 有一个失败就全部失败了
  let newP = Promise.race([emit, p2])
  newP.abort = abort
  return newP
}
let p2 = warp(p1)
p2.then(data => {
  console.log(data)
}).catch(err => {
  console.log('err', err)
})
setTimeout(() => {
  // p2.abort('cuo')
}, 2000)
